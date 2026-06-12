const {chromium} = require('@playwright/test');
const { POManager } = require('../../pageobjects/POManager');
const { Before, After, BeforeStep, AfterStep, Status } = require('@cucumber/cucumber')

Before(async function () {
  const browser = await chromium.launch({headless:false});
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.pomanageobj = new POManager(this.page);
});

BeforeStep( function()
{

})

AfterStep( async function ({result}) {
  // This hook will be executed after all steps, and take a screenshot on step failure
  if (result.status === Status.FAILED) {
    await this.page.screenshot({path: 'screenshot.png'});
  }
});

After(function () {
  console.log("this is the last execution code line")
});