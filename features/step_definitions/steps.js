const { Given, When, Then } = require('@cucumber/cucumber')
const { POManager } = require('../../pageobjects/POManager');
const { expect } = require('@playwright/test');
const { chromium } = require('@playwright/test');

Given('login to ecommerce application with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {
    this.pomanageobj = new POManager(this.page);
    const loginpageobj = this.pomanageobj.getLoginPage();
    await loginpageobj.landingonLoginPage();
    await loginpageobj.validLogin(username, password);
});


When('Add {string} to the cart', async function (productName) {
    const dashboardpageobj = this.pomanageobj.getdashboardpage();
    await dashboardpageobj.searchProductAddCart(productName);
    await dashboardpageobj.navigateToCart();
});

Then('verify {string} is displayed in the cart and with valid details place order', async function (productName) {
    const checkoutPageobj = this.pomanageobj.getcheckoutpage();
    await checkoutPageobj.checkboutpagedetails(productName);

});

Then('verify order is present in the OrderHistory', async function () {
    const orderdetailpageobj = this.pomanageobj.getOrderDetailPage();
    const vieworderpageobj = this.pomanageobj.getViewOrderPage();
    const orderID = await orderdetailpageobj.orderdetailsvalidation();
    await vieworderpageobj.verifyorderID(orderID);
});

Given('login to ecommerce2 application with {string} and {string}',{timeout:100*1000}, async function (username, password) {
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());
    await this.page.locator("#username").fill(username);
    await this.page.locator("#password").fill(password);
    await this.page.locator("#signInBtn").click();
});

Then('verify error message is displayed', async function () {
    console.log(await this.page.locator("[style*='block']").textContent());
    await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');
});