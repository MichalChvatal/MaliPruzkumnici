# Jak nasadit web Malí průzkumníci na internet

Máte dvě hlavní možnosti, jak web dostat online zdarma.

## Možnost 1: Netlify Drop (Nejjednodušší - Bez registrace)
Toto je nejrychlejší cesta, pokud chcete web jen "nahrát" a mít hotovo.

1.  Jděte na stránku **[app.netlify.com/drop](https://app.netlify.com/drop)**.
2.  V počítači otevřete průzkumník souborů a najděte složku `c:\Repo\mali_pruzkumnici`.
3.  **Chyťte celou složku myší** a přetáhněte ji do šedého pole na stránce Netlify ("Drag and drop your site folder here").
4.  Počkejte pár sekund. Netlify vám vygeneruje webovou adresu (např. `mali-pruzkumnici-xyz.netlify.app`).
5.  **Hotovo!** Tato adresa je veřejná a funkční.
    *   *Tip:* Pokud se vám nelíbí náhodný název, můžete se na Netlify zdarma registrovat a název změnit (např. na `malipruzkumnici.netlify.app`).

## Možnost 2: GitHub Pages (Pro dlouhodobý vývoj)
Jelikož vidím, že projekt je už v Gitu, toto je profesionálnější cesta.

1.  Běžte na GitHub a vytvořte **nový repozitář** (nazvěte ho např. `mali-pruzkumnici`).
2.  Postupujte podle instrukcí na GitHubu pro nahrání ("push") vašeho kódu z počítače:
    ```bash
    git remote add origin https://github.com/VASE_JMENO/mali-pruzkumnici.git
    git push -u origin main
    ```
3.  V nastavení repozitáře na GitHubu jděte do **Settings** -> **Pages**.
4.  V sekci "Branch" vyberte **main** a uložte.
5.  Počkejte minutu, GitHub vám pošle odkaz na web (např. `vase_jmeno.github.io/mali-pruzkumnici`).

## 5. Jak aktualizovat web (když uděláte změny)

Až v budoucnu upravíte kód (např. změníte text nebo fotku), musíte změny dostat na internet.

### Pokud používáte Netlify Drop (Možnost 1)
Je to stejné jako poprvé:
1.  Uložte změny v souborech na počítači.
2.  Jděte na Netlify, přihlašte se a klikněte na svůj web.
3.  Přejděte na záložku **Deploys**.
4.  Uvidíte tam opět šedé pole pro nahrání ("Drag and drop your site folder here").
5.  Přetáhněte tam celou složku znovu.
6.  Změny se projeví okamžitě.

### Pokud používáte GitHub (Možnost 2)
Toto je ta "magická" část. Jakmile máte propojeno:
1.  Udělejte změny v kódu na počítači.
2.  Odešlete je na GitHub:
    ```bash
    git add .
    git commit -m "Aktualizace webu: změna textu"
    git push
    ```
3.  **To je vše.** Netlify si všimne, že se na GitHubu něco změnilo, a samo si ty změny stáhne a nasadí. Nemusíte na Netlify ani chodit.

## Co zkontrolovat po nasazení
1.  **Formulář**: Zkuste odeslat testovací přihlášku. Měla by se objevit ve vaší Google Tabulce.
2.  **Odkazy**: Zkontrolujte, zda fungují odkazy v menu a patičce.

## 6. Vlastní doména (např. malipruzkumnici.cz)

Pokud chcete profesionální adresu, postupujte takto:

1.  **Kupte si doménu**: Doporučuji české registrátory jako **Wedos** nebo **Forpsi**. Stojí to cca 200 Kč/rok.
2.  **Nastavení v Netlify**:
    *   Jděte do "Domain settings" svého webu na Netlify.
    *   Klikněte na "Add custom domain" a napište tam `malipruzkumnici.cz` (nebo tu vaši).
3.  **Propojení (DNS)**:
    *   Netlify vám ukáže "DNS records", které musíte nastavit. Obvykle to znamená vytvořit tzv. **A záznam** směřující na IP adresu Netlify (např. `75.2.60.5`).
    *   Přihlašte se tam, kde jste koupili doménu (Wedos/Forpsi), jděte do editace DNS a přidejte tento záznam.
    *   *Pozor:* Změna se projeví až za 1–24 hodin.

## 7. Jak být na Google (SEO)

Aby vás lidé našli vyhledáváním "montessori brno":

1.  **Základ už jsem udělal**: V kódu už jsou připravené "klíčová slova" a instrukce pro roboty (robots.txt, sitemap).
2.  **Google Search Console**:
    *   Jděte na [search.google.com](https://search.google.com/search-console).
    *   Přidejte svou novou doménu.
    *   Google vás požádá o ověření (vložení malého kódu do DNS nebo HTML - HTML je snazší, jen mi ten kód pak pošlete a já ho tam vložím).
    *   V sekci "Sitemaps" vložte odkaz `https://vase-domena.cz/sitemap.xml`.
3.  **To je vše**: Teď už jen čekat, až si Google váš web přečte (může to trvat pár dnů).
