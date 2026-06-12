


const {test, expect} = require('@playwright/test');

let webContext;

test.beforeAll(async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();

    const username = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await username.fill("shivanikatkar@gmail.com");
    await password.fill("Shivani@7213");
    await page.locator("#login").click();
    await page.waitForLoadState ('networkidle');
    //captured the storage state of the browser for login
    await context.storageState({path: 'state.json'});
    webContext = await browser.newContext({storageState: 'state.json'});
})

test('Client app login', async ()=>
{
    const page = await webContext.newPage(); // this opage is created dynamically with existing login properties

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const productName = 'ZARA COAT 3';
    const product = page.locator(".card-body");

    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    //we need to fetch  ZARA COAT 3
    const count = await product.count();
    for(let i=0; i< count; i++)
    {
       if(await product.nth(i).locator("b").textContent() === productName)
       {
         await product.nth(i).locator(":text('Add To Cart')").click();
         break;
       }
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("button:has-text('Checkout')").click();
    await page.locator("select.input.ddl").first().selectOption('04');
    await page.locator("select.input.ddl").nth(1).selectOption('26');
    await page.locator(".field.small").nth(1).locator(".input.txt").fill("752");
    await page.locator("input[type='text']").nth(2).fill("HDFC");
    await page.locator("[placeholder*='Country']").pressSequentially('ind');
    const dropdown = await page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for(let i=0; i< optionsCount;i++)
    {
        const text = await dropdown.locator("button").nth(i).textContent();
        if(text.trim() === "India")
        {
          await dropdown.locator("button").nth(i).click();
          break;
        }
    }
    //await page.pause();
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderID);
    await page.locator("[routerlink*='myorders']").first().click();
    await page.locator("tbody").waitFor();
    const row = await page.locator("tbody tr");
    for(let i=0;i<await row.count();i++)
    {
      const rowOrderID = await row.nth(i).locator("th").textContent();
      if(orderID.includes(rowOrderID))
      {
        await row.nth(i).locator("button").first().click();
        break;
      }
    }
    const viewpageOrderID = await page.locator(".col-text").textContent();
    expect(orderID.includes(viewpageOrderID)).toBeTruthy();
});

test('Test case 2', async ()=>
{
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log("Titles are: " +titles);
});