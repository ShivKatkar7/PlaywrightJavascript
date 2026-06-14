const {test, expect, request} = require('@playwright/test');

test('Flipkart placeorder automation', async ({browser})=>
{
    const browsercontext = await browser.newContext();
    const page = await browsercontext.newPage();
    await page.setViewportSize({ width: 1512, height: 861 });
    await page.goto("https://www.flipkart.com/search?q=apple+iphone+16+ultramarine+128+gb&sid=tyy%2C4io&as=on&as-show=on&otracker=AS_QueryStore_OrganicAutoSuggest_2_15_na_na_ps&otracker1=AS_QueryStore_OrganicAutoSuggest_2_15_na_na_ps&as-pos=2&as-type=RECENT&suggestionId=apple+iphone+16+ultramarine+128+gb%7CMobiles&requestId=787a8f21-f774-4517-b0fe-5fa04625b79e&as-searchtext=apple%20iphone%20ul");
    const [newpage] = await Promise.all([
        browsercontext.waitForEvent('page'),
        page.locator("//*[contains(@data-id, 'MOBH4DQFYZT6EH2F')]").click()
    ])
     await newpage.setViewportSize({ width: 1512, height: 861 });
    //await newpage.waitForLoadState();
    await newpage.locator("(//*[@class='_1psv1zeb9 _1psv1ze0 _7dzyg20 _1psv1ze9l _1psv1ze7o _1psv1ze2u _1psv1ze53']/div[@class='css-g5y9jx'])[1]").click();
    await newpage.locator("//a[@title='Cart']").click();
    await newpage.getByText("Place Order ").click();
    await newpage.pause();
})