# Správnosť a kodifikácia

Tvrdá norma slovenčiny. Toto sú pravidlá, nie štýlové preferencie. Zdroj: Pravidlá slovenského pravopisu (PSP) a Krátky slovník slovenského jazyka (KSSJ), JÚĽŠ SAV.

## Typografia

### Úvodzovky
- Slovenské: otváracia dole `„`, zatváracia hore `"`. Príklad: `„text"`.
- Anglické rovné aj anglické párové (hore/hore) sú chyba v slovenskom texte.
- Vnorené úvodzovky: jednoduché `‚ '`.

### Pomlčka vs spojovník vs em-dash
- **Spojovník** (`-`, U+002D) spája slová bez medzier: `bielo-modrý`, `IT-firma`, `e-mail`.
- **Pomlčka** v slovenčine sa píše s medzerami z oboch strán a používa sa na vsuvku alebo predel: `text - vsuvka - text`. Znak je krátky `-` s medzerami, NIE dlhý em-dash.
- **Em-dash (U+2014) a en-dash (U+2013) do slovenského textu nepatria.** Sú to anglické/typografické znaky a zároveň silný AI tell. Nahraď čiarkou, dvojbodkou, zátvorkou alebo pomlčkou s medzerami.

### Čísla, dátumy, jednotky
- Desatinná **čiarka**, nie bodka: `3,5 kW` (nie `3.5 kW`).
- Tisíce oddeľuj medzerou (pevnou): `12 000`, nie `12,000`.
- Medzera medzi číslom a jednotkou: `50 m`, `24 h`, `100 %` (medzera aj pred %).
- Dátum: `19. 6. 2026` alebo `19. júna 2026`. Nie `06/19/2026`.
- Rozsah čísel: spojovník bez medzier `10-15`, alebo slovne "od 10 do 15".

### Medzery a interpunkcia
- Žiadna medzera pred `,` `.` `:` `;` `!` `?`. Medzera za nimi.
- Vo vnútri zátvoriek a úvodzoviek bez medzier: `(text)`, `„text"`.
- Tri bodky ako jeden znak vynechania, s medzerou pred ďalším slovom.

## Register: ty vs vy

- **Drž jeden register cez celý text.** Miešanie "ty" a "vy" je tell.
- "Vy/Vás/Vám" píš **malým** písmenom v bežnom webovom/marketingovom texte. Veľké "Vy" len v priamom osobnom liste alebo formálnom oslovení konkrétnej osoby.
- Slovenčina je **pro-drop**: zámeno sa často vynecháva. "Ozvite sa nám" je prirodzenejšie než "Vy sa nám ozvite". Mechanické opakovanie "vy/vaše" v každej vete je strojový tell.

## Pasíva a nominálny štýl

- Slovenčina preferuje **aktívum**. "Odporúčame" > "je odporúčané". "Vyriešime to" > "bude to vyriešené".
- Vyhýbaj sa hromadeniu slovesných podstatných mien ("realizácia zabezpečenia optimalizácie"). Rozbi na slovesá.

## Časté AI chyby v slovenčine

- Nesprávna rekcia (väzba): `ohľadom niečoho` (chybné) → `o niečom`, `k niečomu`.
- `kvôli` na vyjadrenie príčiny pozitívnej veci (kvôli sa viaže skôr na účel/vinu) → `vďaka`, `pre`.
- Zhoda podmetu s prísudkom pri zložených podmetoch.
- Nadmerné `ktorý` v reťazených vetách (anglické which/that calque).

## Programové overenie (voliteľné)

- **LanguageTool** má slovenský profil, open-source pravidlový engine a API. Reálne integrovateľný ako automatický korektor správnosti.
- **JÚĽŠ slovníky** (`slovnik.juls.savba.sk`): KSSJ + PSP cez webové rozhranie, dá sa dotazovať na existenciu/tvar slova (nie na štýl).
- **korektor.sk**: bezplatný online korektor (čiarky, diakritika, tvary) ako baseline.

Vatožrút sám rieši **štýl/slop**; správnosť (gramatika, čiarky) deleguj na korektor/LanguageTool. Sú to dve nezávislé vrstvy.
