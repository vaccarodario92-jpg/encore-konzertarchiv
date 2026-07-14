// Kleine, physische Bewegungen für die horizontalen Event-Decks.
document.querySelectorAll('.section-heading').forEach(heading=>{
  const note=document.createElement('p');note.className='swipe-hint';note.innerHTML='<b>←</b> swipe to explore <b>→</b>';heading.after(note);
});
const hero=document.querySelector('.hero');
const orbit=document.createElement('span');orbit.className='momento-orbit';orbit.setAttribute('aria-hidden','true');hero.append(orbit);
document.querySelectorAll('.discover-grid,.venue-grid,.upcoming-list,.memory-grid').forEach(deck=>{
  let down=false,startX=0,scroll=0;
  deck.addEventListener('pointerdown',e=>{down=true;startX=e.clientX;scroll=deck.scrollLeft;deck.setPointerCapture(e.pointerId);deck.querySelectorAll(':scope > *').forEach(c=>c.classList.add('is-swiping'))});
  deck.addEventListener('pointermove',e=>{if(!down)return;const walk=(e.clientX-startX)*1.15;deck.scrollLeft=scroll-walk});
  const release=()=>{down=false;deck.querySelectorAll(':scope > *').forEach(c=>c.classList.remove('is-swiping'))};
  deck.addEventListener('pointerup',release);deck.addEventListener('pointercancel',release);
});
const discoverHeading=[...document.querySelectorAll('.page-title')].find(x=>x.parentElement.id==='discover');
if(discoverHeading){const live=document.createElement('span');live.className='event-pulse';live.textContent='FRESH DATES';discoverHeading.prepend(live)}
