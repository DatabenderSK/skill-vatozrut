# Roadmap

Plán ako posunúť Vatožrúta z pravidlového katalógu na dátovo podložený SK naturalness scorer. Zoradené podľa pomeru dopad/náklad. Všetko offline a deterministické (vhodné do eval gate), pokým nie je uvedené inak.

## Stav: v0.1.0
Pravidlový engine. Regex katalóg fráz (8 kategórií), typografia, cadence skóre (variabilita dĺžky viet), eval corpus + release gate.

**Známe obmedzenie:** regex chytá presné tvary. Ohýbanie mimo katalóg uniká ("spoľahlivého partnera" prejde, "spoľahlivý partner" sa chytí).

## Priorita 1: Lematizácia pravidiel (najvyšší pomer)
Lematizuj text pred matchom, katalóg píš v lemmách. Knižnica: `simplemma` (Python, MIT) alebo Stanza sk.
- **Dá:** 3-5x väčší záber bez rozširovania katalógu.
- **Náklad:** nízky, jedna závislosť.
- **Pozn.:** zmení architektúru lintu (pridá lemmatizačný krok pred regex).

## Priorita 2: Frekvenčné skóre prirodzenosti
Offline frekvenčná tabuľka (Leipzig Slovak wordlist bez registrácie, alebo brm.sk 1,8 M slov). Slová a bigramy v dolnom percentile prirodzeného použitia označ ako podozrivé. Buzzwordy ako "robustný", "dedikovaný" majú nízku korpusovú frekvenciu vs marketingovú nadreprezentáciu.
- **Dá:** dátovo podložené slop skóre namiesto ručného katalógu.
- **Náklad:** nízky-stredný (offline lookup tabuľka).

## Priorita 3: Burstiness / lemma-repetition metrika
Rozšír cadence o opakovanie lem (type-token ratio na lemmách, n-gram repetícia). AI nadužíva tie isté lemy.
- **Dá:** druhý štýlový signál, čisto offline.
- **Náklad:** nízky (stavia na lematizácii z P1).

## Priorita 4: Detekcia kalkov a MT slovosledu
Cielený lemma-katalóg kalkov + heuristiky slovosledu (nadmerné "Vaše", reťazené pasíva). Splýva s P1.
- **Náklad:** nízky.

## Priorita 5: LanguageTool SK ako vrstva správnosti
Lokálny LT server alebo API, volaj vo validačnom kroku. Oddelené od slop logiky.
- **Dá:** gramatika/diakritika/medzery zadarmo.
- **Náklad:** stredný (server alebo rate-limit).
- **Pozn.:** SK pravidlová báza LT je slabšia než EN/DE, preto doplnok, nie jadro.

## Zámerne odložené
- **Perplexity cez slovak-gpt-j:** výskum (CEAID, arXiv 2509.26051) ukázal, že zero-shot perplexity v SK zlyháva, a beh modelu lokálne je ťažký na osobný nástroj. Nízky pomer.
- **LLM-as-judge:** token cena, nedeterministické (ťažko do gate). Nechať ako opt-in pre dôležitý text, nie default.

## Poznámka k benchmarkingu
Priamy verejný SK deslop konkurent neexistuje (rešerš jún 2026). Komerčné SK "humanizery" robia opak nášho cieľa (obchádzajú detektor). Akademicky relevantné: CEAID benchmark (SK+CZ), MULTITuDE (KInIT, zatiaľ bez SK). Preto sa nemeriame proti cudziemu nástroju, ale proti vlastnému rastúcemu corpusu a (do budúcna) LanguageTool SK delte.
