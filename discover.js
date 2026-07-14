// Kuratierte Auswahl grosser, noch kommender Schweizer Live-Events; geprüft am 15.07.2026.
const swissShows = [
  {artist:'Don Toliver',date:'2026-10-26',venue:'Hallenstadion, Zürich',detail:'NITROUS · OCTANE WORLD TOUR LEG 2',wiki:'Don Toliver'},
  {artist:'Robbie Williams',date:'2026-09-09',venue:'Hallenstadion, Zürich',detail:'Britpop Tour · Live in Zürich',wiki:'Robbie Williams'},
  {artist:'JOJI',date:'2026-08-31',venue:'Hallenstadion, Zürich',detail:'SOLARIS · Solo-Show',wiki:'Joji (musician)'},
  {artist:'AnnenMayKantereit',date:'2026-09-26',venue:'Hallenstadion, Zürich',detail:'Indie-Rock live in Zürich',wiki:'AnnenMayKantereit'},
  {artist:'SYNTHONY 2026',date:'2026-09-24',venue:'Hallenstadion, Zürich',detail:'Elektronische Hymnen mit Live-Orchester',wiki:'Synthony'},
  {artist:'The World of Hans Zimmer',date:'2026-11-15',venue:'Hallenstadion, Zürich',detail:'A New Dimension · Live-Show',wiki:'Hans Zimmer'},
  {artist:'Westlife',date:'2026-11-26',venue:'Hallenstadion, Zürich',detail:'25: The Anniversary World Tour',wiki:'Westlife'},
  {artist:'Papa Roach',date:'2026-11-30',venue:'Hallenstadion, Zürich',detail:'Mit Landmvrks & Sleep Theory',wiki:'Papa Roach'},
  {artist:'BAP',date:'2026-12-02',venue:'Hallenstadion, Zürich',detail:'Kölsche Rocklegenden live',wiki:'BAP (German band)'},
  {artist:'Verknipt | Stadion',date:'2026-12-19',venue:'Hallenstadion, Zürich',detail:'Indoor-Rave mit Kobosil, TRYM, NHŪ u. a.',wiki:'Kobosil'},
  {artist:'SummerDays Festival',date:'2026-08-28',venue:'Seepark, Arbon',detail:'Roxette, Anastacia, Hecht, Tom Odell u. a.',wiki:'Roxette'},
  {artist:'Open Air Gampel',date:'2026-08-19',venue:'Gampel, Wallis',detail:'Sombr, Marteria, Hecht, Montez u. a.',wiki:'Marteria'}
];

const discoverGrid = document.querySelector('#discoverGrid');
function isSaved(show){return concerts.some(c=>c.type==='upcoming'&&c.artist===show.artist&&c.date===show.date&&c.venue===show.venue)}
async function loadArtistImages(elements){
  for(const element of elements){
    const artist=element.dataset.artist;
    const title=encodeURIComponent(element.dataset.wiki||artist);
    try{
      const response=await fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages&pithumbsize=700&titles=${title}`);
      const data=await response.json();
      const page=Object.values(data.query.pages)[0];
      if(page?.thumbnail?.source){element.style.backgroundImage=`linear-gradient(0deg,rgba(14,14,13,.6),rgba(14,14,13,.04)),url("${page.thumbnail.source}")`;element.classList.add('has-image')}
    }catch(error){/* Text-Poster bleibt als Fallback sichtbar. */}
  }
}
function drawDiscover(){
  discoverGrid.innerHTML=swissShows.map((show,index)=>{const saved=isSaved(show);return `<article class="discover-card"><div class="discover-image artist-image" data-artist="${show.artist}" data-wiki="${show.wiki}"><span>${show.artist.slice(0,1)}</span></div><div class="discover-body"><span class="discover-date">${dateFmt(show.date).toUpperCase()}</span><h3>${show.artist}</h3><p>${show.venue}<br>${show.detail}</p><button class="watch-button ${saved?'saved':''}" data-show="${index}">${saved?'✓ Auf deiner Liste':'＋ Auf meine Liste'}</button></div></article>`}).join('');
  document.querySelectorAll('.watch-button').forEach(button=>button.onclick=()=>{const show=swissShows[button.dataset.show];if(!isSaved(show)){concerts.push({...show,type:'upcoming',recap:'',favorite:false,photo:''});save()}drawDiscover()});
  loadArtistImages(document.querySelectorAll('#discoverGrid .artist-image'));
}
drawDiscover();
document.querySelector('[data-view="discover"]').addEventListener('click',drawDiscover);
