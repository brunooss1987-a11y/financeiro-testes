import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { checkLocalContract } from '../../tools/check-local-contract.mjs';

const root = fileURLToPath(new URL('../../', import.meta.url));
const fixture = JSON.parse(readFileSync(new URL('../../contracts/public-demo.json', import.meta.url), 'utf8'));
const sample = () => structuredClone(fixture);

test('weine: integridade dos bytes do exemplo publico', () => {
  const proof = checkLocalContract(sample(), { root });
  assert.equal(proof.status, 'LOCAL_BYTES_MATCH');
  assert.deepEqual(proof.verifiedPaths, ['src/shared/centavos-demo.mjs']);
});
test('weine: bytes divergentes sao bloqueados', () => {
  const candidate = sample();
  candidate.files[0].sha256 = '0'.repeat(64);
  assert.throws(() => checkLocalContract(candidate, { root }), /LOCAL_HASH_MISMATCH/);
});
test('weine: travessia de pastas e recusada', () => {
  const candidate = sample();
  candidate.files[0].path = 'src/shared/../../.env';
  assert.throws(() => checkLocalContract(candidate, { root }), /Unsafe file path/);
});
test('weine: arquivo ausente nao pode ser validado', () => {
  const candidate = sample();
  candidate.files[0].path = 'src/shared/ausente.mjs';
  assert.throws(() => checkLocalContract(candidate, { root }), /ENOENT/);
});
test('weine: integridade nao comprova motor privado nem E2E', () => {
  const proof = checkLocalContract(sample(), { root });
  assert.equal(proof.provesTestExecution, false);
  assert.equal(proof.provesPrivateSourceIdentity, false);
  assert.equal(proof.provesFinancialE2E, false);
});
