#!/usr/bin/env node
// Vatozrut release gate. Spusti nad eval corpusom.
// Pouzitie: node scripts/run-benchmark.mjs
//
// Kontroluje:
//  1. Detekcia: lint(before) najde aspon 1 tell.
//  2. Zlepsenie: lint(after) ma menej (vazene) tellov nez lint(before).
//  3. Zachovanie: kazdy retazec v `zachovaj` je pritomny v `after`.
//  4. False-positive: pri akcia=nechaj ma lint(text) byt pod prahom.
// Exit 1 ak gate zlyha.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { lint } from './patterns.mjs';

const __dir = dirname(fileURLToPath(import.meta.url));
const BENCH = join(__dir, '..', 'benchmarks');
const FP_PRAH = 1; // dobry text smie mat max tolko (vazenych) tellov

function loadJsonl(file) {
  let raw;
  try {
    raw = readFileSync(join(BENCH, file), 'utf8');
  } catch {
    return [];
  }
  return raw
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l, i) => {
      try {
        return JSON.parse(l);
      } catch (e) {
        console.error(`  ! ${file} riadok ${i + 1}: nevalidny JSON (${e.message})`);
        return null;
      }
    })
    .filter(Boolean);
}

const weighted = (text) => lint(text).reduce((s, f) => s + f.vaha, 0);

let zlyhania = 0;
let prejde = 0;

// --- 1. Slop korpus ---
const korpus = loadJsonl('korpus-sk.jsonl');
console.log(`\n== Slop korpus (${korpus.length} pripadov) ==`);
for (const c of korpus) {
  const wBefore = weighted(c.before);
  const wAfter = weighted(c.after);
  const chyby = [];

  if (wBefore < 1) chyby.push('detekcia: lint(before) nenasiel ziadny tell (chyba pattern?)');
  if (wAfter >= wBefore) chyby.push(`zlepsenie: after (${wAfter}) nie je cistejsi nez before (${wBefore})`);
  for (const fakt of c.zachovaj || []) {
    if (!c.after.includes(fakt)) chyby.push(`ZACHOVANIE (kriticke): chyba fakt "${fakt}" v after`);
  }

  if (chyby.length) {
    zlyhania++;
    console.log(`  FAIL [${c.id}] ${c.kategoria}`);
    for (const ch of chyby) console.log(`        - ${ch}`);
  } else {
    prejde++;
    console.log(`  ok   [${c.id}] ${c.kategoria}  (before ${wBefore} -> after ${wAfter})`);
  }
}

// --- 2. False-positive korpus ---
const fp = loadJsonl('false-positive.jsonl');
console.log(`\n== False-positive korpus (${fp.length} pripadov) ==`);
for (const c of fp) {
  if (c.akcia !== 'nechaj') {
    prejde++;
    continue;
  }
  const w = weighted(c.text);
  if (w > FP_PRAH) {
    zlyhania++;
    const items = lint(c.text).map((f) => `"${f.match}"`).join(', ');
    console.log(`  FAIL [${c.id}] dobry text flagnuty (vaha ${w}): ${items}`);
  } else {
    prejde++;
    console.log(`  ok   [${c.id}] dobry text nechany (vaha ${w})`);
  }
}

// --- Suhrn ---
console.log(`\n== Vysledok: ${prejde} ok, ${zlyhania} fail ==`);
if (zlyhania > 0) {
  console.log('GATE ZLYHAL. Oprav pattern alebo pripad pred releasom.');
  process.exit(1);
}
console.log('GATE PRESIEL.');
process.exit(0);
