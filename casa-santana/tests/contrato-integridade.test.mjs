import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { checkLocalContract } from '../../tools/check-local-contract.mjs';

const root = fileURLToPath(new URL('../../', import.meta.url));
const fixture = JSON.parse(readFileSync(new URL('../../contracts/public-demo.json', import.meta.url), 'utf8'));
const sample = () => structuredClone(fixture);

test('casa santana: mesmos bytes demonstrativos em verificacao independente', () => {
  assert.equal(checkLocalContract(sample(), { root }).status, 'LOCAL_BYTES_MATCH');
});
test('casa santana: manifesto nao aceita campos adicionais', () => {
  const candidate = sample();
  candidate.secret = 'synthetic';
  assert.throws(() => checkLocalContract(candidate, { root }), /unexpected or missing fields/);
});
test('casa santana: caminhos fora da area publica sao proibidos', () => {
  const candidate = sample();
  candidate.files[0].path = 'private/financial-system.mjs';
  assert.throws(() => checkLocalContract(candidate, { root }), /Only public/);
});
test('casa santana: nao permite registro duplicado', () => {
  const candidate = sample();
  candidate.files.push({ ...candidate.files[0] });
  assert.throws(() => checkLocalContract(candidate, { root }), /Duplicate file entry/);
});
test('casa santana: contrato nao pode afirmar identidade de motor real', () => {
  const proof = checkLocalContract(sample(), { root });
  assert.equal(proof.provesPrivateSourceIdentity, false);
  assert.equal(proof.provesFinancialE2E, false);
});
