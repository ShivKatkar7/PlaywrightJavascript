const { test, expect } = require('@playwright/test');


//test.describe.configure({mode:'parallel'});
test('@Smoke More validations', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://www.google.com/");
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    //await page.pause();
    await page.locator("#confirmbtn").click();
    await page.on('dialog', dialog => dialog.dismiss());
    //await page.on("dialog", dialog=> dialog.accept());
    await page.locator("#mousehover").hover();
    const framespage = page.frameLocator("#courses-iframe");
    await framespage.locator("li a[href*='lifetime-access']").first().click();
    const text = await framespage.locator(".text h2").textContent();
    console.log(text.split(" ")[1].trim());
});

test('screenshots and visual comparisons', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path: 'displayed-text.png'}); //took screenshot only for that element
    await page.locator("#hide-textbox").click();
    await page.screenshot({path : 'fullpage.png'}); //took screenshot for full page
    await expect(page.locator("#displayed-text")).toBeHidden();
});

test('visual', async({page})=>
{
    await page.goto("https://www.google.com/");
    //await expect (page.screenshot()).toMatchSnapshot('google.png');
});