// Animate a small text layer, not a full-screen canvas. One completion timer.
const intro = document.getElementById('intro');
const skipIntro = document.getElementById('skipIntro');
let introTimer = null, introTrigger = null;
function finishIntro() {
  if (!introActive) return;
  clearTimeout(introTimer);
  introActive = false;
  intro.hidden = true;
  document.getElementById('stage').inert = false;
  animStart = 0;
  syncMotion();
  (introTrigger || document.getElementById('servicesBtn')).focus({preventScroll:true});
}
function playIntro() {
  if (motionPaused || reducedMotion.matches) return;
  introTrigger = document.activeElement?.id === 'replayIntro' ? document.activeElement : null;
  introActive = true;
  intro.hidden = false;
  document.getElementById('stage').inert = true;
  if (animStart) buildParticles();
  syncMotion();
  skipIntro.focus({preventScroll:true});
  introTimer = setTimeout(finishIntro, 4600);
}
skipIntro.addEventListener('click',finishIntro);
document.getElementById('replayIntro').addEventListener('click',playIntro);
intro.addEventListener('keydown',e=>{
  if (e.key==='Enter'||e.key==='Escape') {e.preventDefault();finishIntro();}
  if(e.key==='Tab') {e.preventDefault();skipIntro.focus();}
});
reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches)finishIntro();});
playIntro();
