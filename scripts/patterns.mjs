// Vatozrut pattern catalog - single source of truth pre lint a benchmark.
// Prozaicka verzia: references/sk-slop-katalog.md
//
// Kazde pravidlo: { rx: RegExp (s flagom g), fix: string }
// Pridanie noveho vzoru: pridaj sem + pripadne do benchmarks/korpus-sk.jsonl.
// Pri pridavani slov pouzi \p{L} (s flagom u) na pokrytie slovenskej diakritiky v ohybani.
// Typograficke znaky (em-dash, en-dash, anglicke uvodzovky) staviame cez String.fromCharCode,
// aby v zdroji neboli literalne (a aby ich nezablokoval typograficky pre-commit hook).

const RX_DASH = new RegExp('[' + String.fromCharCode(0x2014, 0x2013) + ']', 'g'); // em-dash, en-dash
const RX_ENQUOT = new RegExp('[' + String.fromCharCode(0x201C, 0x201D) + ']', 'g'); // anglicke "" hore-hore

export const KATEGORIE = [
  {
    id: 'spojky',
    nazov: 'Spojkovy slop',
    vaha: 1,
    pravidla: [
      { rx: /\bnavyše,/giu, fix: 'spoj vety alebo zmaz' },
      { rx: /\bokrem toho,/giu, fix: 'spoj vety alebo zmaz' },
      { rx: /v neposlednom rade/giu, fix: '"nakoniec" alebo zmaz' },
      { rx: /v konečnom dôsledku/giu, fix: '"nakoniec" / zmaz' },
      { rx: /je dôležité (poznamenať|si uvedomiť|spomenúť|zdôrazniť)/giu, fix: 'zmaz, povedz vec priamo' },
      { rx: /treba (zdôrazniť|podotknúť|poznamenať)/giu, fix: 'zmaz' },
      { rx: /netreba zabúdať/giu, fix: 'zmaz' },
      { rx: /stojí za zmienku/giu, fix: 'zmaz' },
      { rx: /za zmienku stojí/giu, fix: 'zmaz' },
      { rx: /z tohto dôvodu/giu, fix: '"preto"' },
      { rx: /vzhľadom na vyššie uvedené/giu, fix: '"preto"' },
      { rx: /v tomto kontexte/giu, fix: 'zmaz' },
      { rx: /ako už bolo spomenuté/giu, fix: 'zmaz' },
      { rx: /inými slovami/giu, fix: 'zmaz alebo prepis priamo' },
    ],
  },
  {
    id: 'filler',
    nazov: 'Filler otvorenia',
    vaha: 2,
    pravidla: [
      { rx: /v dnešnej (uponáhľanej|hektickej|modernej|digitálnej) dobe/giu, fix: 'zmaz, zacni faktom' },
      { rx: /v dnešnom (digitálnom|rýchlo sa meniacom) svete/giu, fix: 'zmaz, zacni faktom' },
      { rx: /v dnešnej dobe/giu, fix: 'zmaz' },
      { rx: /v súčasnej dobe/giu, fix: 'zmaz' },
      { rx: /žijeme v dobe/giu, fix: 'zmaz' },
      { rx: /v ére digitalizácie/giu, fix: 'zmaz' },
      { rx: /v tomto článku sa (pozrieme|zameriame)/giu, fix: 'chod rovno k veci' },
    ],
  },
  {
    id: 'cliche',
    nazov: 'Marketingove cliche',
    vaha: 2,
    pravidla: [
      { rx: /individuálny prístup/giu, fix: 'ukaz konkretne (napr. "volame do 24 h")' },
      { rx: /osobný prístup/giu, fix: 'ukaz konkretne' },
      { rx: /(riešenie|riešenia) na mieru/giu, fix: 'co presne klient dostane' },
      { rx: /šité na mieru/giu, fix: 'co presne klient dostane' },
      { rx: /na kľúč/giu, fix: 'co presne klient dostane' },
      { rx: /komplexné (služby|riešenia)/giu, fix: 'vymenuj sluzby' },
      { rx: /všetko pod jednou strechou/giu, fix: 'vymenuj sluzby' },
      { rx: /spoľahlivý partner/giu, fix: 'zmaz' },
      { rx: /dlhoročné skúsenosti/giu, fix: 'konkretne cislo ("15 rokov")' },
      { rx: /dlhoročná tradícia/giu, fix: 'konkretne od kedy' },
      { rx: /tím (odborníkov|profesionálov)/giu, fix: 'konkretne mena/role' },
      { rx: /mladý a dynamický kolektív/giu, fix: 'zmaz' },
      { rx: /spokojnosť (zákazníka|klienta) je naša priorita/giu, fix: 'zmaz' },
      { rx: /kvalita za rozumnú cenu/giu, fix: 'konkretna cena/benefit' },
      { rx: /(jednotka|špička|líder) na trhu/giu, fix: 'dokaz (cisla, ocenenia) alebo zmaz' },
    ],
  },
  {
    id: 'anglicizmus',
    nazov: 'Anglicizmy a kalky',
    vaha: 2,
    pravidla: [
      { rx: /robiť zmysel/giu, fix: '"davat/mat zmysel"' },
      { rx: /na dennej báze/giu, fix: '"denne"' },
      { rx: /na konci dňa/giu, fix: '"napokon"' },
      { rx: /z dlhodobého hľadiska/giu, fix: '"dlhodobo"' },
      { rx: /mať dopad na/giu, fix: '"ovplyvnit"' },
      { rx: /\badresovať\b/giu, fix: '"riesit" (problem)' },
      { rx: /\bdedikovan\p{L}*/giu, fix: '"vyhradeny / urceny"' },
      { rx: /\besenciáln\p{L}*/giu, fix: '"zakladny / nevyhnutny"' },
      { rx: /\bimplementov\p{L}*/giu, fix: '"zaviest / nasadit"' },
      { rx: /\bsofistikovan\p{L}*/giu, fix: '"prepracovany"' },
      { rx: /\bohľadom\b/giu, fix: '"o (com)"' },
      { rx: /\bohľadne\b/giu, fix: '"o (com)"' },
      { rx: /naprieč firmou/giu, fix: '"v celej firme"' },
      { rx: /ponoriť sa do sveta/giu, fix: 'zmaz' },
    ],
  },
  {
    id: 'pasiva',
    nazov: 'Strojovy-preklad feel (pasiva, register)',
    vaha: 1,
    pravidla: [
      { rx: /je odporúčané/giu, fix: '"odporucame"' },
      { rx: /je potrebné, aby ste/giu, fix: '"mali by ste / treba"' },
      { rx: /môže byť dosiahnuté/giu, fix: '"da sa dosiahnut"' },
      { rx: /je vyžadované/giu, fix: '"vyzadujeme / treba"' },
      { rx: /musí byť (vykonané|realizované)/giu, fix: '"treba urobit"' },
      { rx: /za účelom/giu, fix: '"aby / na"' },
      { rx: /v prípade, že/giu, fix: '"ak"' },
      { rx: /z dôvodu, že/giu, fix: '"pretoze"' },
      { rx: /neváhajte nás kontaktovať/giu, fix: '"ozvite sa nam"' },
      { rx: /sme tu pre (vás|Vás)/giu, fix: 'konkretna ponuka' },
    ],
  },
  {
    id: 'buzzword',
    nazov: 'Prazdne intenzifikatory',
    vaha: 1,
    pravidla: [
      { rx: /\bjedinečn\p{L}*/giu, fix: 'zmaz alebo dokaz' },
      { rx: /\bunikátn\p{L}*/giu, fix: 'zmaz alebo dokaz' },
      { rx: /\binovatívn\p{L}*/giu, fix: 'zmaz alebo dokaz' },
      { rx: /\bkomplexn\p{L}*/giu, fix: 'zmaz alebo vymenuj' },
      { rx: /\brobustn\p{L}*/giu, fix: 'zmaz alebo dokaz' },
      { rx: /\bšpičkov\p{L}*/giu, fix: 'zmaz alebo dokaz' },
      { rx: /\bprémiov\p{L}*/giu, fix: 'zmaz alebo dokaz' },
      { rx: /\bkľúčov\p{L}*/giu, fix: 'zmaz (takmer vzdy slop)' },
      { rx: /\bprelomov\p{L}*/giu, fix: 'zmaz alebo dokaz' },
      { rx: /\brevolučn\p{L}*/giu, fix: 'zmaz alebo dokaz' },
      { rx: /\bholistick\p{L}*/giu, fix: 'zmaz' },
      { rx: /\bbezproblémov\p{L}*/giu, fix: 'zmaz alebo dokaz' },
      { rx: /\bnajmodernejš\p{L}*/giu, fix: 'zmaz alebo dokaz' },
      { rx: /\bsynergi\p{L}*/giu, fix: 'zmaz' },
      { rx: /neustále sa vyvíjajúc\p{L}*/giu, fix: 'zmaz' },
    ],
  },
  {
    id: 'typografia',
    nazov: 'Typograficke telly',
    vaha: 3,
    pravidla: [
      { rx: RX_DASH, fix: 'em/en-dash na ciarku, dvojbodku alebo pomlcku "-"' },
      { rx: RX_ENQUOT, fix: 'anglicke uvodzovky na slovenske (dolu-hore)' },
      { rx: /\b\d+\.\d+\s?(kW|kg|m|cm|km|l|h|%)/g, fix: 'desatinna BODKA na ciarku (napr. 3,5 kW)' },
    ],
  },
];

// Lint nad textom. Vracia pole findings: {kategoria, vaha, match, fix, index}
export function lint(text) {
  const findings = [];
  for (const kat of KATEGORIE) {
    for (const pr of kat.pravidla) {
      pr.rx.lastIndex = 0;
      let m;
      while ((m = pr.rx.exec(text)) !== null) {
        findings.push({
          kategoria: kat.id,
          nazov: kat.nazov,
          vaha: kat.vaha,
          match: m[0],
          fix: pr.fix,
          index: m.index,
        });
        if (m.index === pr.rx.lastIndex) pr.rx.lastIndex++; // ochrana proti zacykleniu pri zero-width
      }
    }
  }
  return findings.sort((a, b) => a.index - b.index);
}

export function wordCount(text) {
  const w = text.trim().match(/\p{L}+/gu);
  return w ? w.length : 0;
}
