// Contrato PUBLICO da area comum; sem valores reais.
import test from 'node:test';
import assert from 'node:assert/strict';
import { lerCentavosPtBr, formatarCentavosPtBr } from '../src/index.mjs';
import * as legacy from '../../src/shared/moeda-ptbr.mjs';

test('T3 comum: API exporta o mesmo contrato publico durante transicao', () => {
  assert.strictEqual(lerCentavosPtBr, legacy.lerCentavosPtBr);
  assert.strictEqual(formatarCentavosPtBr, legacy.formatarCentavosPtBr);
});
test('T3 comum: round-trip estrito com amostra sintetica', () => {
  assert.equal(lerCentavosPtBr('R$ 1.234,56'), 123456);
  assert.equal(formatarCentavosPtBr(-105), '-R$ 1,05');
});
