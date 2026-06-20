# SK slop katalóg

Jadro Vatožrúta. 8 kategórií AI tellov v slovenčine. Formát: `fráza` → náhrada (alebo "zmazať").

**Princíp:** nerež slovo lebo je na zozname. Rež ho lebo nenesie obsah. Zoznam je heuristika, nie zákon. Konkrétny fakt "máme 15 rokov skúseností" nie je slop, aj keď obsahuje "skúseností".

Strojovo čitateľná verzia patternov: `scripts/patterns.mjs` (single source of truth pre lint).

---

## 1. Connector / spojkový slop

Nadužívané prechody čo predstierajú logickú väzbu. Väčšinou zmaž alebo spoj vety.

- `Navyše,` / `Okrem toho,` / `Okrem iného` → spoj vety alebo zmazať
- `V neposlednom rade` / `V konečnom dôsledku` → "Nakoniec" alebo zmazať
- `Je dôležité poznamenať, že` / `Je dôležité si uvedomiť, že` → zmazať, povedz vec priamo
- `Treba zdôrazniť, že` / `Treba podotknúť` / `Netreba zabúdať, že` → zmazať
- `Stojí za zmienku, že` / `Za zmienku stojí` → zmazať
- `Na jednej strane... na druhej strane` → priame porovnanie
- `Na druhej strane však` → "Ale" / "Lenže"
- `Z tohto dôvodu` / `Vzhľadom na vyššie uvedené` → "Preto"
- `V tomto kontexte` / `Ako už bolo spomenuté` / `Inými slovami` → zmazať

## 2. Filler otvorenia

Prázdne úvody. Zmaž a začni prvou konkrétnou vetou (fakt, číslo, otázka čitateľa).

- `V dnešnej uponáhľanej dobe` / `V dnešnej hektickej dobe`
- `V dnešnom digitálnom svete` / `V dnešnej digitálnej dobe`
- `V dnešnej modernej spoločnosti` / `V dnešnej dobe` / `V súčasnej dobe`
- `Žijeme v dobe, keď` / `Žijeme v dobe informačného presýtenia`
- `V dnešnom rýchlo sa meniacom svete` / `V ére digitalizácie`
- `V tomto článku sa pozrieme/zameriame na` → choď rovno k veci
- `Či už ste... alebo..., tento článok`

## 3. Marketingové clichés

Firemné prázdno. Nahraď konkrétnym dôkazom alebo zmaž.

- `individuálny prístup` / `osobný prístup` → ukáž konkrétne ("voláme do 24 h")
- `riešenie na mieru` / `šité na mieru` / `na kľúč` → čo presne klient dostane
- `komplexné služby/riešenia` / `všetko pod jednou strechou` → vymenuj služby
- `sme váš spoľahlivý partner` / `váš partner pre...` → zmazať
- `dlhoročné skúsenosti` / `s dlhoročnou tradíciou` → konkrétne číslo ("15 rokov")
- `tím odborníkov/profesionálov` → konkrétne mená/role
- `profesionálny prístup` / `mladý a dynamický kolektív` / `jedna veľká rodina` → zmazať
- `jednotka/špička/líder na trhu` → dôkaz (čísla, ocenenia) alebo zmazať
- `spokojnosť zákazníka je naša priorita` / `náš zákazník, náš pán` → zmazať
- `kvalita za rozumnú cenu` / `veľa muziky za málo peňazí` → konkrétna cena/benefit
- `bezkonkurenčná/najlepšia cena na trhu` → konkrétne číslo
- `tradícia a inovácie` / `zaslúžite si to najlepšie` / `doprajte si` → zmazať

## 4. Anglicizmy / kalky

Doslovné preklady z angličtiny. Nahraď prirodzeným slovenským tvarom.

- `robiť zmysel` → dávať/mať zmysel
- `na dennej báze` → denne
- `na konci dňa` → napokon
- `z dlhodobého hľadiska` → dlhodobo
- `mať dopad na` → ovplyvniť
- `urobiť rozhodnutie` → rozhodnúť sa
- `adresovať problém` → riešiť problém
- `dedikovaný` → vyhradený / určený
- `esenciálny` → základný / nevyhnutný
- `implementovať` → zaviesť / nasadiť
- `sofistikovaný` → prepracovaný
- `relevantný` (nadužívané) → dôležitý / súvisiaci
- `ohľadom / ohľadne` → o (čom), k (čomu)
- `naprieč firmou` → v celej firme
- `v rámci` (nadužívané) → vynechať / "pri", "počas"
- `ponoriť sa do sveta X` → zmazať

## 5. Strojový-preklad feel (pasíva, register)

- `je odporúčané` → odporúčame
- `je potrebné, aby ste` → mali by ste / treba
- `môže byť dosiahnuté` → dá sa dosiahnuť
- `je vyžadované` → vyžadujeme / treba
- `musí byť vykonané` → treba urobiť
- `za účelom` → aby / na
- `v prípade, že` → ak
- `z dôvodu, že` → pretože
- `disponovať niečím` → mať niečo
- `realizovať` → urobiť / uskutočniť
- `Neváhajte nás kontaktovať` → "Ozvite sa nám"
- `Sme tu pre Vás` → konkrétna ponuka
- `Vaše/Váš/Vám` s veľkým V v každej vete → striedmo, malé "vaše" (veľké len v priamom liste/oslovení)
- Mechanické opakovanie zámena v každej vete → slovenčina je pro-drop, vynechaj

## 6. Prázdne intenzifikátory / buzzwords

Väčšinou zmazať alebo nahradiť konkrétnym dôkazom: `jedinečný`, `unikátny`, `inovatívny`, `komplexný`, `robustný`, `špičkový`, `prémiový`, `kľúčový`, `prelomový`, `revolučný`, `holistický`, `dynamický`, `bezproblémový`, `neustále`, `neustále sa vyvíjajúci`, `najmodernejší`, `výnimočný`, `synergia`, `ideálne riešenie`, `každý si príde na svoje`.

Test: ak vetu o tej istej veci povieš bez prídavného mena a nič sa nestratí, prídavné meno bolo slop.

## 7. Štrukturálne telly

- **Rule of three všade:** tri prídavné mená v rade ("rýchle, efektívne a spoľahlivé"), trojčlenné výpočty v každej vete. Nechaj jeden, najsilnejší.
- **`Na záver` / `Záverom`** zhrnutia čo len opakujú už povedané → zmaž alebo daj konkrétny ďalší krok.
- **Šablónové nadpisy:** "Prečo je X dôležité", "Čo je X a ako funguje", "Výhody a nevýhody X".
- **Nadmerné bullet listy** namiesto plynulého textu.
- **Prehnaný paralelizmus:** každý odsek rovnako dlhý, stavba téza-3 príklady-mini-záver.
- **Generická všeobecnosť:** žiadne čísla, mená, zdroje.
- **Vždy vyvážený neutrálny tón** bez názoru, humoru, osobnej skúsenosti.

## 8. Typografické telly

(Časť vynucuje aj em-dash hook v LAB/.claude pri zápise súborov.)

- **Anglické úvodzovky** namiesto slovenských `„"` (otváracia dole, zatváracia hore).
- **Em-dash (U+2014) a en-dash (U+2013)** v slovenskom texte → čiarka, dvojbodka, zátvorka; na spojenie pomlčka `-`.
- **Spojovník vs. pomlčka:** pomlčka má medzery z oboch strán, spojovník žiadne (AI to mieša). Viď `spravnost-kodifikacia.md`.
- **Nesprávne medzery** okolo interpunkcie a vo vnútri úvodzoviek/zátvoriek.
- **Anglický formát čísel/dátumov:** desatinná bodka namiesto čiarky; oddeľovač tisícov.
- **Nadmerné čiarky** (kopírovanie anglickej interpunkcie).

---

**Pôvod katalógu:** reálne SK zdroje (Effectix copy klišé, JÚĽŠ/SME jazyková poradňa, coolwriters.sk, altky.sk, Lexika, Emefka). Kategórie 1-5 a 8 sú priamo doložené; buzzwordy v kat. 6 sú sčasti medzinárodný corporate žargón.
