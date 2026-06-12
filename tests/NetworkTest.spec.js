const { APIUtils } = require('../Utils/APIUtils');  //importing the APIUtils class to be used in this file
const { test, expect, request } = require('@playwright/test');

const loginPayload = { userEmail: "shivanikatkar@gmail.com", userPassword: "Shivani@7213" };
const createOrderPayload = { orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
let response;
let fakePayloadOrder = { data: [], message: "No Orders" };

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayload);
  response = await apiUtils.createOrder(createOrderPayload);
})

//create order is success
test('Place the order', async ({ page }) => {
  page.addInitScript(value => {
    window.localStorage.setItem("token", value);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  //before you click on orders link mock the api and check how it behaves when no data present in order //adding "*" in place of ID
  //staing it can accept any id now
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route => {
      const response = page.request.fetch(route.request());
      let body = JSON.stringify(fakePayloadOrder);
      route.fulfill(
        {
          response,
          body,
        }
      )
    }
  );

  await page.locator("[routerlink*='myorders']").first().click();
  await page.pause();
  console.log(await page.locator(".mt-4").textContent());
});