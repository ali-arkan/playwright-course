/*
test1: has title
1. Open the page https://playwright.dev/ -- Home
  Verify have title (Playwright) -- Home

test2: get started link
2. Click get the started -- Home
    Verify url has (intro) -- Intro

test3: Vierfy Java Page
3. Mouse hover the language dropdown -- Intro
4. Click at Java -- Intro
5. Check the URL (has "intro") -- Java
6. Check the text "Installing Playwright" is not displayed -- Java
7. Check text below is dislayed -- Java
Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml as described below. If you're not familiar with Maven please refer to its documentation.
*/

 import { test, expect } from '@playwright/test';
//test : include test,page etc
//expect: include expect

 test('has title', async({page})=>{
//page: tarayıcı sekmesi aç
  await page.goto('https://playwright.dev/'); // goto page
  await expect(page).toHaveTitle(/.*Playwright/); //regex
 });

 test('get started link', async({page})=>{
  await page.goto('https://playwright.dev/');
  //get the started yakala ve tıkla
  await page.getByRole('button',{name: 'Get started'}).click(); //buradan devam et
  

 });

