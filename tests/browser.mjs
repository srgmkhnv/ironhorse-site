import { chromium } from 'playwright';

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// Keep the existing interaction suite portable, with no dependency on a local skill install.
export class Browser {
  static async launch() {
    const browser = await chromium.launch({
      executablePath: process.env.CHROMIUM_PATH || undefined,
      args: ['--no-sandbox']
    });
    return new Browser(browser);
  }
  constructor(browser) { this.browser = browser; }
  async newPage({ width, height, mobile = false, reducedMotion = false }) {
    const context = await this.browser.newContext({
      viewport: { width, height },
      isMobile: mobile,
      hasTouch: true,
      reducedMotion: reducedMotion ? 'reduce' : 'no-preference'
    });
    const page = await context.newPage();
    const session = await context.newCDPSession(page);
    const consoleErrors = [];
    page.on('pageerror', error => consoleErrors.push(error.message));
    return {
      consoleErrors,
      eval: (callback, arg) => page.evaluate(callback, arg),
      send: (method, params) => session.send(method, params),
      goto: async (url, { settleMs = 0 } = {}) => {
        await page.goto(url);
        await page.evaluate(() => document.fonts.ready);
        if (settleMs) await sleep(settleMs);
      },
      setViewport: async ({ width, height, mobile = false }) => {
        await page.setViewportSize({ width, height });
        await session.send('Emulation.setDeviceMetricsOverride', { width, height, mobile, deviceScaleFactor: 1 });
      },
      close: () => context.close()
    };
  }
  close() { return this.browser.close(); }
}
