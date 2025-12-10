# Jak propojit formulář s Google Tabulkami

Aby se přihlášky z webu automaticky ukládaly do Google Tabulky a přišel vám e-mail, postupujte podle tohoto návodu. Je to zdarma a bezpečné.

## 1. Vytvoření Google Tabulky
1. Jděte na [Google Sheets](https://sheets.google.com) a vytvořte novou prázdnou tabulku.
2. Pojmenujte ji např. "Mali Pruzkumnici Prihlasky".
3. V prvním řádku (hlavička) pojmenujte sloupce přesně takto (pořadí není kritické, ale názvy ano):
   - `timestamp`
   - `parentName`
   - `childName`
   - `childDob`
   - `email`
   - `phone`
   - `gdpr`
   - `photos`
   - `responsibility`

## 2. Vytvoření Skriptu
1. V téže tabulce klikněte v horním menu na **Rozšíření** > **Apps Script**.
2. Otevře se editor kódu. Vymažte všechen kód, který tam je.
3. Vložte následující kód:

```javascript
/*
 * Google App Script pro zpracování formuláře z webu
 */

// Zadejte e-maily, kam mají chodit upozornění (oddělené čárkou)
const EMAIL_RECIPIENTS = "vas.email@example.com, kamaradky.email@example.com";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Uložení dat do tabulky
    sheet.appendRow([
      new Date(),
      data.parentName,
      data.childName,
      data.childDob,
      data.email,
      data.phone,
      data.gdpr ? "ANO" : "NE",
      data.photos ? "ANO" : "NE",
      data.responsibility ? "ANO" : "NE"
    ]);

    // Odeslání e-mailu
    const subject = "Nová přihláška: Malí průzkumníci - " + data.childName;
    const body = `
      Nová přihláška dorazila!
      --------------------------------
      Rodič: ${data.parentName}
      Dítě: ${data.childName} (${data.childDob})
      Email: ${data.email}
      Tel: ${data.phone}
      
      Zkontrolujte Google Tabulku pro více detailů.
    `;
    
    MailApp.sendEmail(EMAIL_RECIPIENTS, subject, body);
    
    return ContentService.createTextOutput(JSON.stringify({"result":"success"}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({"result":"error", "error": error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. **DŮLEŽITÉ**: V kódu přepište `vas.email@example.com` na vaše skutečné e-maily!

## 3. Publikace (Ten nejdůležitější krok)
1. Vpravo nahoře klikněte na tlačítko **Nasazení** (Deploy) -> **Nové nasazení** (New deployment).
2. Vedle "Vyberte typ" klikněte na ozubené kolečko a zvolte **Webová aplikace** (Web app).
3. Nastavte:
   - **Popis**: Verze 1
   - **Spustit jako**: Já (Me) - *to je důležité!*
   - **Kdo má přístup**: **Kdokoliv** (Anyone) - *TOTO JE KRITICKÉ, jinak formulář z webu nebude fungovat!*
4. Klikněte na **Nasadit** (Deploy).
5. Google vás vyzve k autorizaci přístupu. Odklikjte to (Advanced -> Go to ... (unsafe) -> Allow). Nebojte se "unsafe", je to váš vlastní kód.
6. Po úspěšném nasazení se objeví okno s URL adresou (Web App URL).
7. Zkopírujte tuto adresu (vypadá jako `https://script.google.com/macros/s/.../exec`).

## 4. Propojení s webem
1. Otevřete soubor `script.js` ve složce vašeho webu.
2. Na úplný začátek (řádek 2) vložte zkopírovanou adresu mezi uvozovky:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/VAS_KOD_S_MNOHA_PISMENKY/exec';
   ```
3. Uložte soubor.

Hotovo! Nyní když někdo odešle formulář na webu, data se objeví ve vaší tabulce a přijde vám e-mail.
