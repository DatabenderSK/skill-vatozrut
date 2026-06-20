---
name: vatozrut
description: Použi keď píšeš, edituješ, recenzuješ alebo benchmarkuješ slovenský text a treba odstrániť AI-slop telly bez straty významu, faktov a hlasu. Spúšťaj pri "AI slop", "umelo znejúca slovenčina", "vyčisti slovenský text", "vata v texte", "odslopuj". Vatožrút je slovenský deslop engine: zožerie vatu (prázdne frázy, klišé, kalky, výplň), nechá fakty, čísla a hlas autora. Dobrý ľudský text nechá na pokoji. Obsahuje SK slop katalóg (8 kategórií), slovenskú typografiu/kodifikáciu, eval corpus a lint skripty. NIE je to humanizer - je to deslop engine čo robí prózu hustou a pravdivou.
---

# Vatožrút

Slovenský deslop engine. Vatožrút = žrút vaty. Vata je prázdny výplňový text, ktorým AI nafukuje vety; Vatožrút ju zožerie a nechá zrno: fakty, čísla, hlas autora. Každá veta si musí zaslúžiť miesto.

Nie je to humanizer. Nepridáva kvirky, aby text oklamal detektor. Reže prázdno, chráni fakty.

---

## ⛔ Železné pravidlá (Hard rules)

1. **Nikdy netvrď, že text je "nedetekovateľný" alebo "ľudský".** Cieľ je pravdivá, hustá próza, nie obídenie detektora.
2. **Over-editing dobrého textu je ZLYHANIE.** "Nechaj tak" je validný výstup. Ak je veta konkrétna a nesie obsah, nedotýkaj sa jej.
3. **Nikdy nezmeň fakt.** Zlé číslo, zmenená entita, odstránený qualifier, vymyslený dôkaz, falošná kauzalita = blokujúce zlyhanie. Radšej nechaj slop než sfalšuj fakt.
4. **Slovenská typografia je povinná:** úvodzovky `„"` (nie anglické `""`), žiadny em-dash (U+2014) ani en-dash (U+2013) - používaj čiarku, dvojbodku, zátvorku alebo pomlčku `-`. Desatinná čiarka, nie bodka.
5. **Zachovaj diakritiku a register (ty/vy konzistentne).** Nikdy needituj smerom k strojovej slovenčine.
6. **Cadence check pred finalizáciou.** Striedaj dĺžku viet. Monotónne rovnako dlhé vety sú samy o sebe AI tell.

---

## Pass procedúra (poradie je záväzné)

### 1. Klasifikuj úlohu
- **prepis** (vyčisti existujúci text), **kritika** (len označ telly, neprepisuj), **benchmark** (spusti eval), **údržba** (pridaj nový prípad do corpusu).

### 2. Zamkni fakty PRED editovaním
Vypíš si (mentálne alebo do poznámky) čo sa NESMIE stratiť: named entities, čísla, dátumy, verzie, ceny, URL, citácie, telefóny/adresy, explicitnú neistotu ("možno", "zatiaľ", "približne"), modálne slovesá nesúce význam, first-person názor a stance autora, suchý humor. Toto je chránené. Viď `references/hlas-a-zachovanie.md`.

### 3. Nastav evidence boundary
Pri vágnom marketingovom copy prepni do **evidence-bound režimu**: nevymýšľaj features, dátumy, ľudí, metriky ani benefity. Nepodložené "rýchlejšie rozhodovanie", "bezproblémový proces" sa stávajú buď proof gap (označ ako [DOPLNIŤ DÔKAZ]) alebo otázka na klienta, NIE vyleštená veta.

### 4. Diagnostikuj klastre, nie izolované slová
Hľadaj 8 kategórií (detail `references/sk-slop-katalog.md`):
1. Connector/spojkový slop ("Navyše,", "V neposlednom rade", "Je dôležité poznamenať")
2. Filler otvorenia ("V dnešnej uponáhľanej dobe", "V dnešnom digitálnom svete")
3. Marketingové clichés ("individuálny prístup", "spoľahlivý partner", "na mieru")
4. Anglicizmy/kalky ("na dennej báze", "adresovať problém", "dedikovaný")
5. Strojový-preklad feel (pasíva "je odporúčané", zlý ty/vy, nadmerné "Vaše")
6. Prázdne intenzifikátory ("robustný", "komplexný", "kľúčový", "inovatívny")
7. Štrukturálne telly (rule of three všade, "Na záver" zhrnutia, šablónové nadpisy)
8. Typografické telly (anglické úvodzovky, em-dash, anglický formát čísel)

### 5. Prepíš v tomto poradí
1. Zachovaj claims a constraints (z kroku 2).
2. Vystrihni scaffolding a nafúknuté abstraktné podstatné mená.
3. Over, že každá veta nesie aspoň jedno: claim, príklad, číslo, obraz, obmedzenie alebo dôsledok. Ak veta neprejde, zlúč ju alebo zmaž.
4. Zlaď register (marketing vs blog vs formál, viď `references/register-copy.md`).
5. Kontrola: strata významu? príliš sterilné (bland-clean)? nahradil si formulu inou formulou? over-editing?

### 6. Validuj (keď máš súbory)
```
node scripts/deslop-lint.mjs <subor.txt>      # nájde banned frázy + typografiu + skóre
node scripts/cadence-score.mjs <subor.txt>    # variabilita dĺžky viet
node scripts/run-benchmark.mjs                # release gate nad eval corpusom
```

### 7. Výstup
Opravený text PRVÝ. Poznámka len keď vysvetľuje materiálnu zmenu (napr. "vyhodil som tvrdenie X - nebolo podložené, doplň dôkaz"). Žiadne chválenie vlastnej práce.

---

## Self-improvement loop

Vatožrút sa zlepšuje cez **eval corpus**, nie cez tréning. Keď narazíš na nový slop alebo na false-positive (zničil si dobrý text):
1. Zredukuj na najmenší reprodukovateľný prípad.
2. Pridaj ho do `benchmarks/korpus-sk.jsonl` (slop) alebo `benchmarks/false-positive.jsonl` (good text čo treba nechať).
3. Ak je to nový vzor, pridaj pattern do `scripts/patterns.mjs`.
4. Spusti `node scripts/run-benchmark.mjs` - musí prejsť.
5. Zapíš do changelogu.

Detail: `docs/ako-pridat-pripad.md`.

---

## Referenčné súbory

- **`references/sk-slop-katalog.md`** ⛔ - 8 kategórií, konkrétne frázy → náhrady. Jadro. Čítaj pred každým passom.
- **`references/spravnost-kodifikacia.md`** - slovenská typografia, úvodzovky, pomlčka vs spojovník, ty/vy, pasíva, PSP/KSSJ, LanguageTool SK.
- **`references/hlas-a-zachovanie.md`** - čo CHRÁNIŤ; blokujúce zlyhania.
- **`references/register-copy.md`** - marketing vs blog vs formál; čo je v ktorom registri slop.
- **`references/evaluation.md`** - ako funguje eval harness, skóre, release gate.

## Rozsah
Vatožrút rieši slovenský text (marketingový, webový, blogový, formálny). Pre iné jazyky nie je určený - katalóg, typografia aj kodifikácia sú špecifické pre slovenčinu. Na úrovni prostredia ho vie dopĺňať deterministický pre-commit hook na typografiu (napr. zákaz em-dash pri zápise súborov).
