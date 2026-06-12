# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: NetworkTest.spec.js >> Place the order
- Location: tests/NetworkTest.spec.js:16:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[routerlink*=\'myorders\']').first()

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e7]: Ecom
      - generic [ref=e9]:
        - link " dummywebsite@rahulshettyacademy.com" [ref=e11] [cursor=pointer]:
          - /url: emailto:dummywebsite@rahulshettyacademy.com
          - generic [ref=e12]: 
          - text: dummywebsite@rahulshettyacademy.com
        - generic [ref=e13]:
          - link "" [ref=e14] [cursor=pointer]:
            - /url: "#"
            - generic [ref=e15]: 
          - link "" [ref=e16] [cursor=pointer]:
            - /url: "#"
            - generic [ref=e17]: 
          - link "" [ref=e18] [cursor=pointer]:
            - /url: "#"
            - generic [ref=e19]: 
          - link "" [ref=e20] [cursor=pointer]:
            - /url: "#"
            - generic [ref=e21]: 
  - generic [ref=e22]:
    - generic [ref=e23]:
      - heading "We Make Your Shopping Simple" [level=3]
      - heading "Practice Website for Rahul Shetty Academy Students" [level=1] [ref=e24]:
        - text: Practice Website for
        - emphasis [ref=e25]: Rahul Shetty Academy
        - text: Students
      - link "Register" [ref=e26] [cursor=pointer]:
        - /url: "#/auth/register"
    - generic [ref=e28]:
      - paragraph [ref=e29]:
        - generic [ref=e30]: Register to sign in with your personal account
      - generic [ref=e31]:
        - heading "Log in" [level=1] [ref=e32]
        - generic [ref=e33]:
          - generic [ref=e34]:
            - generic [ref=e35]: Email
            - textbox "email@example.com" [ref=e36]
          - generic [ref=e37]:
            - generic [ref=e38]: Password
            - textbox "enter your passsword" [ref=e39]
          - button "Login" [ref=e40] [cursor=pointer]
        - link "Forgot password?" [ref=e41] [cursor=pointer]:
          - /url: "#/auth/password-new"
        - paragraph [ref=e42] [cursor=pointer]: Don't have an account? Register here
  - generic [ref=e43]:
    - heading "Why People Choose Us?" [level=1] [ref=e46]
    - generic [ref=e47]:
      - generic [ref=e48]:
        - generic [ref=e50]: 
        - generic [ref=e51]:
          - heading "3546540" [level=1]
          - paragraph [ref=e52]: Successfull Orders
      - generic [ref=e53]:
        - generic [ref=e55]: 
        - generic [ref=e56]:
          - heading "37653" [level=1]
          - paragraph [ref=e57]: Customers
      - generic [ref=e58]:
        - generic [ref=e60]: 
        - generic [ref=e61]:
          - heading "3243" [level=1]
          - paragraph [ref=e62]: Sellers
    - generic [ref=e63]:
      - generic [ref=e64]:
        - generic [ref=e66]: 
        - generic [ref=e67]:
          - heading "4500+" [level=1]
          - paragraph [ref=e68]: Daily Orders
      - generic [ref=e69]:
        - generic [ref=e71]: 
        - generic [ref=e72]:
          - heading "500+" [level=1]
          - paragraph [ref=e73]: Daily New Customer Joining
```

# Test source

```ts
  1  | const { APIUtils } = require('../Utils/APIUtils');  //importing the APIUtils class to be used in this file
  2  | const { test, expect, request } = require('@playwright/test');
  3  | 
  4  | const loginPayload = { userEmail: "shivanikatkar@gmail.com", userPassword: "Shivani@7213" };
  5  | const createOrderPayload = { orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
  6  | let response;
  7  | let fakePayloadOrder = { data: [], message: "No Orders" };
  8  | 
  9  | test.beforeAll(async () => {
  10 |   const apiContext = await request.newContext();
  11 |   const apiUtils = new APIUtils(apiContext, loginPayload);
  12 |   response = await apiUtils.createOrder(createOrderPayload);
  13 | })
  14 | 
  15 | //create order is success
  16 | test('Place the order', async ({ page }) => {
  17 |   page.addInitScript(value => {
  18 |     window.localStorage.setItem("token", value);
  19 |   }, response.token);
  20 | 
  21 |   await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  22 |   //before you click on orders link mock the api and check how it behaves when no data present in order //adding "*" in place of ID
  23 |   //staing it can accept any id now
  24 |   await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
  25 |     async route => {
  26 |       const response = page.request.fetch(route.request());
  27 |       let body = JSON.stringify(fakePayloadOrder);
  28 |       route.fulfill(
  29 |         {
  30 |           response,
  31 |           body,
  32 |         }
  33 |       )
  34 |     }
  35 |   );
  36 | 
> 37 |   await page.locator("[routerlink*='myorders']").first().click();
     |                                                          ^ Error: locator.click: Test timeout of 30000ms exceeded.
  38 |   await page.pause();
  39 |   console.log(await page.locator(".mt-4").textContent());
  40 | });
```