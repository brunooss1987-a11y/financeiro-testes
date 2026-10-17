// Fixtures ficticias e independentes; NAO homologa a planilha Casa Santana.
import test from 'node:test';
import assert from 'node:assert/strict';
import { lerCentavosPtBr, formatarCentavosPtBr } from '../src/index.mjs';

test('E-COM.1 Casa Santana: recibos ficticios com centavos preservados', () => {
  const exemplos = ['R$ 29,90', 'R$ 4,00', 'R$ 1.500,05', '-R$ 10,50'];
  const valores = [2990, 400, 150005, -1050];
  assert.deepEqual(exemplos.map(lerCentavosPtBr), valores);
  assert.deepEqual(valores.map(formatarCentavosPtBr), exemplos);
});

test('E-COM.1 Casa Santana: round-trip de valores seguros nas bordas', () => {
  const valores = [
    Number.MIN_SAFE_INTEGER, -100000000, -101, -100, -1,
    0, 1, 5, 100, 101, 100000000, Number.MAX_SAFE_INTEGER
  ];
  for (const centavos of valores) {
    assert.equal(lerCentavosPtBr(formatarCentavosPtBr(centavos)), centavos);
  }
});

test('E-COM.1 Casa Santana: rejeita moeda estrangeira e formatos permissivos', () => {
  for (const texto of [
    '$ 10,00', 'USD 10,00', '10.00', '1,000.00',
    '(10,00)', '1.000,0', '1,0', 'R$\t1,00',
    'R$ 1.00', 'R$ -1,00', ' 0,00', '0,00\n'
  ]) {
    assert.throws(() => lerCentavosPtBr(texto), TypeError);
  }
});

test('E-COM.1 Casa Santana: normaliza sinal do zero e respeita centavos negativos', () => {
  assert.equal(lerCentavosPtBr('-R$ 0,00'), 0);
  assert.equal(formatarCentavosPtBr(-0), 'R$ 0,00');
  assert.equal(formatarCentavosPtBr(-100), '-R$ 1,00');
});

test('E-COM.1 Casa Santana: soma demo continua separada do contrato novo', async () => {
  const { somarCentavosDemo } = await import('../../src/shared/centavos-demo.mjs');
  const parcelas = ['R$ 29,90', 'R$ 4,00', '-R$ 1,05'].map(lerCentavosPtBr);
  assert.equal(somarCentavosDemo(parcelas), 3285);
});
