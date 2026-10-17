// Dados inteiramente sinteticos. Nao verifica o motor financeiro privado Casa Santana.
import test from 'node:test';
import assert from 'node:assert/strict';
import {somarCentavosDemo} from '../../src/shared/centavos-demo.mjs';

test('casa santana demo: simulacao isolada nao mistura valores externos', () => {
  const ficticio = [1000, 400, -250];
  assert.equal(somarCentavosDemo(ficticio), 1150);
});
test('casa santana demo: zero e despesas ficticias', () => {
  assert.equal(somarCentavosDemo([0, -500, 500]), 0);
});
test('casa santana demo: evita estouro negativo', () => {
  assert.throws(() => somarCentavosDemo([-Number.MAX_SAFE_INTEGER, -1]), RangeError);
});
test('casa santana demo: limita tipos de entrada', () => {
  for (const notArray of [null, undefined, 0, '10', {}]) {
    assert.throws(() => somarCentavosDemo(notArray), TypeError);
  }
});
test('casa santana demo: nao altera valor original', () => {
  const entradas = Object.freeze([300, -80, 40]);
  assert.equal(somarCentavosDemo(entradas), 260);
  assert.deepEqual(entradas, [300, -80, 40]);
});
