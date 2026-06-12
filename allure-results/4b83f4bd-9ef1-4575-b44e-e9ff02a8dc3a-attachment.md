# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: WebAPIPart2.spec.js >> Client app login
- Location: tests/WebAPIPart2.spec.js:25:1

# Error details

```
Error: locator.textContent: Error: strict mode violation: locator('.em-spacer-1 .ng-star-inserted') resolved to 2 elements:
    1) <label _ngcontent-too-c44="" class="ng-star-inserted"> | 69ee5503f86ba51a658952e0 | </label> aka getByText('| 69ee5503f86ba51a658952e0 |')
    2) <label _ngcontent-too-c44="" class="ng-star-inserted"> | 69ee5503f86ba51a658952e3 | </label> aka getByText('| 69ee5503f86ba51a658952e3 |')

Call log:
  - waiting for locator('.em-spacer-1 .ng-star-inserted')

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - link "Free Access to InterviewQues/ResumeAssistance/Material" [ref=e3] [cursor=pointer]:
      - /url: https://rahulshettyacademy.com/documents-request
    - link "Get Shortlisted by Recruiters - Take QA Skill Assessments on TechSmartHire" [ref=e4] [cursor=pointer]:
      - /url: https://techsmarthire.com/
  - generic [ref=e5]:
    - heading [level=3] [ref=e6]:
      - img [ref=e8]
    - generic [ref=e14]:
      - generic [ref=e15]:
        - generic [ref=e16]: "Username:"
        - textbox "Username:" [active] [ref=e17]: rahulshettyacademy
      - generic [ref=e18]:
        - generic [ref=e19]: "Password:"
        - textbox "Password:" [ref=e20]
      - generic [ref=e22]:
        - generic [ref=e23] [cursor=pointer]:
          - text: Admin
          - radio "Admin" [checked] [ref=e24]
        - generic [ref=e26] [cursor=pointer]:
          - text: User
          - radio "User" [ref=e27]
      - combobox [ref=e30]:
        - option "Student" [selected]
        - option "Teacher"
        - option "Consultant"
      - generic [ref=e31]:
        - generic [ref=e32]:
          - checkbox "I Agree to the terms and conditions" [ref=e34]
          - generic [ref=e35]:
            - text: I Agree to the
            - link "terms and conditions" [ref=e36] [cursor=pointer]:
              - /url: "#"
        - button "Sign In" [ref=e37] [cursor=pointer]
      - paragraph [ref=e39]:
        - text: (username is
        - generic [ref=e40]: rahulshettyacademy
        - text: and Password is
        - generic [ref=e41]: Learning@830$3mK2
        - text: )
```

# Test source

```ts
  1  | 
  2  | 
  3  | 
  4  | const {test, expect} = require('@playwright/test');
  5  | 
  6  | let webContext;
  7  | 
  8  | test.beforeAll(async ({browser}) =>
  9  | {
  10 |     const context = await browser.newContext();
  11 |     const page = await context.newPage();
  12 | 
  13 |     const username = page.locator("#userEmail");
  14 |     const password = page.locator("#userPassword");
  15 |     await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  16 |     await username.fill("shivanikatkar@gmail.com");
  17 |     await password.fill("Shivani@7213");
  18 |     await page.locator("#login").click();
  19 |     await page.waitForLoadState ("networkidle");
  20 |     //captured the storage state of the browser for login
  21 |     await context.storageState({path: 'state.json'});
  22 |     webContext = await browser.newContext({storageState: 'state.json'});
  23 | })
  24 | 
  25 | test('Client app login', async ()=>
  26 | {
  27 |     const page = await webContext.newPage(); // this opage is created dynamically with existing login properties
  28 | 
  29 |     await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  30 |     const productName = 'ZARA COAT 3';
  31 |     const product = page.locator(".card-body");
  32 | 
  33 |     await page.locator(".card-body b").first().waitFor();
  34 |     const titles = await page.locator(".card-body b").allTextContents();
  35 |     console.log(titles);
  36 |     //we need to fetch  ZARA COAT 3
  37 |     const count = await product.count();
  38 |     for(let i=0; i< count; i++)
  39 |     {
  40 |        if(await product.nth(i).locator("b").textContent() === productName)
  41 |        {
  42 |          await product.nth(i).locator(":text('Add To Cart')").click();
  43 |          break;
  44 |        }
  45 |     }
  46 |     await page.locator("[routerlink*='cart']").click();
  47 |     await page.locator("div li").first().waitFor();
  48 |     const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  49 |     expect(bool).toBeTruthy();
  50 |     await page.locator("button:has-text('Checkout')").click();
  51 |     await page.locator("select.input.ddl").first().selectOption('04');
  52 |     await page.locator("select.input.ddl").nth(1).selectOption('26');
  53 |     await page.locator(".field.small").nth(1).locator(".input.txt").fill("752");
  54 |     await page.locator("input[type='text']").nth(2).fill("HDFC");
  55 |     await page.locator("[placeholder*='Country']").pressSequentially('ind');
  56 |     const dropdown = await page.locator(".ta-results");
  57 |     await dropdown.waitFor();
  58 |     const optionsCount = await dropdown.locator("button").count();
  59 |     for(let i=0; i< optionsCount;i++)
  60 |     {
  61 |         const text = await dropdown.locator("button").nth(i).textContent();
  62 |         if(text.trim() === "India")
  63 |         {
  64 |           await dropdown.locator("button").nth(i).click();
  65 |           break;
  66 |         }
  67 |     }
  68 |     //await page.pause();
  69 |     await page.locator(".action__submit").click();
  70 |     await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
> 71 |     const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
     |                                                                          ^ Error: locator.textContent: Error: strict mode violation: locator('.em-spacer-1 .ng-star-inserted') resolved to 2 elements:
  72 |     console.log(orderID);
  73 |     await page.locator("[routerlink*='myorders']").first().click();
  74 |     await page.locator("tbody").waitFor();
  75 |     const row = await page.locator("tbody tr");
  76 |     for(let i=0;i<await row.count();i++)
  77 |     {
  78 |       const rowOrderID = await row.nth(i).locator("th").textContent();
  79 |       if(orderID.includes(rowOrderID))
  80 |       {
  81 |         await row.nth(i).locator("button").first().click();
  82 |         break;
  83 |       }
  84 |     }
  85 |     const viewpageOrderID = await page.locator(".col-text").textContent();
  86 |     expect(orderID.includes(viewpageOrderID)).toBeTruthy();
  87 | });
  88 | 
  89 | test('Test case 2', async ()=>
  90 | {
  91 |     const page = await webContext.newPage();
  92 |     await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  93 |     await page.locator(".card-body b").first().waitFor();
  94 |     const titles = await page.locator(".card-body b").allTextContents();
  95 |     console.log("Titles are: " +titles);
  96 | });
```