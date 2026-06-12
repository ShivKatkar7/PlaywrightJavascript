const { test, expect } = require('@playwright/test');

test('Security test request', async ({ page }) => {
    //login and reach order page // * means dynamic it can take any id
    const username = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await username.fill("shivanikatkar@gmail.com");
    await password.fill("Shivani@7213");
    await page.locator("#login").click();
    await page.waitForLoadState("networkidle");
    await page.locator(".card-body b").first().waitFor();
    await page.locator("[routerlink*='myorders']").first().click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({
            url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=62166eabf86ba51a6585fd33"
        })
    )
    await page.locator("button:has-text('View')").first().click(); //unauthorized 403 forbidden error should be given
    //await page.pause();
    const text = await page.locator("p.blink_me").textContent();
    console.log(text);
    await expect(text).toContain("not authorize");
});