import { test, expect } from '@playwright/test';

test('Playwright locator örnekleri', async ({ page }) => {
  // Örnek sayfa yükleme
  await page.goto('https://the-internet.herokuapp.com/login');

  // fill the username
  /*
  <div class="large-6 small-12 columns">
        <label for="username">Username</label> -- getbyLabel, getByRole
        <input type="text" name="username" id="username"> -- page.locator
      </div>
  */
   await page.locator('#username').fill("tomsmith"); //1.en iyi cozum
   // await page.getByLabel('Username').fill("tomsmith"); //2.en iyi cozum
   //await page.getByRole('textbox',{name:'Username'}).fill("tomsmith"); //3.en iyi cozum
 
  // fill the password
  /*
    <div class="large-6 small-12 columns">
        <label for="password">Password</label>
        <input type="password" name="password" id="password">
      </div>
  */
  await page.locator('#password').fill("SuperSecretPassword!");//1.en iyi cozum

  //click the button
  /*
  <button class="radius" type="submit"><i class="fa fa-2x fa-sign-in"> Login</i></button>
  */
    //await page.locator('button.radius').click(); //locator by class, 1.en iyi cozum
  await page.getByRole ('button',{name:'Login'}).click(); //2.en iyi cozum
  // await page.getByText('Login').click(); //sayfada birden fazla login text var, tavsiye edilmez
   
  
  
});
