# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: upload-download.spec.js >> Upload download excel validation
- Location: tests/upload-download.spec.js:32:1

# Error details

```
Error: locator.click: Target page, context or browser has been closed
```

```
Error: page.screenshot: Target page, context or browser has been closed
```

# Test source

```ts
  1  | const ExcelJs = require('exceljs');
  2  | const{test, expect} = require('@playwright/test');
  3  | 
  4  | async function writeexcelTest(searchText,replaceText,change,filePath) 
  5  | {    
  6  | const workbook = new ExcelJs.Workbook();
  7  | await workbook.xlsx.readFile(filePath);
  8  |     console.log('Excel file read successfully!');
  9  |     const worksheet = workbook.getWorksheet('Sheet1');
  10 |     const output = await readExcel(worksheet, searchText);
  11 |         const cell = worksheet.getCell(output.row, output.column+change.colChange);
  12 |         cell.value = replaceText;
  13 |         await workbook.xlsx.writeFile(filePath);
  14 | }
  15 |  
  16 | //reading excel
  17 | async function readExcel(worksheet, searchText) {
  18 |     let output = { row: -1, column:-1 };
  19 |     worksheet.eachRow((row, rowNumber) => {
  20 |         row.eachCell((cell, colNumber) => {
  21 |             if (cell.value === searchText) {
  22 |                 output.row = rowNumber;
  23 |                 output.column = colNumber;
  24 |             }
  25 |         });
  26 |     });
  27 |    return output; 
  28 | }
  29 | 
  30 | //writeexcelTest("Mango",350,{rowChange: 0, colChange: 2},"/Users/shivaniauti/Automation used files/exceltest.xlsx");
  31 | 
  32 | test('Upload download excel validation', async ({page})=>
  33 | {
  34 |     const textSearch = "Mango";
  35 |     const updateValue = '350';
  36 |     await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
  37 |     await page.setViewportSize({ width: 1920, height: 1080 });
  38 |     await page.pause();
  39 |     const downloadPromise = page.waitForEvent('download');
  40 |     await page.getByRole("button", {name: 'Download'}).click();
  41 |     const download = await downloadPromise;  // ✅ Capture the download object
  42 |     
  43 |     // Save the file to the Downloads folder
  44 |     const filePath = "/Users/shivaniauti/Downloads/download.xlsx";
  45 |     await download.saveAs(filePath);  // ✅ Explicitly save the file
  46 |     
  47 |     // Now the file exists and you can work with it
  48 |     await writeexcelTest(textSearch, updateValue, {rowChange: 0, colChange: 2}, filePath);
  49 |     
  50 |     await page.locator("#fileinput").click();
  51 |     await page.locator("#fileinput").setInputFiles("/Users/shivaniauti/Downloads/download.xlsx");
  52 |     const textLocator = page.getByText(textSearch);
  53 |     const desiredrow = await page.getByRole('row').filter({has: textLocator});
  54 |     await expect(desiredrow.locator("#cell-4-undefined")).toContainText(updateValue);
  55 | })
  56 | 
  57 | test.afterEach(async ({ page }, testInfo) => {
> 58 |     const screenshot = await page.screenshot();
     |                                   ^ Error: page.screenshot: Target page, context or browser has been closed
  59 |     await testInfo.attach('screenshot', {
  60 |         body: screenshot,
  61 |         contentType: 'image/png'
  62 |     });
  63 |     //test folder created
  64 | });
```