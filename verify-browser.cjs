const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const url = process.env.SITE_URL || 'http://127.0.0.1:4173/website/';
(async()=>{
  const browser = await chromium.launch({headless:true,...(process.env.BROWSER_PATH ? {executablePath:process.env.BROWSER_PATH} : {})});
  const errors = [], report = [];
  fs.mkdirSync('audit',{recursive:true});
  try {
    for(const [width,height] of [[1440,900],[1280,720],[1024,600],[390,844],[320,568],[844,390]]) {
      const context=await browser.newContext({viewport:{width,height}});
      const page=await context.newPage();
      page.on('pageerror',e=>errors.push(e.message));
      page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
      await page.addInitScript(()=>{
        window.auditMetrics={lcp:0,cls:0};
        new PerformanceObserver(l=>l.getEntries().forEach(e=>window.auditMetrics.lcp=e.startTime)).observe({type:'largest-contentful-paint',buffered:true});
        new PerformanceObserver(l=>l.getEntries().forEach(e=>{if(!e.hadRecentInput)window.auditMetrics.cls+=e.value;})).observe({type:'layout-shift',buffered:true});
      });
      await page.goto(url);
      await page.locator('#skipIntro').click();
      await page.locator('#servicesBtn').click();
      assert.equal(await page.locator('.overview-card').count(),5);
      for(let i=0;i<5;i++) {
        await page.locator(`[data-service="${i}"]`).click();
        await page.locator('.detail-grid img').evaluate(img=>img.decode());
        assert.match(await page.locator('.concept-note').innerText(),/AI-generated concept/);
        assert(await page.locator('.detail-copy').innerText());
        const overflow=await page.locator('.modal').evaluate(e=>e.scrollWidth>e.clientWidth+1);
        assert(!overflow,`Dialog overflow at ${width}, service ${i}`);
        if(i===0 && [1440,390].includes(width))await page.screenshot({path:`audit/service-${width}.png`});
        await page.locator('[data-action="next"]').click();
        assert.match(await page.locator('.modal .eyebrow').innerText(),new RegExp(`0${(i+1)%5+1} / 05`));
        await page.locator('[data-action="overview"]').click();
      }
      await page.locator('#modalClose').focus();
      await page.keyboard.press('Shift+Tab');
      assert.equal(await page.evaluate(()=>document.activeElement.dataset.service),'4');
      await page.keyboard.press('Tab');
      assert.equal(await page.evaluate(()=>document.activeElement.id),'modalClose');
      await page.keyboard.press('Escape');
      assert.equal(await page.evaluate(()=>document.activeElement.id),'servicesBtn');
      await page.locator('#aboutBtn').click();
      assert.equal(await page.locator('.detail-grid').count(),0);
      await page.keyboard.press('Escape');
      await page.locator('#motionToggle').click();
      assert.equal(await page.locator('#motionToggle').getAttribute('aria-pressed'),'true');
      await page.reload();
      assert.equal(await page.locator('#motionToggle').getAttribute('aria-pressed'),'true');
      assert.equal(await page.locator('img').count(),0,'No portfolio images in initial page');
      await page.evaluate(()=>document.fonts.ready);
      const measurements=await page.evaluate(()=>{
        const c=document.querySelector('.center').getBoundingClientRect(),s=document.querySelector('.services');
        return {...window.auditMetrics,resources:performance.getEntriesByType('resource').map(r=>({name:r.name.split('/').pop(),bytes:r.transferSize})),fontLoaded:document.fonts.check('400 16px Inter'),horizontalOverflow:document.documentElement.scrollWidth>innerWidth,heroOverlap:getComputedStyle(s).display!=='none' && c.bottom>s.getBoundingClientRect().top};
      });
      assert(measurements.fontLoaded);assert(!measurements.horizontalOverflow);assert(!measurements.heroOverlap,`Hero overlap at ${width}x${height}: ${JSON.stringify(await page.evaluate(()=>Object.fromEntries(['.center','.services'].map(s=>[s,document.querySelector(s).getBoundingClientRect().toJSON()]))))}`);
      if([1440,390].includes(width))await page.screenshot({path:`audit/home-${width}.png`});
      report.push({viewport:`${width}x${height}`,...measurements});
      await context.close();
    }
    const context=await browser.newContext({reducedMotion:'reduce'}),page=await context.newPage();
    await page.goto(url);
    assert(await page.locator('#intro').isHidden());
    assert.equal(await page.locator('#motionToggle').innerText(),'Play motion');
    assert.equal(await page.evaluate(()=>motionAllowed()),false);
    await page.locator('#servicesBtn').click();
    await page.keyboard.press('Escape');
    await context.close();
    const noJS=await browser.newContext({javaScriptEnabled:false}),fallback=await noJS.newPage();
    await fallback.goto(url);
    assert(await fallback.locator('noscript').innerText());
    await noJS.close();
    assert.deepEqual(errors,[]);
    fs.writeFileSync('audit/browser-results.json',JSON.stringify(report,null,2));
    console.log('PASS: six viewports; all five services and images; next/back; keyboard focus; motion persistence; reduced motion; no-JS fallback; no overflow or runtime/HTTP errors.');
    console.log(JSON.stringify(report,null,2));
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
