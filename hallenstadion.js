// Auswahl grosser Hallenstadion-Konzerte der letzten zehn Jahre.
const hallenstadionShows = [
  ['2016-05-17','Adele','Adele Live 2016'],['2016-10-05','Red Hot Chili Peppers','The Getaway Tour'],['2016-11-17','Justin Bieber','Purpose World Tour'],
  ['2017-03-19','Ed Sheeran','÷ Tour'],['2017-05-14','Shawn Mendes','Illuminate World Tour'],
  ['2018-02-11','Lady Gaga','Joanne World Tour'],['2018-06-01','Katy Perry','Witness: The Tour'],['2018-06-22','Shakira','El Dorado World Tour'],['2018-08-16','Justin Timberlake','Man of the Woods Tour'],
  ['2019-03-27','Nicki Minaj','Nicki Wrld Tour'],['2019-03-31','Shawn Mendes','Shawn Mendes: The Tour'],['2019-10-13','Ariana Grande','Sweetener World Tour'],
  ['2020-02-13','Jonas Brothers','Happiness Begins Tour'],['2022-05-20','Dua Lipa','Future Nostalgia Tour'],['2022-11-30','Burna Boy','Love, Damini Tour'],
  ['2023-02-26','Chris Brown','Under the Influence Tour'],['2023-03-03','Lizzo','The Special Tour'],['2023-06-07','SZA','SOS Tour'],['2023-10-20','50 Cent','The Final Lap Tour'],
  ['2024-06-04','Jonas Brothers','Five Albums. One Night.'],['2024-06-08','Karol G','Mañana Será Bonito Tour'],['2024-06-11','Olivia Rodrigo','GUTS World Tour'],['2024-07-05','Travis Scott','Circus Maximus Tour'],
  ['2025-01-23','ATEEZ','Towards The Light'],['2025-02-24','Gracie Abrams','The Secret of Us Tour'],['2025-03-27','Sabrina Carpenter','Short n’ Sweet Tour'],['2025-04-16','Twenty One Pilots','The Clancy World Tour'],['2025-06-18','Tate McRae','Miss Possessive Tour'],['2025-07-06','Kylie Minogue','Tension Tour']
].map(([date,artist,tour])=>({date,artist,tour,venue:'Hallenstadion, Zürich'}));
let archiveYear = 'Alle';
const venueGrid = document.querySelector('#venueGrid');
function hallenSaved(show){return concerts.some(c=>c.type==='past'&&c.artist===show.artist&&c.date===show.date&&c.venue===show.venue)}
function drawArchive(){
  const years=['Alle',...new Set(hallenstadionShows.map(s=>s.date.slice(0,4)))];
  document.querySelector('#archiveFilter').innerHTML=years.map(y=>`<button class="year-filter ${y===archiveYear?'selected':''}" data-year="${y}">${y}</button>`).join('');
  const chosen=hallenstadionShows.filter(s=>archiveYear==='Alle'||s.date.startsWith(archiveYear));
  venueGrid.innerHTML=chosen.map((show,i)=>`<article class="venue-card"><div class="venue-image artist-image" data-artist="${show.artist}"><span>${show.artist.slice(0,1)}</span></div><div class="venue-info"><p>${dateFmt(show.date)} · HALLENSTADION</p><h3>${show.artist}</h3><span>${show.tour}</span><button class="archive-button ${hallenSaved(show)?'saved':''}" data-archive="${i}">${hallenSaved(show)?'✓ In deinem Archiv':'＋ Als besucht speichern'}</button></div></article>`).join('');
  document.querySelectorAll('.year-filter').forEach(b=>b.onclick=()=>{archiveYear=b.dataset.year;drawArchive()});
  document.querySelectorAll('.archive-button').forEach(b=>b.onclick=()=>{const show=chosen[b.dataset.archive];if(!hallenSaved(show)){concerts.push({...show,type:'past',recap:'',favorite:false,photo:''});save()}drawArchive()});
  loadArtistImages(document.querySelectorAll('.artist-image'));
}
document.querySelector('[data-view="hallenstadion"]').addEventListener('click',drawArchive);
drawArchive();
