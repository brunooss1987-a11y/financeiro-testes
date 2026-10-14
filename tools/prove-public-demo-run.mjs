// Sintetico e PUBLICO: nao e executor para fontes privadas.
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { lstatSync, readFileSync, realpathSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkLocalContract } from './check-local-contract.mjs';

const ROOT = realpathSync(fileURLToPath(new URL('../', import.meta.url)));
const SOURCE_PATH = 'src/shared/centavos-demo.mjs';
const TEST_PATH = 'tests/weine/piloto.test.mjs';
const EXPECTED_IMPORT = "from '../../src/shared/centavos-demo.mjs'";

function digest(buffer) {
  return createHash('sha256').update(buffer).digest('hex');
}

function demoTestDigest() {
  const path = join(ROOT, TEST_PATH);
  const stat = lstatSync(path);
  if (!stat.isFile() || stat.isSymbolicLink() || stat.size > 131072) {
    throw new Error('PUBLIC_TEST_UNSAFE_FILE');
  }
  const bytes = readFileSync(path);
  if (!bytes.toString('utf8').includes(EXPECTED_IMPORT)) {
    throw new Error('PUBLIC_TEST_SOURCE_IMPORT_NOT_DECLARED');
  }
  return digest(bytes);
}

/**
 * Demonstrates a public test + bytes-before/after receipt, NOT an L1/L2 private attestation.
 * No arbitrary command/path arguments, no network code, no private inputs, no output artifacts.
 */
export function runPublicDemoEvidence() {
  const manifestUrl = new URL('../contracts/public-demo.json', import.meta.url);
  const manifestBefore = readFileSync(manifestUrl);
  const manifest = JSON.parse(manifestBefore.toString('utf8'));
  if (manifest.files?.length !== 1 || manifest.files[0]?.path !== SOURCE_PATH) {
    throw new Error('PUBLIC_DEMO_CONTRACT_NOT_PINNED');
  }
  const sourceBefore = checkLocalContract(manifest, { root: ROOT });
  const testBefore = demoTestDigest();
  const result = spawnSync(process.execPath, ['--test', TEST_PATH], {
    cwd: ROOT,
    shell: false,
    windowsHide: true,
    timeout: 15000,
    maxBuffer: 65536,
    encoding: 'utf8',
    env: {
      PATH: process.env.PATH || '',
      HOME: process.env.HOME || '',
      TMPDIR: process.env.TMPDIR || '',
      CI: 'true',
      NODE_OPTIONS: ''
    }
  });
  const sourceAfter = checkLocalContract(manifest, { root: ROOT });
  const manifestAfter = readFileSync(manifestUrl);
  const testAfter = demoTestDigest();
  if (testBefore !== testAfter || digest(manifestBefore) !== digest(manifestAfter) || sourceBefore.status !== sourceAfter.status) {
    throw new Error('PUBLIC_DEMO_CHANGED_DURING_TEST');
  }
  if (result.error || typeof result.status !== 'number') {
    throw new Error('PUBLIC_DEMO_RUN_UNVERIFIED');
  }

  return Object.freeze({
    schema: 'public-demo-run/v1',
    scope: 'public-demo',
    status: result.status === 0 ? 'PUBLIC_DEMO_TEST_PASS' : 'PUBLIC_DEMO_TEST_FAILED',
    sourceSha256: manifest.files[0].sha256,
    testSha256: testAfter,
    testExitCode: result.status,
    declaredImportPresent: true,
    publicBytesStable: true,
    actualDependenciesBound: false,
    isolatedGuestVerified: false,
    privateL1Verified: false,
    privateL2Verified: false,
    remoteRuntimeVerified: false,
    financialE2EVerified: false
  });
}
