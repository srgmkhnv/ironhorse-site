import assert from 'node:assert/strict';
import { chromium } from 'playwright';
const browser = await chromium.launch({executablePath:process.env.CHROMIUM_PATH || undefined,args:['--no-sandbox']});
const url = process.env.UI_PREVIEW_URL || 'http://127.0.0.1:3000';
const checks = [];
const check = (value,message) => { assert.ok(value,message); checks.push(message); };
const settle = page => page.waitForFunction(() => !document.querySelector('.motion-sizing,.service-photo-outgoing,.photo-transition-outgoing'));
const click = (page,selector) => page.locator(selector).first().evaluate(node => node.click());
try {
  for (const [width,height] of [[320,720],[390,844],[568,320],[768,1024],[1100,900],[1280,800],[1440,1000]]) {
    const context = await browser.newContext({viewport:{width,height},reducedMotion:'no-preference'});
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror',error => errors.push(error.message));
    await page.goto(url);await page.evaluate(() => document.fonts.ready);
    check(await page.evaluate(() => window.IHMotion.enabled),`${width}: normal motion enabled`);
    // Sample entrances across the page, without auto-waiting for animations to finish.
    for (const selector of ['.services .section-heading h2','.photo-card','.care-form legend','.approach-photo','.studio-panel','.faq h2','.closing h2','.footer-branch']) {
      await page.locator(selector).first().evaluate(node => node.scrollIntoView({behavior:'instant',block:'center'}));
      await page.waitForFunction(selector => document.querySelector(selector).classList.contains('motion-revealed'),selector);
      check(await page.locator(selector).first().evaluate(node => node.getAnimations().some(a => a.playState === 'running')),`${width}: ${selector} has a visible entrance`);
    }
    await page.locator('#services').evaluate(node => node.scrollIntoView({behavior:'instant',block:'start'}));
    await page.waitForTimeout(750);
    if (width <= 1100) {
      const start = await page.locator('#service-film').evaluate(node => node.getBoundingClientRect().height);
      await click(page,'#tab-film');await page.waitForTimeout(80);
      check(await page.locator('#service-film').evaluate((node,start) => {
        const height = node.getBoundingClientRect().height;
        return height > 1 && height < start && node.inert && node.getAttribute('aria-hidden') === 'true';
      },start),`${width}: service collapses through intermediate heights and becomes inert`);
      await settle(page);
      check(await page.locator('#service-film').evaluate(node => node.hidden && !node.inert),`${width}: closed service releases its temporary styles`);
      await page.evaluate(() => { for(const key of ['film','polish','interior']) document.querySelector(`#tab-${key}`).click(); });
      await settle(page);
      check(await page.evaluate(() => document.querySelectorAll('.service-panel:not([hidden])').length === 1 && !document.querySelector('#service-interior').hidden),`${width}: rapid service changes keep only the final panel`);
      await click(page,'#service-interior .service-visual>summary');await page.waitForTimeout(80);
      check(await page.locator('#service-interior .service-visual').evaluate(node => node.open && node.classList.contains('motion-sizing')),`${width}: service photo disclosure animates`);
      await settle(page);
      await click(page,'#service-interior .service-visual>summary');await page.waitForTimeout(50);
      await click(page,'#service-interior .service-visual>summary');await settle(page);
      check(await page.locator('#service-interior .service-visual').evaluate(node => node.open && !node.hasAttribute('data-motion-open') && getComputedStyle(node.querySelector('img')).objectFit === 'contain'),`${width}: reversing photo disclosure preserves full image`);
    } else {
      await click(page,'#tab-polish');
      check(await page.locator('#service-polish').evaluate(node => node.querySelector('.service-photo-outgoing') && node.querySelector('.service-details').getAnimations().some(a => a.playState === 'running')),`${width}: desktop services crossfade photograph and move description`);
      await page.evaluate(() => { document.querySelector('#tab-tint').click();document.querySelector('#tab-wash').click(); });
      await settle(page);
      check(await page.evaluate(() => !document.querySelector('#service-wash').hidden && document.querySelectorAll('.service-panel:not([hidden])').length === 1),`${width}: rapid desktop changes finish on the final service`);
    }
    await page.locator('.faq-list').evaluate(node => node.scrollIntoView({behavior:'instant',block:'center'}));
    await page.waitForTimeout(650);
    const closed = await page.locator('.faq-list details').first().evaluate(node => node.getBoundingClientRect().height);
    await click(page,'.faq-list summary');await page.waitForTimeout(80);
    check(await page.locator('.faq-list details').first().evaluate((node,closed) => node.open && node.getBoundingClientRect().height > closed && node.getBoundingClientRect().height < node.scrollHeight,closed),`${width}: FAQ opens through intermediate heights`);
    await click(page,'.faq-list summary');await page.waitForTimeout(40);
    await click(page,'.faq-list summary');await settle(page);
    check(await page.locator('.faq-list details').first().evaluate(node => node.open && !node.querySelector('summary').hasAttribute('aria-expanded')),`${width}: reversing FAQ settles native semantics`);
    await click(page,'.faq-list summary');await settle(page);
    check(!(await page.locator('.faq-list details').first().evaluate(node => node.open)),`${width}: FAQ closing animation completes`);
    await page.locator('#care').evaluate(node => node.scrollIntoView({behavior:'instant',block:'start'}));
    await page.evaluate(() => {
      for(const key of ['film','ceramic','wash']) {
        const input=document.querySelector(`[data-care-service="${key}"]`);input.checked=true;input.dispatchEvent(new Event('change',{bubbles:true}));
      }
    });
    check(await page.locator('#care-selected').evaluate(node => node.classList.contains('motion-sizing')),`${width}: care list height animates on selection`);
    await settle(page);
    check(await page.locator('#care-selected [data-remove-service]').count() === 3,`${width}: rapid selection retains three unique services`);
    await page.locator('[data-remove-service="film"]').focus();await click(page,'[data-remove-service="film"]');await settle(page);
    check(await page.evaluate(() => document.querySelectorAll('#care-selected [data-remove-service]').length === 2 && document.activeElement.matches('[data-remove-service]')),`${width}: animated removal preserves focus`);
    await page.locator('[data-photo="0"]').evaluate(node => {node.scrollIntoView({behavior:'instant'});node.click();});
    await page.waitForFunction(() => !document.querySelector('#photo-full').hidden);
    check(await page.locator('#photo-viewer').evaluate(node => node.getAnimations().some(a => a.playState === 'running')),`${width}: gallery viewer entrance animates`);
    await click(page,'#photo-next');
    check(await page.locator('.photo-transition-outgoing').count() === 1,`${width}: gallery retains outgoing frame while decoding next image`);
    await page.waitForFunction(() => !document.querySelector('#photo-full').hidden);await settle(page);
    check(await page.locator('#photo-index').textContent() === '2 / 9',`${width}: photo transition completes`);
    await page.evaluate(() => { for(let i=0;i<13;i++) document.querySelector('#photo-next').click(); });
    await page.waitForFunction(() => !document.querySelector('#photo-full').hidden);await settle(page);
    check(await page.locator('#photo-index').textContent() === '6 / 9' && (await page.locator('#photo-full').getAttribute('src')).endsWith('photo-05.webp'),`${width}: rapid photo navigation keeps last decoded image`);
    await page.keyboard.press('Escape');
    // Interrupt an actual disclosure, rather than checking reduced motion only while idle.
    await click(page,'.faq-list summary');await page.waitForTimeout(50);
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.waitForFunction(() => !window.IHMotion.enabled && !document.querySelector('.motion-sizing,.photo-transition-outgoing,.service-photo-outgoing'));
    check(await page.evaluate(() => document.getAnimations().every(a => a.playState !== 'running') && document.querySelector('.faq-list details').open),`${width}: runtime reduction settles pending state and cancels every animation`);
    await click(page,'.faq-list summary');
    check(!(await page.locator('.faq-list details').first().evaluate(node => node.open)),`${width}: reduced motion uses immediate native disclosure`);
    await page.emulateMedia({reducedMotion:'no-preference'});
    await click(page,'.faq-list summary');await page.waitForTimeout(50);
    await page.setViewportSize({width:width===1440?390:1440,height:1000});await settle(page);
    check(await page.evaluate(() => !document.querySelector('.motion-sizing') && document.querySelector('.faq-list details').open),`${width}: resizing mid-transition releases height constraints`);
    check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),`${width}: no horizontal overflow`);
    check(errors.length===0,`${width}: no JavaScript errors`);
    await context.close();
  }
  console.log(`PASS ${checks.length} motion assertions`);
} finally { await browser.close(); }
