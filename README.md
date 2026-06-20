# Vatožrút

Slovenský deslop engine. Čistí AI slop v slovenských textoch bez toho, aby zničil fakty, čísla a hlas autora.

> Vata je text, ktorý vyzerá ako obsah, ale nič nenesie. Vatožrút ju zožerie a nechá zrno: fakty, čísla, hlas. Každá veta si musí zaslúžiť miesto.

## Prečo vznikol

Slovenský web a marketingový copy čoraz častejšie znie ako z generátora. Problém je, že nástroje proti AI slopu sú anglické a na slovenčinu nesadajú:

- ich zoznamy fráz sú anglické ("delve", "tapestry"), nie slovenské ("v dnešnej uponáhľanej dobe", "individuálny prístup", "na dennej báze"),
- ich typografia rieši anglické konvencie, nie slovenské úvodzovky `„"`, pomlčku či desatinnú čiarku,
- ignorujú slovenské javy: ty/vy register, pasíva zo strojového prekladu, kalky z angličtiny, diakritiku.

Slovenský deslop nástroj jednoducho neexistoval. Vatožrút je postavený od základu pre slovenčinu: katalóg reálnych SK AI tellov (z reálnych zdrojov), slovenská kodifikácia a typografia, a eval corpus, ktorý rastie z praxe.

A hlavne: **nie je to humanizer.** Nepridáva kvirky, aby text oklamal detektor. Reže prázdno, chráni fakty.

## Čo robí

- Diagnostikuje 8 kategórií slovenského slopu: spojkový slop, filler otvorenia, marketingové clichés, anglicizmy/kalky, strojové pasíva, prázdne buzzwordy, štrukturálne telly, typografiu.
- Chráni to, čo sa nesmie stratiť: čísla, dátumy, ceny, mená, neistotu, názor autora.
- Nechá dobrý ľudský text na pokoji (over-editing je zlyhanie).
- Má spustiteľný lint, cadence skóre a release gate nad eval corpusom.

## Inštalácia

Skopíruj priečinok do svojich Claude Code skillov:

```
git clone https://github.com/DatabenderSK/skill-vatozrut.git ~/.claude/skills/vatozrut
```

Skill sa aktivuje sám, keď píšeš o "AI slop", "umelo znejúca slovenčina", "vyčisti slovenský text", "odslopuj", alebo ho vyvolaj priamo.

## Použitie (skripty)

```
node scripts/deslop-lint.mjs text.txt        # najde telly + skore
echo "tvoj text" | node scripts/deslop-lint.mjs
node scripts/cadence-score.mjs text.txt      # variabilita dlzky viet
node scripts/run-benchmark.mjs               # release gate nad corpusom
```

Skripty len hlásia signály. Rozhodnutie, čo s nimi, robí človek alebo model. Zoznam je heuristika, nie zákon: konkrétny fakt nie je slop.

## Štruktúra

```
SKILL.md                 pass procedura + zelezne pravidla
references/              katalog, kodifikacia, hlas, register, evaluacia
scripts/                patterns.mjs (single source of truth), lint, cadence, gate
benchmarks/             korpus-sk.jsonl + false-positive.jsonl
docs/                   ako pridat pripad, roadmap, changelog
```

## Licencia

MIT. Viď `LICENSE`.
