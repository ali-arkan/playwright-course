# username
Bu HTML parçası şu elementi içeriyor:

<input type="text" name="username" id="username">

Playwright ile bu input alanını birçok farklı yöntemle yakalayabiliriz. Aşağıda bunları kategorilere ayırarak detaylıca gösterdim ⬇️

📦 HTML:

<div class="large-6 small-12 columns">  
  <label for="username">Username</label>  
  <input type="text" name="username" id="username">  
</div>

🧪 Hedef: <input type="text" name="username" id="username">

────────────────────────────────────────────

✅ 1. Doğrudan Attribute Seçimi (page.locator)

1.1 By id:
await page.locator('#username');

1.2 By name:
await page.locator('\[name="username"]');

1.3 By tag + attribute kombinasyonu:
await page.locator('input#username');
await page.locator('input\[name="username"]');
await page.locator('input\[type="text"]');

1.4 By CSS class of parent (scope):
await page.locator('.large-6 input');

────────────────────────────────────────────

✅ 2. Playwright GetBy Methods (Semantic)

2.1 getByLabel
await page.getByLabel('Username');
// ⬆️ <label for="username"> ile eşleşir

2.2 getByRole (textbox)
await page.getByRole('textbox', { name: 'Username' });
// Label'dan name alır

────────────────────────────────────────────

✅ 3. XPath (Karmaşık veya konuma göre)

3.1 Doğrudan:
await page.locator('//input\[@id="username"]');

3.2 Parent üzerinden:
await page.locator('//label\[text()="Username"]/following-sibling::input');

────────────────────────────────────────────

✅ 4. Filter / chaining ile

4.1 Section bazlı scope:
const section = page.locator('.large-6');
await section.locator('input');

4.2 Filter by name:
await page.locator('input').filter({ has: page.locator('label\:text("Username")') }); // çok nadir

────────────────────────────────────────────

💡 Bu input alanını en az 8–10 farklı yöntemle yakalayabiliriz:

| Yöntem          | Kod                                                                  |
| --------------- | -------------------------------------------------------------------- |
| ID              | page.locator('#username')                                            |
| Name            | page.locator('\[name="username"]')                                   |
| Tag + attr      | page.locator('input\[name="username"]')                              |
| getByLabel      | page.getByLabel('Username')                                          |
| getByRole       | page.getByRole('textbox', { name: 'Username' })                      |
| XPath           | page.locator('//input\[@id="username"]')                             |
| XPath via label | page.locator('//label\[text()="Username"]/following-sibling::input') |
| Scoped locator  | page.locator('.large-6').locator('input')                            |

İstersen bunları .md dosyana Playwright Locator Methods: Real-World Sample başlığıyla ekleyebilirim.
--------------
En mantıklı yöntem; erişilebilirlik, bakım kolaylığı ve testlerin sağlamlığı açısından değerlendirildiğinde getByLabel() ve getByRole() gibi erişilebilirlik (accessibility) temelli yöntemlerdir. Aşağıda her yöntemi süre (performans), erişilebilirlik uygunluğu ve okunabilirlik/bakım kolaylığı yönünden kıyaslıyorum:

🎯 Kıyas Tablosu (input\[id="username"] için):

| Yöntem                                             | Erişilebilirlik Uyumu | Performans | Okunabilirlik/Bakım | Açıklama                                                     |
| -------------------------------------------------- | --------------------- | ---------- | ------------------- | ------------------------------------------------------------ |
| ✅ getByLabel('Username')                           | Yüksek ✅              | Hızlı ✅    | Çok iyi ✅           | En önerilen yöntem. Label ile eşleştiği için WCAG uyumludur. |
| ✅ getByRole('textbox', { name: 'Username' })       | Yüksek ✅              | Hızlı ✅    | İyi ✅               | Rol + erişilebilir ad sayesinde sağlamdır.                   |
| ✅ locator('#username')                             | Orta ⚠️               | En hızlı ✅ | Çok iyi ✅           | Performanslıdır ancak erişilebilirliğe duyarsızdır.          |
| ✅ locator('\[name="username"]')                    | Düşük ❌               | Hızlı ✅    | İyi ✅               | name değeri özel bir anlam taşımıyorsa önerilmez.            |
| ✅ locator('input').filter({ hasText: 'Username' }) | Orta ⚠️               | Orta       | Orta                | Label dışındaki metinlere bağlıysa kırılabilir.              |
| ⚠️ locator('.large-6 input')                       | Düşük ❌               | Orta       | Zayıf ❌             | Genel ve kırılgan. Sayfa yapısı değişirse test bozulur.      |
| ⚠️ nth() ile seçim                                 | Düşük ❌               | Orta       | Çok zayıf ❌         | Sıralama değişirse test kırılır.                             |
| ⚠️ XPath: //input\[@id="username"]                 | Orta ⚠️               | Orta       | Orta                | XPath güçlüdür ama okunabilirliği düşüktür.                  |

🚀 Sonuç:

En mantıklı ve önerilen yöntemler:

1. ✅ await page.getByLabel('Username');

   * WCAG erişilebilirlik kurallarına uygun.
   * UI değişse bile (örneğin input sınıfı değişse bile) test kırılmaz.
   * Bakımı kolaydır, okunabilirliği yüksektir.

2. ✅ await page.getByRole('textbox', { name: 'Username' });

   * Benzer şekilde erişilebilirliğe dayanır.
   * Etiket metnine göre çalışır.

3. ✅ await page.locator('#username');

   * Performans açısından en hızlısı.
   * Ancak sadece ID varsa ve asla değişmeyecekse mantıklıdır.

⚠️ Uyarı: CSS sınıfı (.class), .nth(), XPath gibi yöntemler ancak diğerleri başarısızsa veya çok özel durumlar varsa tercih edilmelidir.

Dilersen aynı kıyaslamayı bir tablo olarak Markdown formatında da sunabilirim ya da PDF olarak çıktı verebilirim.

# button
Bu HTML elementi:

<button class="radius" type="submit"><i class="fa fa-2x fa-sign-in"> Login</i></button>

Playwright ile birkaç farklı şekilde yakalanabilir ve tıklanabilir. Aşağıda tüm uygun yöntemleri, artılarını ve örnek kullanımlarını listeliyorum:

📌 Örnek Element <button class="radius" type="submit"><i class="fa fa-2x fa-sign-in"> Login</i></button>

🟢 1. getByRole (Tavsiye edilen)
Button olarak rolü doğru tanımlanmışsa ve içinde görünen metin varsa bu en doğru ve erişilebilir yöntemdir:

await page.getByRole('button', { name: 'Login' }).click();

✅ Avantajı: Erişilebilirlik uyumlu, bakım kolaylığı
❗ Uyarı: Eğer butonun içinde yalnızca ikon varsa (text yoksa), name olmayabilir ve işe yaramaz

🟢 2. getByText
Butonun içinde yazan metni (Login) hedef alır:

await page.getByText('Login').click();

✅ Avantajı: Görsel metinle eşleşir
❗ Uyarı: Eğer aynı yazıya sahip birden fazla element varsa “strict mode” hatası alabilirsin

🟢 3. page.locator('button.radius')
Class üzerinden doğrudan yakalanır:

await page.locator('button.radius').click();

✅ Avantajı: Stabil class varsa hızlıdır
❗ Uyarı: Class isimleri değişirse kırılır

🟢 4. CSS Seçici ile ikon içinden tıklamak
İkonun kendisini hedef alabilirsin:

await page.locator('i.fa-sign-in').click();

❗ Uyarı: i elementi tıklanabilir olmayabilir — genelde parent olan <button> tıklamak daha güvenli olur

🟢 5. XPath
Örneğin ikon içinde geçen text ile:

await page.locator("//button\[contains(., 'Login')]").click();

✅ Avantajı: Karmaşık yapılar için uygundur
❗ Uyarı: XPath karmaşıklığı artarsa bakım zorlaşır

🟢 6. Label / Placeholder — Kullanılamaz
Bu örnekte label ya da placeholder attribute yoktur. Bu yöntemler geçerli değildir.

📌 Özet Tablo:

| Yöntem                   | Kullanım Örneği                            | Tavsiye Edilir mi? |
| ------------------------ | ------------------------------------------ | ------------------ |
| getByRole                | getByRole('button', { name: 'Login' })     | ✅ Evet             |
| getByText                | getByText('Login')                         | ✅ Evet             |
| locator by class         | locator('button.radius')                   | ✅ Evet             |
| locator by icon class    | locator('i.fa-sign-in')                    | ⚠️ Şüpheli         |
| XPath                    | locator("//button\[contains(., 'Login')]") | ✅ Evet             |
| getByLabel / Placeholder | —                                          | ❌ Hayır            |

İstersen bu örneği cheatsheet’ine de ekleyebilirim.
