const ExcelJs = require('exceljs');
const{test, expect} = require('@playwright/test');

async function writeexcelTest(searchText,replaceText,change,filePath) 
{    
const workbook = new ExcelJs.Workbook();
await workbook.xlsx.readFile(filePath);
    console.log('Excel file read successfully!');
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet, searchText);
        const cell = worksheet.getCell(output.row, output.column+change.colChange);
        cell.value = replaceText;
        await workbook.xlsx.writeFile(filePath);
}
 
//reading excel
async function readExcel(worksheet, searchText) {
    let output = { row: -1, column:-1 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output.row = rowNumber;
                output.column = colNumber;
            }
        });
    });
   return output; 
}

//writeexcelTest("Mango",350,{rowChange: 0, colChange: 2},"/Users/shivaniauti/Automation used files/exceltest.xlsx");

test('Upload download excel validation', async ({page})=>
{
    const textSearch = "Mango";
    const updateValue = '350';
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    await page.viewportSize({ width: 1920, height: 1080 });
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole("button", {name: 'Download'}).click();
    const download = await downloadPromise;  // ✅ Capture the download object
    
    // Save the file to the Downloads folder
    const filePath = "/Users/shivaniauti/Downloads/download.xlsx";
    await download.saveAs(filePath);  // ✅ Explicitly save the file
    
    // Now the file exists and you can work with it
    await writeexcelTest(textSearch, updateValue, {rowChange: 0, colChange: 2}, filePath);
    
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("/Users/shivaniauti/Downloads/download.xlsx");
    const textLocator = page.getByText(textSearch);
    const desiredrow = await page.getByRole('row').filter({has: textLocator});
    await expect(desiredrow.locator("#cell-4-undefined")).toContainText(updateValue);
})

test.afterEach(async ({ page }, testInfo) => {
    const screenshot = await page.screenshot();
    await testInfo.attach('screenshot', {
        body: screenshot,
        contentType: 'image/png'
    });
    //test folder created
});