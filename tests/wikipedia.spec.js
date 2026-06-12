const { test, expect, page } = require('@playwright/test');

test("Click the 5th link and assert the page", async ({ page }) => {
    await page.goto("https://www.wikipedia.org/");
    const text = await page.locator("//div[@class='other-project-text']/span[1]").allTextContents();
    for (let i = 0; i < text.length; i++) {
        console.log(text[i]);
        if (text[i] === "Wikidata") {
            await page.locator("//div[@class='other-project-text']/span[1]").nth(i).click();
            //await page.waitFor();
            await expect(page.getByText("Welcome to Wikidata")).toBeVisible();
        }
    }

    //just to add something new

});
