const key = 'encore-concerts-v1';
let concerts = JSON.parse(localStorage.getItem(key) || '[]');
let type = 'upcoming';
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const dateFmt = d => new Intl.DateTimeFormat('de-CH',{day:'2-digit',month:'short',year:'numeric'}).format(new Date(d));
const daysUntil = d => Math.ceil((new Date(d).setHours(0,0,0,0)-new Date().setHours(0,0,0,0))/86400000);
const empty = () => $('#emptyTemplate').content.cloneNode(true);

function save(){localStorage.setItem(key,JSON.stringify(concerts));render()}
function past(){return concerts.filter(c=>c.type==='past').sort((a,b)=>new Date(b.date)-new Date(a.date))}
function upcoming(){return concerts.filter(c=>c.type==='upcoming').sort((a,b)=>new Date(a.date)-new Date(b.date))}
function ticket(c){return `<article class="memory-card ${c.photo?'photo-card':''}">${c.photo?`<img src="${c.photo}" alt="${c.artist} live">`:''}<span class="card-star">${c.favorite?'♥':'✦'}</span><span class="ticket-hole"></span><div class="card-content"><div class="card-meta">${dateFmt(c.date).toUpperCase()} · ${c.venue.toUpperCase()}</div><h3>${c.artist}</h3><p>${c.recap || 'Live erlebt · Erinnerung gespeichert'}</p></div></article>`}
function showRow(c){let d=daysUntil(c.date), label=d===0?'HEUTE':d===1?'MORGEN':d>1?`IN ${d} TAGEN`:'VERGANGEN';return `<article class="upcoming-row"><div class="date-box">${new Date(c.date).toLocaleDateString('de-CH',{month:'short'}).toUpperCase()}<strong>${new Date(c.date).getDate()}</strong>${new Date(c.date).getFullYear()}</div><div><div class="show-title">${c.artist}</div><div class="show-venue">${c.venue}</div></div><span class="countdown">${label}</span></article>`}
function fill(selector,items,renderer){const node=$(selector);node.innerHTML='';if(!items.length)node.append(empty());else node.innerHTML=items.map(renderer).join('')}
function render(){const p=past(), u=upcoming(), fav=[...new Map(concerts.filter(c=>c.favorite).map(c=>[c.artist,c])).values()];$('#concertCount').textContent=String(p.length).padStart(2,'0');$('#artistCount').textContent=String(fav.length).padStart(2,'0');$('#yearCount').textContent=String(concerts.length).padStart(2,'0');let n=u[0];$('#nextDate').textContent=n?new Date(n.date).toLocaleDateString('de-CH',{day:'2-digit',month:'short'}).replace('.','').toUpperCase():'—';$('#nextArtist').textContent=n?n.artist:'Noch nichts geplant';fill('#dashboardUpcoming',u.slice(0,3),showRow);fill('#upcomingList',u,showRow);fill('#dashboardMemories',p.slice(0,3),ticket);fill('#memoriesGrid',p,ticket);const ag=$('#artistsGrid');ag.innerHTML='';if(!fav.length)ag.append(empty());else ag.innerHTML=fav.map(a=>`<article class="artist-card"><span class="artist-heart">♥</span><span class="artist-initial">${a.artist[0]}</span><h3>${a.artist}</h3><p>${concerts.filter(c=>c.artist===a.artist).length} gespeicherte Show${concerts.filter(c=>c.artist===a.artist).length===1?'':'s'}</p></article>`).join('');$$('.empty-add').forEach(b=>b.onclick=openModal)}
function openModal(){ $('#concertModal').classList.add('open'); $('#concertModal').setAttribute('aria-hidden','false')}
function closeModal(){ $('#concertModal').classList.remove('open'); $('#concertModal').setAttribute('aria-hidden','true')}
function switchView(view){$$('.view').forEach(x=>x.classList.toggle('active',x.id===view));$$('.nav-item').forEach(x=>x.classList.toggle('active',x.dataset.view===view));$('.sidebar').classList.remove('open');window.scrollTo({top:0,behavior:'smooth'})}
$('#today').textContent=new Intl.DateTimeFormat('de-CH',{weekday:'long',day:'numeric',month:'long'}).format(new Date());
$('#openConcertModal').onclick=openModal;$('.close-modal').onclick=closeModal;$('#concertModal').onclick=e=>{if(e.target===e.currentTarget)closeModal()};$('.mobile-menu').onclick=()=>$('.sidebar').classList.toggle('open');$$('[data-view]').forEach(b=>b.addEventListener('click',e=>{if(b.dataset.view){e.preventDefault();switchView(b.dataset.view)}}));$$('.toggle-option').forEach(b=>b.onclick=()=>{type=b.dataset.type;$$('.toggle-option').forEach(x=>x.classList.toggle('selected',x===b));$('.past-only').style.display=type==='past'?'grid':'none'});
$('#concertForm').onsubmit=async e=>{e.preventDefault();const form=new FormData(e.target),file=form.get('photo');let photo='';if(file && file.size)photo=await new Promise(r=>{const reader=new FileReader();reader.onload=()=>r(reader.result);reader.readAsDataURL(file)});concerts.push({id:Date.now(),type,artist:form.get('artist').trim(),date:form.get('date'),venue:form.get('venue').trim(),recap:form.get('recap').trim(),favorite:form.get('favorite')==='on',photo});e.target.reset();closeModal();save();switchView(type==='past'?'memories':'upcoming')};
$('.past-only').style.display='none';
render();
