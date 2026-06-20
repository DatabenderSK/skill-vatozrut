# Ako pridať prípad (improvement loop)

Vatožrút sa zlepšuje cez eval corpus, nie cez tréning. Každý reálny slop, ktorý prehliadne, alebo každý dobrý text, ktorý zbytočne pokazí, sa stáva trvalým testom. Tu je postup.

## A. Našiel si nový slop (lint ho nechytil)

1. **Zredukuj na najmenší prípad.** Jedna-dve vety s tým tellom a čistá verzia.
2. **Pridaj pattern** do `scripts/patterns.mjs` v správnej kategórii:
   ```js
   { rx: /nová fráza/giu, fix: 'na čo to nahradiť' },
   ```
   Adjektíva s ohýbaním cez stem: `/\bstem\p{L}*/giu`. Typografické znaky cez `String.fromCharCode`, nie literálne.
3. **Pridaj riadok** do `benchmarks/korpus-sk.jsonl`:
   ```json
   {"id":"kategoria-NN","kategoria":"...","register":"marketing|blog|formal","before":"...","after":"...","zachovaj":["fakty čo musia prežiť"],"vysvetlenie":"..."}
   ```
   Over: `before` obsahuje tell, `after` je čistejší, všetky `zachovaj` reťazce sú v `after`.
4. **Spusti gate:** `node scripts/run-benchmark.mjs` musí prejsť (exit 0).
5. **Zapíš** do `docs/changelog.md`.

## B. Lint pokazil dobrý text (false-positive)

1. Zredukuj na najmenší dobrý text, ktorý nemá byť flagnutý.
2. Pridaj do `benchmarks/false-positive.jsonl`:
   ```json
   {"id":"fp-NN","akcia":"nechaj","text":"...","preco_nechat":"...","zakazane_pridat":["..."]}
   ```
3. **Zmäkči pattern** v `patterns.mjs` (pridaj kontext, zúž regex), aby dobrý text neflagol, ale stále chytal reálny slop.
4. Spusti gate. Musí prejsť aj slop korpus aj false-positive korpus.
5. Changelog.

## Pravidlá kvality corpusu

- **Najmenší reprodukovateľný prípad.** Nie celý článok, len veta s javom.
- **Reálne príklady z praxe** sú cennejšie než vymyslené. Keď čistíš klientský text a nájdeš nový tell, ulož ho.
- **Vyváž register.** Pridávaj marketing, blog aj formál, nie len jeden.
- **Každý `zachovaj` fakt je tvrdý test.** Ak by oprava mohla stratiť číslo/meno, daj ho do `zachovaj`.

## Princíp

Corpus rastie z toho, na čom Vatožrút reálne zlyhá alebo uspeje. Po pol roku používania je SK katalóg presnejší než akýkoľvek teoretický zoznam, lebo pochádza z tvojich vlastných textov a klientov.
