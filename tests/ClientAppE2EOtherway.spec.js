const {test, expect} = require('@playwright/test');

test('Client app login', async ({page})=>
{
    const productName = 'ZARA COAT 3';
    const product = page.locator(".card-body");
    const username = page.getByPlaceholder("email@example.com");
    const password = page.getByPlaceholder("enter your passsword");
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await username.fill("shivanikatkar@gmail.com");
    await password.fill("Shivani@7213");
    await page.getByRole("button", {name: 'Login'}).click();
    await page.waitForLoadState ("networkidle");
    await page.locator(".card-body b").first().waitFor();
    // const titles = await page.locator(".card-body b").allTextContents();
    // console.log(titles);

    //we need to fetch  ZARA COAT 3
    /*const count = await product.count();
    for(let i=0; i< count; i++)
    {
       if(await product.nth(i).locator("b").textContent() === productName)
       {
         await product.nth(i).locator(":text('Add To Cart')").click();
         break;
       }
    } */

    //Lets write above loop code using filters in playwright
    await page.locator('.card-body').filter({ hasText: productName })
    .getByRole('button', { name: 'Add To Cart' }).click();

    await page.getByRole("listitem").getByRole("button", {name: 'Cart'}).click();
    await page.locator("div li").first().waitFor();
    await expect(page.getByText('ZARA COAT 3')).toBeVisible();
    await page.getByRole("button", {name: 'Checkout'}).click();
    await page.locator("select.input.ddl").first().selectOption('04');
    await page.locator("select.input.ddl").nth(1).selectOption('26');
    await page.locator(".field.small").nth(1).locator(".input.txt").fill("752");
    await page.locator("input[type='text']").nth(2).fill("HDFC");
    await page.getByPlaceholder("Select Country").pressSequentially('ind');
    await page.getByRole("button", {name: "India"}).nth(1).click();
    await page.getByText("PLACE ORDER").click();

    /*const dropdown = await page.locator(".ta-results");
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
    } */


    //await page.pause();
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
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