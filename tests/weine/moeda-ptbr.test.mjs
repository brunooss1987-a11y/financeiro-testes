// Testes publicos com valores INVENTADOS; sem acesso a formulas ou lancamentos reais.
import test from 'node:test';
import assert from 'node:assert/strict';
import { lerCentavosPtBr, formatarCentavosPtBr } from '../../src/shared/moeda-ptbr.mjs';

test('E-COM.1 Weine: parses BRL com e sem separador de milhar', () => {
  for (const [texto, valor] of [
    ['R$ 1.234,56', 123456],
    ['1.234,56', 123456],
    ['1234,56', 123456],
    ['12,00', 1200],
    ['0,01', 1],
    ['-R$ 10,25', -1025],
    ['-0,00', 0]
  ]) {
    assert.equal(lerCentavosPtBr(texto), valor, texto);
  }
  assert.equal(Object.is(lerCentavosPtBr('-0,00'), -0), false);
});

test('E-COM.1 Weine: formatacao canonica sem perda de centavos', () => {
  for (const [valor, texto] of [
    [0, 'R$ 0,00'],
    [1, 'R$ 0,01'],
    [-1, '-R$ 0,01'],
    [123456, 'R$ 1.234,56'],
    [-1200000, '-R$ 12.000,00'],
    [Number.MAX_SAFE_INTEGER, 'R$ 90.071.992.547.409,91'],
    [Number.MIN_SAFE_INTEGER, '-R$ 90.071.992.547.409,91']
  ]) {
    assert.equal(formatarCentavosPtBr(valor), texto, String(valor));
    assert.equal(lerCentavosPtBr(texto), valor);
  }
});

test('E-COM.1 Weine: rejeita agrupamento invalido, ambiguo e arredondamento implicito', () => {
  for (const texto of [
    '', '1', '1.234', '1.234,5', '1.234,567', '01,00',
    '1.23,00', '1.2345,00', '1.23.456,00',
    'R$1,00', 'R$  1,00', ' 1,00', '1,00 ', '1,00\n',
    '1 234,00', '+1,00', '--1,00', '1,005', '1.23'
  ]) {
    assert.throws(() => lerCentavosPtBr(texto), TypeError, JSON.stringify(texto));
  }
});

test('E-COM.1 Weine: nao arredonda inteiros inseguros', () => {
  assert.equal(lerCentavosPtBr('90.071.992.547.409,91'), Number.MAX_SAFE_INTEGER);
  assert.throws(() => lerCentavosPtBr('90.071.992.547.409,92'), RangeError);
  assert.throws(() => lerCentavosPtBr('-90.071.992.547.409,92'), RangeError);
  assert.throws(() => lerCentavosPtBr('9'.repeat(65) + ',00'), RangeError);
});

test('E-COM.1 Weine: tipos nao suportados falham explicitamente', () => {
  for (const invalido of [null, undefined, 1, 0.01, {}, [], true, 1n]) {
    assert.throws(() => lerCentavosPtBr(invalido), TypeError);
  }
  for (const invalido of [0.01, NaN, Infinity, '100', null, 1n]) {
    assert.throws(() => formatarCentavosPtBr(invalido), TypeError);
  }
  assert.throws(() => formatarCentavosPtBr(Number.MAX_SAFE_INTEGER + 1), RangeError);
  assert.throws(() => formatarCentavosPtBr(Number.MIN_SAFE_INTEGER - 1), RangeError);
});
