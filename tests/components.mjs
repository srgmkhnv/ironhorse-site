import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined, args: ['--no-sandbox'] });
const url = process.env.UI_PREVIEW_URL || 'http://127.0.0.1:3000';
const checks = [];
const check = (value, message) => { assert.ok(value, message); checks.push(message); };
try {
  for (const [width, height] of [[320,720], [390,844], [568,320], [768,1024], [1100,900], [1280,800], [1440,1000]]) {
    const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(url);
    await page.evaluate(() => document.fonts.ready);
    for (const source of ['header', 'care']) {
      const trigger = page.locator(source === 'header' ? '#header-city' : '#care-city-trigger');
      const dialog = page.locator(`#${source}-city-popover`);
      await trigger.click();
      check(await dialog.evaluate(node => node.open && node.matches(':modal') === (innerWidth <= 600)), `${width}: ${source} picker modality`);
      check(await dialog.evaluate(node => {
        const r = node.getBoundingClientRect();
        return r.left >= 0 && r.right <= innerWidth + 1 && r.top >= 0 && r.bottom <= innerHeight + 1 && node.scrollHeight >= node.clientHeight;
      }), `${width}: ${source} picker fits viewport`);
      check(await page.evaluate(() => document.activeElement.getAttribute('aria-selected') === 'true'), `${width}: ${source} picker focuses selection`);
      await page.keyboard.press('End');
      await page.keyboard.press('Enter');
      check(await page.evaluate(() => document.querySelector('#care-city').value === 'kaspiysk' && document.querySelector('#care-city-name').textContent === 'Каспийск' && document.querySelector('#header-city-name').textContent === 'Каспийск' && document.querySelectorAll('[role="option"][aria-selected="true"]').length === 2), `${width}: ${source} picker synchronizes form, header and both lists`);
      check(await trigger.evaluate(node => node === document.activeElement && node.getAttribute('aria-expanded') === 'false'), `${width}: ${source} selection restores focus`);
      await trigger.press('ArrowUp');
      await page.keyboard.press('Home');
      await page.keyboard.press('Space');
      check(await page.locator('#care-city').inputValue() === 'moscow', `${width}: ${source} picker supports Home and Space`);
      await trigger.click();
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Escape');
      check(await page.locator('#care-city').inputValue() === 'moscow' && !(await dialog.evaluate(node => node.open)), `${width}: ${source} Escape cancels uncommitted choice`);
      await trigger.click();
      await dialog.locator('[data-close-city]').click();
      check(await trigger.evaluate(node => node === document.activeElement), `${width}: ${source} close button restores focus`);
      // Exercise real pointer input on every option, including its address text.
      for (const [city, phone] of [['moscow','79104989211'], ['makhachkala','79674087971'], ['kaspiysk','79023552950']]) {
        await trigger.click();
        await dialog.locator(`[data-${source === 'header' ? 'header-city' : 'care-city-choice'}="${city}"] small`).click();
        check(await page.locator('#care-city').inputValue() === city && (await page.locator('#studio-call').getAttribute('href')).endsWith(phone), `${width}: ${source} ${city} pointer selection`);
      }
    }
    await page.locator('[data-care-service="film"]').check();
    check(await page.locator('[data-add-service="film"]').getAttribute('data-added') === 'true', `${width}: checkbox updates service action`);
    await page.locator('[data-remove-service="film"]').click();
    check(!(await page.locator('[data-care-service="film"]').isChecked()) && await page.locator('[data-add-service="film"]').getAttribute('data-added') === 'false', `${width}: removal restores unselected service action`);
    await page.locator('[data-care-service="polish"]').focus();
    await page.keyboard.press('Space');
    check(await page.locator('[data-care-service="polish"]').isChecked(), `${width}: service checkbox keyboard selection`);
    check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}: no horizontal overflow`);
    check(errors.length === 0, `${width}: no JavaScript errors`);
    if (width === 390) {
      await page.locator('#care-city-trigger').click();
      await page.mouse.click(8, 8);
      check(!(await page.locator('#care-city-popover').evaluate(node => node.open)) && await page.locator('#care-city-trigger').evaluate(node => node === document.activeElement), 'mobile: backdrop dismisses sheet and restores focus');
      await page.locator('#care-city-trigger').click();
      await page.setViewportSize({width:768, height:1024});
      check(!(await page.locator('#care-city-popover').evaluate(node => node.open)) && await page.evaluate(() => !document.documentElement.classList.contains('city-selecting')), 'resize: modal closes and scrolling unlocks');
    }
    await context.close();
  }
  const context = await browser.newContext({ viewport: {width:390,height:844}, javaScriptEnabled:false });
  const page = await context.newPage();
  await page.goto(url);
  check(await page.locator('#care-city').isVisible() && !(await page.locator('#care-city-trigger').isVisible()), 'no JavaScript: native city select remains available');
  await page.locator('#care-city').selectOption('kaspiysk');
  check(await page.locator('#care-city').inputValue() === 'kaspiysk', 'no JavaScript: native city selection works');
  await context.close();
  console.log(`PASS ${checks.length} component assertions`);
} finally { await browser.close(); }
