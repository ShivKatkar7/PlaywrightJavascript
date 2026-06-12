# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ClientAppE2EOtherway.spec.js >> Client app login
- Location: tests/ClientAppE2EOtherway.spec.js:3:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.waitFor: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('div li').first() to be visible

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e5]:
    - generic [ref=e7]:
      - link "Automation Automation Practice":
        - /url: ""
        - generic [ref=e8] [cursor=pointer]:
          - heading "Automation" [level=3] [ref=e9]
          - paragraph [ref=e10]: Automation Practice
    - text: 
    - link "Get Shortlisted by Recruiters - Take QA Skill Assessments on TechSmartHire" [ref=e11] [cursor=pointer]:
      - /url: https://techsmarthire.com/
    - list [ref=e12]:
      - listitem [ref=e13] [cursor=pointer]:
        - button " HOME" [ref=e14]:
          - generic [ref=e15]: 
          - text: HOME
      - listitem
      - listitem [ref=e16] [cursor=pointer]:
        - button " ORDERS" [ref=e17]:
          - generic [ref=e18]: 
          - text: ORDERS
      - listitem [ref=e19] [cursor=pointer]:
        - button " Cart" [ref=e20]:
          - generic [ref=e21]: 
          - text: Cart
      - listitem [ref=e22] [cursor=pointer]:
        - button "Sign Out" [ref=e23]:
          - generic [ref=e24]: 
          - text: Sign Out
  - generic [ref=e25]:
    - generic [ref=e26]:
      - heading "My Cart" [level=1] [ref=e27]
      - button "Continue Shopping❯" [ref=e28] [cursor=pointer]
    - heading "No Products in Your Cart !" [level=1] [ref=e30]
```

# Test source

```ts
  1  | const {test, expect} = require('@playwright/test');
  2  | 
  3  | test('Client app login', async ({page})=>
  4  | {
  5  |     const productName = 'ZARA COAT 3';
  6  |     const product = page.locator(".card-body");
  7  |     const username = page.getByPlaceholder("email@example.com");
  8  |     const password = page.getByPlaceholder("enter your passsword");
  9  |     await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  10 |     await username.fill("shivanikatkar@gmail.com");
  11 |     await password.fill("Shivani@7213");
  12 |     await page.getByRole("button", {name: 'Login'}).click();
  13 |     await page.waitForLoadState ("networkidle");
  14 |     await page.locator(".card-body b").first().waitFor();
  15 |     // const titles = await page.locator(".card-body b").allTextContents();
  16 |     // console.log(titles);
  17 | 
  18 |     //we need to fetch  ZARA COAT 3
  19 |     /*const count = await product.count();
  20 |     for(let i=0; i< count; i++)
  21 |     {
  22 |        if(await product.nth(i).locator("b").textContent() === productName)
  23 |        {
  24 |          await product.nth(i).locator(":text('Add To Cart')").click();
  25 |          break;
  26 |        }
  27 |     } */
  28 | 
  29 |     //Lets write above loop code using filters in playwright
  30 |     await page.locator('.card-body').filter({ hasText: productName })
  31 |     .getByRole('button', { name: 'Add To Cart' }).click();
  32 | 
  33 |     await page.getByRole("listitem").getByRole("button", {name: 'Cart'}).click();
> 34 |     await page.locator("div li").first().waitFor();
     |                                          ^ Error: locator.waitFor: Test timeout of 30000ms exceeded.
  35 |     await expect(page.getByText('ZARA COAT 3')).toBeVisible();
  36 |     await page.getByRole("button", {name: 'Checkout'}).click();
  37 |     await page.locator("select.input.ddl").first().selectOption('04');
  38 |     await page.locator("select.input.ddl").nth(1).selectOption('26');
  39 |     await page.locator(".field.small").nth(1).locator(".input.txt").fill("752");
  40 |     await page.locator("input[type='text']").nth(2).fill("HDFC");
  41 |     await page.getByPlaceholder("Select Country").pressSequentially('ind');
  42 |     await page.getByRole("button", {name: "India"}).nth(1).click();
  43 |     await page.getByText("PLACE ORDER").click();
  44 | 
  45 |     /*const dropdown = await page.locator(".ta-results");
  46 |     await dropdown.waitFor();
  47 |     const optionsCount = await dropdown.locator("button").count();
  48 |     for(let i=0; i< optionsCount;i++)
  49 |     {
  50 |         const text = await dropdown.locator("button").nth(i).textContent();
  51 |         if(text.trim() === "India")
  52 |         {
  53 |           await dropdown.locator("button").nth(i).click();
  54 |           break;
  55 |         }
  56 |     } */
  57 | 
  58 | 
  59 |     //await page.pause();
  60 |     await expect(page.getByText("Thankyou for the order.")).toBeVisible();
  61 |     const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  62 |     console.log(orderID);
  63 |     await page.locator("[routerlink*='myorders']").first().click();
  64 |     await page.locator("tbody").waitFor();
  65 |     const row = await page.locator("tbody tr");
  66 |     for(let i=0;i<await row.count();i++)
  67 |     {
  68 |       const rowOrderID = await row.nth(i).locator("th").textContent();
  69 |       if(orderID.includes(rowOrderID))
  70 |       {
  71 |         await row.nth(i).locator("button").first().click();
  72 |         break;
  73 |       }
  74 |     }
  75 |     const viewpageOrderID = await page.locator(".col-text").textContent();
  76 |     expect(orderID.includes(viewpageOrderID)).toBeTruthy();
  77 | });
```