// Playwright test, expect ve Page tiplerini import ediyoruz
import { test, expect, type Page } from "@playwright/test";
// HomePage sınıfını import ediyoruz (POM yapısı için)
import { HomePage } from "../pages/home-page";
// AAA (Arrange, Act, Assert) ve POM (Page Object Model) notları
// Testte kullanılacak URL'yi tanımlıyoruz
const URL = "https://playwright.dev/";
// HomePage tipinde bir değişken tanımlıyoruz
let homePage: HomePage;

// Her testten önce çalışacak beforeEach bloğu
test.beforeEach(async ({ page }) => {
  // Sayfayı belirtilen URL'ye götürüyoruz
  await page.goto(URL);
  // HomePage nesnesini oluşturuyoruz
  homePage = new HomePage(page);
});

// "Get Started" butonuna tıklayan yardımcı fonksiyon
async function clickGetStarted(page: Page) {
  // HomePage içindeki clickGetStarted fonksiyonunu çağırıyoruz
  await homePage.clickGetStarted();
}

// Testleri bir grup altında topluyoruz
test.describe("Playwright website", () => {
  // Sayfa başlığını kontrol eden test
  test("has title", async ({}) => {
    // HomePage içindeki assertPageTitle fonksiyonunu çağırıyoruz
    await homePage.assertPageTitle();
  });

  // "Get started" linkine tıklayınca URL'nin doğru olduğunu kontrol eden test
  test("get started link", async ({ page }) => {
    // "Get Started" butonuna tıklıyoruz
    await clickGetStarted(page);
    // URL'nin /intro içerdiğini kontrol ediyoruz
    await expect(page).toHaveURL(/intro/);
  });

  // Java sayfası kontrollerini yapan test
  test("check Java Page", async ({ page }) => {
    // "Get Started" butonuna tıklıyoruz
    await clickGetStarted(page);
    // HomePage içindeki useTopMenu fonksiyonunu çağırıyoruz (üst menü işlemleri)
    await homePage.useTopMenu();
  });
});
