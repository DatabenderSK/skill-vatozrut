#!/usr/bin/env node
// Vatozrut cadence-score: meria variabilitu dlzky viet.
// Monotonne rovnako dlhe vety su samy o sebe AI tell.
// Pouzitie: node scripts/cadence-score.mjs subor.txt
//
// CV (variacny koeficient = stddev/priemer). Vyssi = pestrejsi rytmus.
// Prah: CV < 0.28 = podozrivo monotonne.

import { readFileSync } from 'node:fs';

const PRAH_CV = 0.28;

function readInput(path) {
  if (path && path !== '-') return readFileSync(path, 'utf8');
  return readFileSync(0, 'utf8');
}

const path = process.argv.slice(2).find((a) => !a.startsWith('--'));
let text;
try {
  text = readInput(path);
} catch (e) {
  console.error('Chyba citania vstupu:', e.message);
  process.exit(2);
}

// Rozdel na vety (zjednodusene): . ! ? nasledovane medzerou/koncom.
const vety = text
  .replace(/\s+/g, ' ')
  .split(/(?<=[.!?])\s+/)
  .map((s) => s.trim())
  .filter(Boolean);

const dlzky = vety.map((v) => (v.match(/\p{L}+/gu) || []).length).filter((n) => n > 0);

if (dlzky.length < 3) {
  console.log('Prilis kratky text na cadence analyzu (< 3 vety).');
  process.exit(0);
}

const priemer = dlzky.reduce((a, b) => a + b, 0) / dlzky.length;
const variancia = dlzky.reduce((a, b) => a + (b - priemer) ** 2, 0) / dlzky.length;
const stddev = Math.sqrt(variancia);
const cv = priemer ? stddev / priemer : 0;

// Pocet susednych viet s takmer rovnakou dlzkou (monotonne runy)
let runy = 0;
for (let i = 1; i < dlzky.length; i++) if (Math.abs(dlzky[i] - dlzky[i - 1]) <= 1) runy++;

console.log(`Viet: ${dlzky.length}`);
console.log(`Priemerna dlzka: ${priemer.toFixed(1)} slov`);
console.log(`Rozptyl (stddev): ${stddev.toFixed(1)}`);
console.log(`CV (variabilita rytmu): ${cv.toFixed(3)}  [prah ${PRAH_CV}]`);
console.log(`Takmer rovnake susedne vety: ${runy}/${dlzky.length - 1}`);
console.log('');

if (cv < PRAH_CV) {
  console.log('VAROVANIE: monotonny rytmus. Vety su podobne dlhe. Striedaj kratke a dlhe.');
  process.exit(1);
}
console.log('Rytmus OK. Dlzka viet sa strieda.');
process.exit(0);
