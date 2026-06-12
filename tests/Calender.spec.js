const {test, expect} = require('@playwright/test');

test('Calendar handling', async ({page})=>
{
const date = '15';
const month ='6';
const year = '2027';
const [expectedList] = [month, date, year];

//calendar test
await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
await page.locator(".react-date-picker__inputGroup").click();
await page.locator(".react-calendar__navigation__label").click();
await page.locator(".react-calendar__navigation__label").click();
await page.getByText(year).click();
await page.locator(".react-calendar__year-view__months__month").nth(Number(month)-1).click();
await page.locator("//abbr[text()='"+date+"']").click();
//await page.pause();
const input =  page.locator(".react-date-picker__inputGroup__input");
for(let i=0;i<expectedList.length;i++)
{
    const value = await input.nth(i).inputValue();
    expect(value).toBe(expectedList[i]);
    break;
}
});