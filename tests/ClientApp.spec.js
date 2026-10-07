const { test, expect } = require('@playwright/test');

test('user can log in', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  await page.locator('#username').fill('rahulshettyacademy');
  await page.locator('#password').fill('Learning@830$3mK2');
  await page.locator('.radiotextsty').last().click();
  await page.locator('#okayBtn').click();
  const dropdown = page.locator('select.form-control');
  await dropdown.selectOption("Consultant")
  await page.locator('#terms').click();
  const checkflag = await expect(page.locator('#terms')).toBeChecked();
  console.log()
});

test('Document link', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  const documentLink = page.locator("[href*='documents-request']");

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    documentLink.click(),
  ]);
  await newPage.waitForLoadState();
  const text = await newPage.locator(".im-para.red").textContent();
  console.log(text);
  const arrayText = text.split("@");
  const domain = arrayText[1].split(" ")[0];
  console.log(domain);
  await page.locator('#username').fill(domain);
});