# Hlas a zachovanie

Čo Vatožrút CHRÁNI. Deslop nesmie zničiť obsah ani osobnosť textu. Toto je rovnako dôležité ako rezanie slopu.

## Vždy chráň (nikdy nezmeň ani nezmaž)

- **Named entities:** mená ľudí, firiem, produktov, miest, značiek.
- **Čísla, dátumy, verzie, ceny, miery:** `3,5 kW`, `od 1 290 eur`, `do 24 hodín`, `15 rokov`. Zlé číslo = blokujúce zlyhanie.
- **URL, e-maily, telefóny, adresy, príkazy, kód.**
- **Citácie a zdroje.**
- **Explicitná neistota:** "možno", "zatiaľ", "približne", "odhadom", "vo väčšine prípadov". Neistota je informácia, nie slabosť. Nemeň ju na istotu.
- **Modálne slovesá nesúce význam:** "musí", "môže", "mal by" menia záväzok. Nezahadzuj ich.
- **Scope a obmedzenia:** "len pre firmy do 50 zamestnancov", "okrem víkendov". Qualifikátory sú fakty.
- **First-person stance a názor autora:** "podľa mňa", "neodporúčam", "mám s tým zlú skúsenosť". Toto je hlas. Sterilizovať názor na neutrálny tón je tiež slop.
- **Suchý humor, idiómy, osobný register** ak sedia do textu.

## Blokujúce zlyhania (radšej nechaj slop než toto)

1. Zmenené alebo vymyslené číslo/dátum/cena.
2. Zmenená alebo vymyslená entita (meno, produkt).
3. Odstránený qualifier čo menil význam ("vždy" namiesto "väčšinou").
4. Falošná kauzalita: spojil si dve veci do "lebo/preto" ktoré v origináli neboli.
5. Vymyslený dôkaz, feature, referencia, metrika.
6. Posun istoty: z "možno pomôže" na "pomôže".

Ak by oprava slopu vyžadovala niektoré z tohto, **nechaj vetu a označ ju** namietkou, nech rozhodne autor.

## Evidence labely (pri vágnom copy)

Keď text tvrdí niečo nepodložené, neoprav to na peknú vetu. Označ:
- `[ZDROJ?]` - tvrdenie potrebuje dôkaz (číslo, referenciu).
- `[DOPLNIŤ]` - chýba konkrétny údaj (cena, termín, meno).
- `[OVERIŤ]` - claim môže byť nepravdivý.

Príklad: "Sme jednotka na trhu" → "Sme jednotka na trhu [ZDROJ? podľa čoho - obrat, počet klientov, ocenenie?]".

## Over-editing je zlyhanie

Ak je veta konkrétna, nesie fakt alebo názor, a nemá slop tell - **nechaj ju**. Prepisovanie dobrého textu na "ešte lepší" zavádza riziko straty významu a vlastný slop. "Nechaj tak" je validný a často správny výstup celého passu.

Test pred zmenou vety: *Stratí čitateľ informáciu alebo hlas, ak ju zmením? Ak áno a nezískam tým nič konkrétne, nechaj.*
