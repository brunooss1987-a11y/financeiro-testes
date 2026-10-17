import test from 'node:test';
import assert from 'node:assert/strict';
import {somarCentavosDemo} from '../../src/shared/centavos-demo.mjs';
test('casa-santana: pipeline publico isolado executa fixture inventada', () => {
  assert.equal(somarCentavosDemo([300, -80, 40]), 260);
});
