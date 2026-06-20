# Evaluation harness

Ako Vatožrút meria, či pass funguje, a ako sa bráni regresii. Inšpirované benchmark-driven prístupom: pravidlá a dôkazy idú spolu.

## Súbory

- `benchmarks/korpus-sk.jsonl` - prípady slopu (before → after). Každý riadok:
  ```json
  {"id":"...","kategoria":"spojky|filler|cliche|anglicizmus|pasiva|buzzword|struktura|typografia",
   "register":"marketing|blog|formal","before":"...","after":"...",
   "zachovaj":["fakt 1","fakt 2"],"vysvetlenie":"..."}
  ```
- `benchmarks/false-positive.jsonl` - dobrý text čo treba NECHAŤ. Každý riadok:
  ```json
  {"id":"...","akcia":"nechaj|lahka_uprava","text":"...","preco_nechat":"...","zakazane_pridat":["..."]}
  ```

## Metriky

1. **Detekcia:** lint(`before`) musí nájsť aspoň 1 tell. Ak nenájde, katalóg/pattern chýba.
2. **Zlepšenie:** lint(`after`) má menej tellov než lint(`before`), ideálne 0 v cielenej kategórii.
3. **Zachovanie:** všetky reťazce v `zachovaj` sa musia nachádzať v `after`. Chýbajúci fakt = blokujúce zlyhanie.
4. **False-positive:** pri `akcia: nechaj` má lint(`text`) nájsť 0 (alebo pod prah). Ak flagne dobrý text, pattern je príliš agresívny.
5. **Cadence:** variabilita dĺžky viet (CV). Monotónia pod prah = tell.

## Release gate

`node scripts/run-benchmark.mjs` zlyhá (exit 1) ak:
- ktorýkoľvek `zachovaj` fakt chýba v `after` (kritické),
- false-positive prípad je flagnutý (regresia agresivity),
- celková detekcia padne pod prah.

Skóre (orientačné, 100 bodov):
- 30 detekcia slopu (našiel telly v before)
- 30 zachovanie faktov (nič sa nestratilo)
- 20 zlepšenie (after čistejší než before)
- 15 zdržanlivosť (false-positive nechané na pokoji)
- 5 typografická hygiena

## Improvement loop

Nový slop alebo false-positive → najmenší prípad → pridaj do JSONL → (ak nový vzor) pridaj pattern do `scripts/patterns.mjs` → `run-benchmark.mjs` musí prejsť → commit. Detail v `docs/ako-pridat-pripad.md`.

**Princíp:** každý reálny prípad, na ktorý Vatožrút narazí a pokazí alebo prehliadne, sa stáva trvalým testom. Corpus rastie z praxe, nie z teórie.
