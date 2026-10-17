import test from 'node:test';
import assert from 'node:assert/strict';
import {somarCentavosDemo} from '../../src/shared/centavos-demo.mjs';
test('weine: pipeline publico isolado executa fixture inventada', () => {
  assert.equal(somarCentavosDemo([100, 25, -5]), 120);
});
