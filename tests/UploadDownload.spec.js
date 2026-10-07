const fs = require('fs');
const os = require('os');
const path = require('path');
const ExcelJs = require('exceljs');
const { test, expect } = require('@playwright/test');

async function writeExcelTest(searchText, replaceText, change, filePath) {
  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile(filePath);

  const worksheet = workbook.getWorksheet('Sheet1') || workbook.worksheets[0];
  if (!worksheet) {
    throw new Error(`No worksheet found in ${filePath}`);
  }

  const output = readExcel(worksheet, searchText);
  if (output.row === -1 || output.column === -1) {
    throw new Error(`Search text "${searchText}" was not found in the Excel file.`);
  }

  const cell = worksheet.getCell(output.row, output.column + change.colChange);
  cell.value = replaceText;
  await workbook.xlsx.writeFile(filePath);
}

function readExcel(worksheet, searchText) {
  let output = { row: -1, column: -1 };
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (String(cell.value).trim() === String(searchText).trim()) {
        output = { row: rowNumber, column: colNumber };
      }
    });
  });
  return output;
}

test('Upload download excel validation', async ({ page }) => {
  const textSearch = 'Mango';
  const updateValue = '350';

  await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('button', { name: /download/i }).click()
  ]);

  const downloadDir = path.join(os.tmpdir(), 'playwright-downloads');
  fs.mkdirSync(downloadDir, { recursive: true });

  const filePath = path.join(downloadDir, download.suggestedFilename());
  await download.saveAs(filePath);

  await writeExcelTest(textSearch, updateValue, { rowChange: 0, colChange: 2 }, filePath);

  await page.locator('#fileinput').setInputFiles(filePath);

  await expect(page.locator('body')).toContainText(textSearch);
  await expect(page.locator('body')).toContainText(updateValue);
});