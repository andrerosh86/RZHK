const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.BROWSER_PATH?{executablePath:process.env.BROWSER_PATH}:{})});
 try {
  const page=await browser.newPage({viewport:{width:1440,height:900}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>{window.frameCalls=0;const raf=requestAnimationFrame;window.requestAnimationFrame=cb=>raf(t=>{window.frameCalls++;cb(t);});});
  await page.goto('http://127.0.0.1:4173/website/');
  assert(await page.locator('#intro').isVisible());
  assert.equal(await page.evaluate(()=>document.activeElement.id),'skipIntro');
  const frames=await page.evaluate(()=>window.frameCalls);
  await page.waitForTimeout(1200);
  assert.equal(await page.evaluate(()=>window.frameCalls),frames,'No canvas loops behind intro');
  await page.screenshot({path:'audit/intro.png'});
  await page.locator('#intro').waitFor({state:'hidden',timeout:6000});
  assert.equal(await page.evaluate(()=>document.getElementById('stage').inert),false);
  const formation=await page.evaluate(()=>({
    delayed:particles.some(p=>p.delay>2),
    slow:particles.every(p=>p.duration>=3 && p.duration<=5),
    scattered:particles.some(p=>Math.hypot(p.x-p.ox,p.y-p.oy)>100)
  }));
  assert(formation.delayed && formation.slow && formation.scattered,'Original slow, scattered logo formation is retained');
  await page.waitForFunction(()=>particles.some(p=>p.impactAt),{},{timeout:20000});
  const result=await page.evaluate(()=>({affected:particles.filter(p=>p.impactAt).length,particles:particles.length,streams:rainStreams.length}));
  assert(result.affected>0);
  await page.locator('#replayIntro').click();
  await page.keyboard.press('Escape');
  assert(await page.locator('#intro').isHidden());
  assert.equal(await page.evaluate(()=>document.activeElement.id),'replayIntro');
  await page.locator('#replayIntro').click();
  await page.keyboard.press('Enter');
  assert(await page.locator('#intro').isHidden());
  await page.locator('#motionToggle').click();
  assert(await page.locator('#replayIntro').isDisabled());
  const paused=await page.evaluate(()=>window.frameCalls);
  await page.waitForTimeout(800);
  assert.equal(await page.evaluate(()=>window.frameCalls),paused);
  await page.reload();
  assert(await page.locator('#intro').isHidden());
  assert.deepEqual(errors,[]);
  fs.writeFileSync('audit/effects-results.json',JSON.stringify(result,null,2));
  console.log('PASS: automatic intro, no background callbacks, natural rain impacts, replay, Enter/Escape skip, focus restore and motion pause.',result);
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
