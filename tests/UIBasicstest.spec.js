const {test} = require('@playwright/test');
const {expect} = require('@playwright/test');



test('Browser context playwright test', async ({browser}) => 
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    page.locator("#username").fill("rahulshettyacademy");
});

test('Page context playwright test', async ({page}) =>
{
    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});

test("Child window handling", async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
    const [newPage] = await Promise.all([
    context.waitForEvent('page'), //listen for any new page pending , rejected or fullfilled
    documentLink.click(),
    ])

    const text = await newPage.locator(".red").textContent();
    console.log(text);
    const arraytext = text.split("@"); // from "Please email us at mentor@rahulshettyacademy.com with below template to receive response " it gave ["Please email us at mentor", "rahulshettyacademy.com with below template to receive response "]
    const domain = arraytext[1].split(" ")[0]; // from "rahulshettyacademy.com" it gave ["rahulshettyacademy.com"]
    //console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());


});