// Kuratierte Auswahl grosser, noch kommender Schweizer Live-Events; geprüft am 15.07.2026.
const swissShows = [
  {artist:'Heitere Open Air',date:'2026-08-07',venue:'Heitere-Platz, Zofingen',detail:'Mit Bonez MC, 01099, Amy Macdonald u. a.'},
  {artist:'Open Air Gampel',date:'2026-08-19',venue:'Gampel, Wallis',detail:'Mit Sombr, Marteria, Hecht, Montez u. a.'},
  {artist:'SummerDays Festival',date:'2026-08-28',venue:'Seepark, Arbon',detail:'Mit Roxette, Anastacia, Hecht, Tom Odell u. a.'},
  {artist:'JOJI · SOLARIS',date:'2026-08-31',venue:'Hallenstadion, Zürich',detail:'Solo-Show im Hallenstadion.'},
  {artist:'Robbie Williams',date:'2026-09-09',venue:'Hallenstadion, Zürich',detail:'Live in Zürich.'},
  {artist:'SYNTHONY 2026',date:'2026-09-24',venue:'Hallenstadion, Zürich',detail:'Elektronische Hymnen mit Live-Orchester.'},
  {artist:'André Rieu',date:'2026-09-25',venue:'Hallenstadion, Zürich',detail:'Mit Johann Strauss Orchester.'},
  {artist:'AnnenMayKantereit',date:'2026-09-26',venue:'Hallenstadion, Zürich',detail:'Indie-Rock live in Zürich.'},
  {artist:'The World of Hans Zimmer',date:'2026-11-15',venue:'Hallenstadion, Zürich',detail:'A New Dimension · Live-Show.'},
  {artist:'Westlife',date:'2026-11-26',venue:'Hallenstadion, Zürich',detail:'25: The Anniversary World Tour.'},
  {artist:'Papa Roach',date:'2026-11-30',venue:'Hallenstadion, Zürich',detail:'Rise Of The Roach · mit Landmvrks & Sleep Theory.'},
  {artist:'BAP',date:'2026-12-02',venue:'Hallenstadion, Zürich',detail:'Kölsche Rocklegenden live.'},
  {artist:'Verknipt | Stadion',date:'2026-12-19',venue:'Hallenstadion, Zürich',detail:'Indoor-Rave mit Kobosil, TRYM, NHŪ u. a.'}
];

const discoverGrid = document.querySelector('#discoverGrid');
function isSaved(show){return concerts.some(c=>c.type==='upcoming' && c.artist===show.artist && c.date===show.date && c.venue===show.venue)}
function drawDiscover(){
  discoverGrid.innerHTML = swissShows.map((show,index)=>{
    const saved=isSaved(show);
    return `<article class="discover-card"><span class="discover-date">${dateFmt(show.date).toUpperCase()}</span><h3>${show.artist}</h3><p>${show.venue}<br>${show.detail}</p><button class="watch-button ${saved?'saved':''}" data-show="${index}">${saved?'✓ Auf deiner Liste':'＋ Auf meine Liste'}</button></article>`;
  }).join('');
  document.querySelectorAll('.watch-button').forEach(button=>button.onclick=()=>{
    const show=swissShows[button.dataset.show];
    if(!isSaved(show)) { concerts.push({...show,type:'upcoming',recap:'',favorite:false,photo:''}); save(); }
    drawDiscover();
  });
}
drawDiscover();
document.querySelector('[data-view="discover"]').addEventListener('click', drawDiscover);
