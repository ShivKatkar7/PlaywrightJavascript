const {APIUtils} = require('../Utils/APIUtils');  //importing the APIUtils class to be used in this file
const {test, expect, request} = require('@playwright/test');

const loginPayload = {userEmail:"shivanikatkar@gmail.com",userPassword:"Shivani@7213"};
const createOrderPayload = {orders:[{country:"Cuba",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
let response;

test.beforeAll(async () =>
{
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(createOrderPayload);   
})

test.beforeEach(async ({page})=>
{

});

//create order is success
test('Place the order', async ({page})=>
{
    page.addInitScript(value =>
    {
        window.localStorage.setItem("token", value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("[routerlink*='myorders']").first().click();
    await page.locator("tbody").waitFor();

    const row = await page.locator("tbody tr");
    for(let i=0;i<await row.count();i++)
    {
      const rowOrderID = await row.nth(i).locator("th").textContent();
      if(response.orderID.includes(rowOrderID))
      {
        await row.nth(i).locator("button").first().click();
        break;
      }
    }
    const viewpageOrderID = await page.locator(".col-text").textContent();
    await page.pause();
    expect(response.orderID.includes(viewpageOrderID)).toBeTruthy();
});