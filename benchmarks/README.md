# Benchmarks

Eval corpus, voči ktorému beží release gate (`scripts/run-benchmark.mjs`).

## Súbory

- **`korpus-sk.jsonl`** - prípady slopu. Každý riadok: `before` (so slopom) a `after` (vyčistené), plus `zachovaj` (fakty čo musia prežiť) a `kategoria`/`register`.
- **`false-positive.jsonl`** - dobrý ľudský text, ktorý lint NESMIE flagnúť (`akcia: nechaj`). Stráži pred prílišnou agresivitou.

## Schéma

```json
// korpus-sk.jsonl
{"id":"...","kategoria":"spojky|filler|cliche|anglicizmus|pasiva|buzzword|struktura|typografia",
 "register":"marketing|blog|formal","before":"...","after":"...",
 "zachovaj":["fakt 1"],"vysvetlenie":"..."}

// false-positive.jsonl
{"id":"...","akcia":"nechaj","text":"...","preco_nechat":"...","zakazane_pridat":["..."]}
```

## Porovnanie s konkurenciou

Anglické anti-slop nástroje benchmarkujú proti sebe navzájom. Pre slovenčinu zatiaľ neexistuje porovnateľný verejný deslop nástroj, voči ktorému by malo zmysel sa priamo merať. Preto je gate postavený na **vlastnom rastúcom corpuse** (regresný test) a do budúcna na **LanguageTool SK** ako nezávislom baseline pre vrstvu správnosti (gramatika, čiarky).

Cieľ nie je vyhrať súťaž, ale aby každá verzia chytala aspoň to, čo predošlá, a nepokazila dobrý text.

## Rast

Corpus sa plní z praxe. Postup v `docs/ako-pridat-pripad.md`. Spusti gate:

```
node scripts/run-benchmark.mjs
```
