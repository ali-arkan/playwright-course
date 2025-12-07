resource: https://chatgpt.com/share/682ec4c1-cc18-800a-a04c-6f51d4e09eef

# Playwright Locator Cheatsheet (Karşılaştırmalı - Selenium dahil)

## 1. Basic Selectors by Tag, Attribute, Text

**Ne zaman kullanılır?**  
Basit ve sabit HTML yapılarında, erişimi kolay ID, name, class varsa tercih edilir.

**HTML:**  
```html
<input id="username" name="user" class="input" placeholder="Enter username" />
```

- **By Tag**  
  ```js
  page.locator('input');
  ```  
  Selenium: `driver.findElement(By.tagName("input"));`

- **By ID**  
  ```js
  page.locator('#username');
  ```  
  Selenium: `driver.findElement(By.id("username"));`

- **By Name**  
  ```js
  page.locator('[name="user"]');
  ```  
  Selenium: `driver.findElement(By.name("user"));`

- **By Class**  
  ```js
  page.locator('.input');
  ```  
  Selenium: `driver.findElement(By.className("input"));`

- **By Placeholder**  
  ```js
  page.getByPlaceholder('Enter username');
  ```  
  Selenium: `driver.findElement(By.cssSelector("input[placeholder='Enter username']"));`

- **By Text (exact match)**  
  ```js
  page.getByText('Submit');
  page.locator('text=Submit');
  ```  
  Selenium: `driver.findElement(By.xpath("//*[text()='Submit']"));`

- **By Partial Text (regex)**  
  ```js
  page.getByText(/Sub/);
  ```  
  Selenium: `driver.findElement(By.xpath("//*[contains(text(), 'Sub')]"));`

**🧪 Örnek Senaryo:**  
Bir login formunda kullanıcı adı alanına veri girmek için ID ile seçim yapılabilir:  
```js
await page.locator('#username').fill('Ali');
```

---

## 2. Role-based Selectors (Playwright only)

**Ne zaman kullanılır?**  
Erişilebilirlik kurallarına uygun yazılmış HTML'de çok güvenilir. Test kodlarını anlaması kolaylaştırır.

- **By Role and Name**  
  ```js
  page.getByRole('button', { name: 'Login' });
  ```  
  HTML: `<button>Login</button>`

- **By Label Text**  
  ```js
  page.getByLabel('Email');
  ```  
  HTML: `<label for="email">Email</label><input id="email">`

- **By Title Attribute**  
  ```js
  page.getByTitle('Tooltip Text');
  ```  
  HTML: `<div title="Tooltip Text"></div>`

- **By Alt Text (for images)**  
  ```js
  page.getByAltText('Company Logo');
  ```  
  HTML: `<img alt="Company Logo" src="logo.png">`

- **By Test ID**  
  ```js
  page.getByTestId('submit-btn');
  ```  
  HTML: `<button data-testid="submit-btn">Submit</button>`  
  Selenium: `driver.findElement(By.cssSelector("[data-testid='submit-btn']"));`

**🧪 Örnek Senaryo:**  
Kullanıcı eğer erişilebilirlik odaklı bir uygulama geliştiriyorsa, giriş butonuna ulaşmak için:  
```js
await page.getByRole('button', { name: 'Login' }).click();
```

---

## 3. XPath Selectors (Advanced)

**Ne zaman kullanılır?**  
Karmaşık, nested yapılar veya elementin text veya konumuna göre seçim gerekiyorsa.

```js
page.locator('//div[@class="card"]//button');
```  
Selenium: `driver.findElement(By.xpath("//div[@class='card']//button"));`

```js
page.locator('(//input[@type="text"])[2]');
```  
Selenium: `driver.findElement(By.xpath("(//input[@type='text'])[2]"));`

**🧪 Örnek Senaryo:**  
Aynı sayfada birden fazla text input varsa ve 2. alanı hedefliyorsak:  
```js
await page.locator('(//input[@type="text"])[2]').fill('Second');
```

---

## 4. Chained Locators and Scoping

**Ne zaman kullanılır?**  
Belirli bir alan (section) içerisindeki elemanı seçmek için. Testleri daha sağlam ve maintainable yapar.

```js
const section = page.locator('.form-group');
const input = section.locator('input');
```

```js
page.locator('ul > li').filter({ hasText: 'İletişim' });
page.locator('div').locator('button');
```

**🧪 Örnek Senaryo:**  
Bir form içinde sadece belirli bir grup altındaki butonu tıklamak için:  
```js
await page.locator('.checkout-form').locator('button[type="submit"]').click();
```

---

## 5. Filtering with has / hasText / nth / first / last

**Ne zaman kullanılır?**  
Tekrar eden elemanlar arasında filtreleme veya sıralama yapmak gerektiğinde.

```js
page.locator('a', { hasText: 'Contact' });
page.locator('div', { has: page.locator('img') });
page.locator('li').first();
page.locator('li').last();
page.locator('li').nth(2); // 0-indexed
```

**🧪 Örnek Senaryo:**  
Birden fazla "Sil" butonundan ilkini tıklamak için:  
```js
await page.locator('button', { hasText: 'Sil' }).first().click();
```

---

## 6. Regex Text Matching

**Ne zaman kullanılır?**  
Yazının büyük/küçük harf farkı önemsizse veya metin içinde eşleşme gerekiyorsa.

```js
page.getByText(/Giriş/i); // Case-insensitive match
page.locator('text=/Giriş/i');
```

**🧪 Örnek Senaryo:**  
"GİRİŞ YAP" veya "giriş yap" şeklinde farklı yazılmış butonları seçmek için:  
```js
await page.getByText(/giriş yap/i).click();
```

---

## 7. Debugging and Test Generation

**Ne zaman kullanılır?**  
Test geliştirirken locators'ı hızlı denemek veya interaktif inceleme yapmak için.

```js
await page.pause(); // Playwright Inspector açar
```

```bash
# Kod üretmek için komut satırı
npx playwright codegen https://example.com
```

---

## 8. Comparison Summary Table

| Yöntem           | Playwright Örneği                         | Selenium Karşılığı                           |
|------------------|------------------------------------------|---------------------------------------------|
| Tag              | `page.locator('input')`                   | `By.tagName("input")`                        |
| ID               | `page.locator('#username')`               | `By.id("username")`                          |
| Name             | `page.locator('[name="user"]')`           | `By.name("user")`                            |
| Class            | `page.locator('.input')`                   | `By.className("input")`                      |
| Placeholder      | `page.getByPlaceholder('...')`             | `By.cssSelector("[placeholder='...']")`    |
| Text             | `page.getByText('...')`                    | `By.xpath("//*[text()='...']")`              |
| Role + Name      | `page.getByRole('button', { name: '...' })`| (Yok)                                       |
| Label            | `page.getByLabel('Email')`                 | `By.id("...")` (label for=id eşleşmeli)    |
| Alt Text         | `page.getByAltText('Logo')`                | `By.cssSelector("img[alt='Logo']")`         |
| Test ID          | `page.getByTestId('submit')`               | `By.cssSelector("[data-testid='submit']")`  |
| XPath            | `page.locator('//div[@class=...]')`       | `By.xpath("//div[@class=...]")`             |
| Nested/Chaining  | `locator().locator()`                      | `By.xpath("//...//...")`                     |
| Filter by text   | `locator({ hasText: '...'})`               | `By.xpath("//*[contains(text(),'...')]")`   |

