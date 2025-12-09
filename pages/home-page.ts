// Playwright dan Locator ve Page tiplerini import ediyoruz
// Page -> Tarayıcı sekmesi, Locator: bir HTML elementi
import { type Locator, type Page, expect } from "@playwright/test";

// HomePage adında bir sınıf oluşturuyoruz
// Bu sınıf, sayfanın element ve metodlarını içerir
export class HomePage {
  //variables
  // pageHome adında bir değişken olşturuyoruz, Testten gelen page objesini burada saklayacagız
  readonly pageHome: Page;
  //await page.getByRole("link", { name: "Get started" }).click();
  // getStartedButton adından bir Locator değişkeni oluşturuyoruz, bu sayfadaki "Set started" linkini tutacak
  readonly getStartedButton: Locator;
  // await expect(page).toHaveTitle(/.*Playwright/);
  readonly title: RegExp;

  // Constructor → Bu class çağrıldığı anda otomatik çalışan bir fonksiyondur.
  // Parametre olarak testten gelen "pageHome" objesini alır.
  constructor(pageHome: Page) {
    // Gelen page objesini class içindeki page değişkenine atıyoruz.
    this.pageHome = pageHome;
    // getStartedButton değişkenine sayfadaki "Get started" linkini atıyoruz.
    // Böylece testte tekrar locator yazmaya gerek kalmıyor.
    this.getStartedButton = pageHome.getByRole("link", { name: "Get started" });
    this.title = /Playwright/;
  }

  //methods
  // clickGetStarted adında bir metod oluşturuyoruz.
  // Bu metod çağrıldığında "Get started" butonuna tıklar.
  async clickGetStarted() {
    // getStartedButton locator’ına tıklama komutu veriyoruz.
    await this.getStartedButton.click();
  }

  async assertPageTitle() {
    await expect(this.pageHome).toHaveTitle(this.title);
  }
}

// Bu class'ı başka dosyalarda import edebilmek için dışa aktarıyoruz.
export default HomePage;
