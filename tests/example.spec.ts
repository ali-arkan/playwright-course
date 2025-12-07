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
  await expect(page).toHaveTitle(/.*Playwright/); //find title : include "Playwright"
 });

 test('get started link', async({page})=>{
  await page.goto('https://playwright.dev/');
  //get the started yakala ve tıkla
    // <a class="getStarted_Sjon" href="/docs/intro">Get started</a>
  await page.getByRole('link',{name: 'Get started'}).click(); // click button name "Get Started" by Role
  await expect(page).toHaveURL(/intro/)
 });

 test('check Java Page',async({page})=>{
   await page.goto('https://playwright.dev/');
  await page.getByRole('link',{name: 'Get started'}).click(); 
 


    // Hover language dropdown
     // <a href="#" aria-haspopup="true" aria-expanded="false" role="button" class="navbar__link">Node.js</a>
  await page.getByRole('button',{name: 'Node.js'}).hover();



  //** Click Java */ 
  //<a href="/java/docs/intro" target="_self" rel="noopener noreferrer" class="dropdown__link" data-language-prefix="/java/">Java</a>
  await page.getByText('Java', {exact: true}).click();

    // Check URL contains "intro"
  await expect(page).toHaveURL('https://playwright.dev/java/docs/intro');

   // "Installing Playwright" should NOT be visible
  //<h1>Installation</h1>
  await expect(page.getByText('Installing Playwright', {exact: true})).not.toBeVisible();

  // Check Java-specific text is displayed 
  const javaDesc = "Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml as described below. If you're not familiar with Maven please refer to its documentation.";
  await expect(page.getByText(javaDesc)).toBeVisible();


 });



 /*** AI Generated
  * import { test, expect } from '@playwright/test';

// test1: has title
test('Home page has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});

// test2: get started link
test('Click Get Started and verify URL', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: /Get started/i }).click();
  await expect(page).toHaveURL(/intro/);
});

// test3: Verify Java Page
test('Java page checks', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Hover language dropdown
  await page.getByRole('button', { name: /Language/i }).hover();

  // Click Java
  await page.getByRole('menuitem', { name: /Java/i }).click();

  // Check URL contains "intro"
  await expect(page).toHaveURL(/intro/);

  // "Installing Playwright" should NOT be visible
  await expect(page.locator('text=Installing Playwright')).not.toBeVisible();

  // Check Java-specific text is displayed
  await expect(page.locator('text=Playwright is distributed as a set of Maven modules.')).toBeVisible();
});
  */