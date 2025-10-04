const cfg={paths:{settings:'data/settings.json',music:'data/music.json',quotes:'data/quotes.json',reise:'data/reise.json',kino:'data/kino.json',rotator:'data/rotator.json'}};
const $=s=>document.querySelector(s);async function loadJSON(p){const r=await fetch(p,{cache:'no-store'});return r.json();}
let audio,voiceUtterance;async function setupAudio(){const s=await loadJSON(cfg.paths.settings);const m=await loadJSON(cfg.paths.music);const url=(m.tracks&&m.tracks[0])?m.tracks[0]:null;
audio=new Audio(url);audio.loop=true;audio.volume=.4;const chip=$('#musicChip');chip.onclick=()=>{if(audio.paused){audio.play();chip.textContent='⏸ Musik';}else{audio.pause();chip.textContent='▶︎ Musik';}};
if(s.music&&s.autoplay_music){audio.play().then(()=>chip.textContent='⏸ Musik').catch(()=>chip.textContent='▶︎ Musik');}
if(s.autoplay_voice){const text=`Hallo neugieriger Adler, schön, dass du da bist.`;const speak=()=>{voiceUtterance=new SpeechSynthesisUtterance(text);voiceUtterance.lang=s.voice||'de-DE';voiceUtterance.rate=1;
voiceUtterance.onstart=()=>{audio.volume=.15};voiceUtterance.onend=()=>{audio.volume=.4};speechSynthesis.speak(voiceUtterance);}
const trySpeak=()=>{if(speechSynthesis.getVoices().length)speak();else setTimeout(trySpeak,300);}trySpeak();}}
function ctaReplay(){if(voiceUtterance&&speechSynthesis.speaking)speechSynthesis.cancel();const u=new SpeechSynthesisUtterance('Willkommen! Dein Mentor begleitet dich persönlich.');u.lang='de-DE';
u.onstart=()=>{audio.volume=.15};u.onend=()=>{audio.volume=.4};speechSynthesis.speak(u);}async function buildQuotes(){const q=await loadJSON(cfg.paths.quotes);
$('#ticker').innerHTML=q.items.map(t=>`<span class="badge">${t}</span>`).join(' ');}async function buildReise(){const r=await loadJSON(cfg.paths.reise);
$('#reiseList').innerHTML=r.steps.map(s=>`<li><strong>${s.title}</strong> — ${s.desc}</li>`).join('');}async function buildKino(){const k=await loadJSON(cfg.paths.kino);
$('#kinoTicker').textContent=k.ticker.join('   •   ');}async function init(){await setupAudio();await buildQuotes();await buildReise();await buildKino();}
document.addEventListener('DOMContentLoaded',init);window.ctaReplay=ctaReplay;