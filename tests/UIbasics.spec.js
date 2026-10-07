const { test, expect} = require('@playwright/test');

test('Add to cart', async ({ page }) => {
  const email = 'monistate@gmail.com';
  const productName = 'ZARA COAT 3';
  const product = page.locator(".card-body");
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  await page.locator('#userEmail').fill(email);
  await page.locator('#userPassword').fill('Htz5EV!A9WpZcF4');
  await page.locator('#login').click();
  await page.locator('.card-body b').nth(2).waitFor();
  const title = await page.locator('.card-body b').allTextContents();
  console.log('Product Name', title);
//Zara coat 4 needs to be selected and added in cart
  const count = await product.count();
  for (let i=0; i < count; i++)
  {
    if (await product.nth(i).locator("b").textContent() === productName) 
    { 
      await product.nth(i).locator("text = Add To Cart").click();
      break;
    }
  }
  await page.locator("[routerlink*='cart']").click();
  await page.locator("div li").first().waitFor();
  const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible()
  expect(bool).toBeTruthy();
  await page.locator("button[type='button']").last().click();
  await page.locator("input[type='text']").nth(0).fill('4542 9931 9292 2292');
  await page.locator("input[type='text']").nth(1).fill('666');
  await page.locator("input[type='text']").nth(2).fill('Chetan');
  await page.locator("input[type='text']").nth(3).fill('Discount');
  await page.locator("input[type='text']").nth(4).fill(email);
  await page.locator("[placeholder='Select Country']").pressSequentially('IND');
  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  const optioncount = await dropdown.locator("button").count();
  for (let i = 0; i < optioncount; i++)
  {
    const text = await dropdown.locator("button").nth(i).textContent();
    if (text === " India")
    {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }
  expect(page.locator(".mt-5 [style*='gray']")).toHaveText(email);
  //await page.locator("[class$='btnn action__submit ng-star-inserted']").click();
  await page.locator('a:has-text("PLACE ORDER")').click();
  const orderMsg = 'Thankyou for the order.'
  await expect(page.locator(".hero-primary")).toHaveText(orderMsg);
  console.log("Order Msg : ", orderMsg);
  const orderId = await page.locator("label.ng-star-inserted").textContent();
  console.log('Order Id is :', orderId);
  
  //validating order
  
  await page.locator(".em-spacer-1 [routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");

  for (let i=0; i<await rows.count(); i++)

  {
    const rowOrderid = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderid))
    {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
  
  await expect(orderId.includes(page.locator(".col-text")));
  console.log("Order Id matching, You have completed this Practice test");

});