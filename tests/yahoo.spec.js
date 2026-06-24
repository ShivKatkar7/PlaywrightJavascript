/**
 * yahoo-sports-nba-navbar.js
 *
 * Navigates to https://sports.yahoo.com, clicks the "NBA" item in the
 * top navigation bar, waits for the NBA section to load, then finds and
 * lists every element/link inside the NBA sub-navigation bar that appears
 * on the resulting page (https://sports.yahoo.com/nba/).
 *
 * Run with:
 *   npm init -y && npm install playwright
 *   npx playwright install chromium
 *   node yahoo-sports-nba-navbar.js
 */

const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    // A realistic UA helps avoid bot-detection redirects/consent walls
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
      '(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    viewport: { width: 1366, height: 900 },
  });
  const page = await context.newPage();

  try {
    // 1. Navigate to Yahoo Sports
    await page.goto('https://sports.yahoo.com', { waitUntil: 'domcontentloaded' });

    // Dismiss a cookie/consent dialog if Yahoo shows one (varies by region)
    const consentBtn = page.getByRole('button', { name: /agree|accept/i }).first();
    if (await consentBtn.isVisible({ timeout: 4000 }).catch(() => false)) {
      await consentBtn.click().catch(() => {});
    }

    // 2. Click the "NBA" link in the main top navbar
    //    (exact match avoids accidentally matching "NBA Draft", "NBA Cup", etc.)
    const nbaNavLink = page.getByRole('link', { name: 'NBA', exact: true }).first();
    await nbaNavLink.waitFor({ state: 'visible' });
    await nbaNavLink.click();

    // 3. Wait for the NBA landing page to load
    await page.waitForURL('**/nba/**', { timeout: 15000 });
    await page.waitForLoadState('domcontentloaded');

    // 4. The NBA page renders its own sub-navigation bar (Draft Guide, News,
    //    Scores, Schedule, Standings, Stats, Teams, Players, Injuries, Odds,
    //    Playoff Bracket, Fantasy Basketball, etc). Grab every link in it.
    //    This bar is the <ul> that sits directly under the main site header
    //    and contains a link back to "/nba/" itself plus all the NBA subpages.
    const subNavLocator = page.locator('ul', { has: page.locator('a[href="/nba/"]') }).first();

    await subNavLocator.waitFor({ state: 'visible', timeout: 10000 });

    const navItems = await subNavLocator.locator('a').evaluateAll((links) =>
      links.map((a) => ({
        text: a.textContent.trim(),
        href: a.href,
      }))
    );

    console.log(`\nFound ${navItems.length} items in the NBA sub-navigation bar:\n`);
    navItems.forEach((item, i) => {
      console.log(`${i + 1}. ${item.text || '(no text)'}  ->  ${item.href}`);
    });

    // Optional: also dump as JSON for programmatic use
    console.log('\nJSON output:');
    console.log(JSON.stringify(navItems, null, 2));
  } catch (err) {
    console.error('Script failed:', err);
  } finally {
    await browser.close();
  }
})();