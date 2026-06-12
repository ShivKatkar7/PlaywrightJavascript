import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.naukri.com/');
  await page.getByText('Find your dream job now5 lakh').click();
  await page.getByRole('link', { name: 'Login', exact: true }).click();
  await page.getByRole('textbox', { name: 'Enter your active Email ID /' }).click();
  await page.getByRole('textbox', { name: 'Enter your active Email ID /' }).fill('shivanikatkar18@gmail.com');
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('Sk@9921522781');
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await page.locator('.crossIcon').click();
  await page.getByRole('link', { name: 'Jobs 3' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByText('Quality Engineer', { exact: true }).click();
  const page1 = await page1Promise;
  await page1.getByRole('button', { name: 'Apply' }).click();
});