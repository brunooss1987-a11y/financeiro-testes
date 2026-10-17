import test from 'node:test';
import assert from 'node:assert/strict';
import { runPublicDemoEvidence } from '../../tools/prove-public-demo-run.mjs';

test('weine: comprovante publico liga bytes e exit code de teste ficticio', () => {
  const proof = runPublicDemoEvidence();
  assert.equal(proof.schema, 'public-demo-run/v1');
  assert.equal(proof.scope, 'public-demo');
  assert.equal(proof.status, 'PUBLIC_DEMO_TEST_PASS');
  assert.equal(proof.testExitCode, 0);
  assert.equal(proof.publicBytesStable, true);
  assert.match(proof.sourceSha256, /^[a-f0-9]{64}$/);
  assert.match(proof.testSha256, /^[a-f0-9]{64}$/);
  console.log('PUBLIC_DEMO_RUN_RECEIPT=PASS; PRIVATE_ATTESTATION=NOT_CLAIMED');
});
