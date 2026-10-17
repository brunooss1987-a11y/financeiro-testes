import test from 'node:test';
import assert from 'node:assert/strict';
import { runPublicDemoEvidence } from '../../tools/prove-public-demo-run.mjs';

test('casa santana: comprovante sintetico falha fechado para alegacoes privadas', () => {
  const proof = runPublicDemoEvidence();
  assert.equal(proof.status, 'PUBLIC_DEMO_TEST_PASS');
  assert.equal(proof.declaredImportPresent, true);
  assert.equal(proof.actualDependenciesBound, false);
  assert.equal(proof.isolatedGuestVerified, false);
  assert.equal(proof.privateL1Verified, false);
  assert.equal(proof.privateL2Verified, false);
  assert.equal(proof.remoteRuntimeVerified, false);
  assert.equal(proof.financialE2EVerified, false);
});
