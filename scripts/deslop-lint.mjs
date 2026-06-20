#!/usr/bin/env node
// Vatozrut deslop-lint: najde SK slop telly v texte.
// Pouzitie:
//   node scripts/deslop-lint.mjs subor.txt
//   echo "text" | node scripts/deslop-lint.mjs
//   node scripts/deslop-lint.mjs subor.txt --json
//
// Skript len HLASI signaly. Rozhodnutie co s nimi robi model/clovek.

import { readFileSync } from 'node:fs';
import { lint, wordCount } from './patterns.mjs';

function readInput(path) {
  if (path && path !== '-') return readFileSync(path, 'utf8');
  return readFileSync(0, 'utf8'); // stdin
}

const args = process.argv.slice(2);
const json = args.includes('--json');
const path = args.find((a) => !a.startsWith('--'));

let text;
try {
  text = readInput(path);
} catch (e) {
  console.error('Chyba citania vstupu:', e.message);
  process.exit(2);
}

const findings = lint(text);
const words = wordCount(text);
// Hustota slopu: vazene najdenia na 100 slov. Nizsie = lepsie.
const weighted = findings.reduce((s, f) => s + f.vaha, 0);
const density = words ? (weighted / words) * 100 : 0;

if (json) {
  console.log(JSON.stringify({ words, findings: findings.length, weighted, density: +density.toFixed(2), items: findings }, null, 2));
  process.exit(0);
}

if (findings.length === 0) {
  console.log(`Cisty text. 0 tellov v ${words} slovach.`);
  process.exit(0);
}

// Zoskup podla kategorie
const byCat = {};
for (const f of findings) (byCat[f.nazov] ||= []).push(f);

console.log(`Najdenych ${findings.length} tellov v ${words} slovach (hustota ${density.toFixed(1)}/100 slov):\n`);
for (const [cat, items] of Object.entries(byCat)) {
  console.log(`  ${cat} (${items.length}x):`);
  for (const f of items) {
    console.log(`    "${f.match}"  ->  ${f.fix}`);
  }
  console.log('');
}
console.log('Pripomienka: zoznam je heuristika. Konkretny fakt nie je slop. Nerez naslepo.');
