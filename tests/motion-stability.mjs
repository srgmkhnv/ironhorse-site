import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const browser = await chromium.launch({executablePath:process.env.CHROMIUM_PATH || undefined,args:['--no-sandbox']});
const url = process.env.UI_PREVIEW_URL || 'http://127.0.0.1:3000';
let checks = 0;
const check = (value,message) => {assert.ok(value,message);checks++;};
try {
  for (const width of [390,1440]) {
    const context = await browser.newContext({viewport:{width,height:1000},isMobile:width<600,hasTouch:width<600,reducedMotion:'no-preference'});
    const page = await context.newPage();
    await page.goto(url);await page.evaluate(() => document.fonts.ready);
    check(await page.locator('.hero-content').evaluate(node => !node.getAnimations({subtree:true}).length),`${width}: opening copy has no delayed entrance or scroll transform`);
    check(await page.locator('.paint-light').evaluate(node => getComputedStyle(node).maskImage === 'none' && !getComputedStyle(node).backgroundImage.includes('url(')),`${width}: light movement does not repaint a photographic mask`);
    if (width === 1440) {
      await page.evaluate(() => {
        window.beamFrames=[];window.sampleBeam=true;
        const sample=()=>{if(!window.sampleBeam)return;window.beamFrames.push(parseFloat(getComputedStyle(document.querySelector('.hero-camera')).getPropertyValue('--beam-position')));requestAnimationFrame(sample);};
        requestAnimationFrame(sample);
      });
      await page.mouse.move(1250,250);await page.waitForTimeout(200);
      await page.mouse.move(1250,10);await page.waitForTimeout(200);
      const maxJump=await page.evaluate(() => {window.sampleBeam=false;return Math.max(...window.beamFrames.slice(1).map((v,i)=>Math.abs(v-window.beamFrames[i])));});
      check(maxJump<20,'desktop: entering/leaving the hero cannot teleport the light across the image');
    } else {
      const before=await page.locator('.hero-camera').evaluate(node => node.style.getPropertyValue('--beam-position'));
      await page.locator('.hero').evaluate(node => {
        for(const clientX of [10,350,50,300]) node.dispatchEvent(new PointerEvent('pointermove',{bubbles:true,pointerType:'touch',clientX,clientY:400}));
      });
      await page.waitForTimeout(100);
      check(await page.locator('.hero-camera').evaluate((node,before)=>node.style.getPropertyValue('--beam-position')===before,before),'phone: touch scrolling never also steers the light horizontally');
    }
    await page.waitForTimeout(1600);
    const idleWrites=await page.locator('.hero-camera').evaluate(async node => {
      let writes=0;const observer=new MutationObserver(records=>{writes+=records.length;});
      observer.observe(node,{attributes:true,subtree:true,attributeFilter:['style']});
      await new Promise(resolve=>setTimeout(resolve,200));observer.disconnect();return writes;
    });
    check(idleWrites===0,`${width}: camera and light stop writing frames when input stops`);
    await page.locator('.services .section-heading').evaluate(node => node.scrollIntoView({behavior:'instant',block:'center'}));
    await page.waitForFunction(() => document.querySelector('.services .section-heading>p').classList.contains('motion-revealed'));
    const samples=await page.locator('.services .section-heading>p').evaluate(async node => {
      const values=[];
      for(let i=0;i<25;i++){
        const style=getComputedStyle(node);
        values.push({opacity:+style.opacity,y:new DOMMatrix(style.transform).m42});
        await new Promise(requestAnimationFrame);
      }
      return values;
    });
    check(samples.every(v=>v.opacity>=.89 && Math.abs(v.y)<=8.1),`${width}: entrances remain legible and move at most eight pixels`);
    check(samples.slice(1).every((v,i)=>v.opacity>=samples[i].opacity-.01),`${width}: a visible element never flashes back to low opacity after a delay`);
    check(await page.locator('#tab-polish').evaluate(node => !node.getAnimations().length && getComputedStyle(node).transform==='none'),`${width}: service choices stay still as they enter the viewport`);
    await page.waitForTimeout(300);
    await page.evaluate(() => scrollTo({top:0,behavior:'instant'}));
    await page.locator('.services .section-heading').evaluate(node => node.scrollIntoView({behavior:'instant',block:'center'}));
    await page.waitForTimeout(50);
    check(await page.locator('.services .section-heading>p').evaluate(node=>!node.getAnimations().length),`${width}: revisiting a section does not restart its entrance`);
    const mainWidth=await page.locator('main').evaluate(node=>node.getBoundingClientRect().width);
    await page.locator('[data-photo="0"]').evaluate(node=>node.click());
    check(await page.locator('main').evaluate((node,before)=>Math.abs(node.getBoundingClientRect().width-before)<1,mainWidth),`${width}: opening the viewer does not shift the page horizontally`);
    await page.keyboard.press('Escape');
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.waitForFunction(()=>!window.IHMotion.enabled);
    check(await page.evaluate(()=>document.getAnimations().every(a=>a.playState!=='running')),`${width}: reduced motion also stops smoothed hero movement`);
    await context.close();
  }
  console.log(`PASS ${checks} motion stability assertions`);
} finally {await browser.close();}
