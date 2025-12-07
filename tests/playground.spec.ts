import {test, expect} from "@playwright/test";

// https://ecommerce-playground.lambdatest.io/
test.describe("Testing an ecommerce playground",()=>{
    
    test("Click on the search button", async({page})=>{
     // <button type="submit" class="type-text">Search</button>
    await page.goto("https://ecommerce-playground.lambdatest.io/");
    await page.getByRole("button",{name: 'Search'}).click();
    });

    test("login form", async({page})=>{
        await page.goto("https://ecommerce-playground.lambdatest.io/index.php?route=account/login");

        // <label for="input-email">E-Mail Address</label>
        await expect(page.getByLabel("E-Mail Address",{exact:true})).toHaveCount(1);

        //<label for="input-password">Password</label>
        await expect(page.getByLabel("Password",{exact:true})).toHaveCount(1);

        //fill the email and password
        await page.getByLabel("E-Mail Address").fill("x@gmail.com");
        await page.getByLabel("Password").fill("secret");

        // <input type="submit" value="Login" class="btn btn-primary">
        await page.getByRole('button',{name:'Login'}).click();
        //2. option: await page.click('input[type="submit"][value="Login"]')

        });

        test("Search product", async({page})=>{
        //text alanı bulamadık Placeholder kullanabiliriz.
        /*<input type="text" name="search" value="" data-autocomplete="5" 
        data-autocomplete_route="extension/maza/product/product/autocomplete" 
        placeholder="Search For Products" aria-label="Search For Products" autocomplete="off">
        */
        await page.goto("https://ecommerce-playground.lambdatest.io/");
       await page.getByPlaceholder("Search For Products").first().fill("iPhone"); // first(): Eğer birden fazla placeholder="Search For Products" varsa, ilkini seçer.
        })
})