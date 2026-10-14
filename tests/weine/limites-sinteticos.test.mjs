// Dados inteiramente sinteticos. Nao verifica o motor financeiro privado Weine.
import test from 'node:test';
import assert from 'node:assert/strict';
import {somarCentavosDemo} from '../../src/shared/centavos-demo.mjs';

test('weine demo: uma lista vazia soma zero', () => {
  assert.equal(somarCentavosDemo([]), 0);
});
test('weine demo: entradas e saidas inteiras em centavos', () => {
  assert.equal(somarCentavosDemo([10000, -2500, -125, 50]), 7425);
});
test('weine demo: valores negativos sao preservados', () => {
  assert.equal(somarCentavosDemo([-100, -25]), -125);
});
test('weine demo: rejeita valor fracionario ou nao numerico', () => {
  for (const value of [0.01, NaN, Infinity, '25', null, undefined]) {
    assert.throws(() => somarCentavosDemo([value]), TypeError);
  }
});
test('weine demo: rejeita estouro de inteiro seguro', () => {
  assert.throws(() => somarCentavosDemo([Number.MAX_SAFE_INTEGER, 1]), RangeError);
});
test('weine demo: preserva array de entrada', () => {
  const entries = Object.freeze([100, -30, 12]);
  assert.equal(somarCentavosDemo(entries), 82);
  assert.deepEqual(entries, [100, -30, 12]);
});
