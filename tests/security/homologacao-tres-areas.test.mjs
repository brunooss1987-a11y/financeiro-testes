// Homologacao PUBLICA E-ARQ T5: tres areas, fronteiras, v1 e CI.
// Nao abre repositorios privados, nao consulta Sheets e nao aceita caminhos livres.
import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { lstatSync, readFileSync, readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkLocalContract } from '../../tools/check-local-contract.mjs';

const ROOT = fileURLToPath(new URL('../../', import.meta.url));
const at = (path) => join(ROOT, path);
const txt = (path) => readFileSync(at(path), 'utf8');
const sha256 = (buf) => createHash('sha256').update(buf).digest('hex');
const AREAS = Object.freeze(['weine', 'casa-santana', 'comum']);
const FIXTURES = Object.freeze([
  'contrato-integridade.test.mjs',
  'limites-sinteticos.test.mjs',
  'moeda-ptbr.test.mjs',
  'piloto.test.mjs',
  'prova-publica-execucao.test.mjs'
]);
const isRegular = (path) => {
  const s = lstatSync(at(path));
  assert.ok(s.isFile() && !s.isSymbolicLink(), 'Public file absent or symlink');
};

test('T5: tres areas reais com codigo e suites separadas, sem symlinks', () => {
  for (const area of AREAS) {
    const root = lstatSync(at(area));
    assert.ok(root.isDirectory() && !root.isSymbolicLink());
    const testsDir = lstatSync(at(join(area, 'tests')));
    assert.ok(testsDir.isDirectory() && !testsDir.isSymbolicLink());
    isRegular(join(area, 'README.md'));
    isRegular(join(area, 'src', 'index.mjs'));
    const actual = readdirSync(at(join(area, 'tests'))).filter(f => f.endsWith('.test.mjs')).sort();
    const expected = area === 'comum' ? ['moeda-ptbr.test.mjs'] : FIXTURES;
    assert.deepEqual(actual, [...expected].sort(), 'Unexpected project test files');
    for (const filename of actual) isRegular(join(area, 'tests', filename));
  }
});

test('T5: fronteiras independentes e biblioteca comum com mesma API publica', async () => {
  const sourceWeine = txt('weine/src/index.mjs');
  const sourceCasa = txt('casa-santana/src/index.mjs');
  const sourceComum = txt('comum/src/index.mjs');
  assert.match(sourceWeine, /comum\/src\/index\.mjs/u);
  assert.match(sourceCasa, /comum\/src\/index\.mjs/u);
  assert.match(sourceComum, /src\/shared\/moeda-ptbr\.mjs/u);
  assert.doesNotMatch(sourceWeine, /casa-santana\/src/u, 'Weine must not depend on Casa source');
  assert.doesNotMatch(sourceCasa, /weine\/src/u, 'Casa must not depend on Weine source');
  const [weine, casa, comum, legacy] = await Promise.all([
    import('../../weine/src/index.mjs'),
    import('../../casa-santana/src/index.mjs'),
    import('../../comum/src/index.mjs'),
    import('../../src/shared/moeda-ptbr.mjs')
  ]);
  for (const api of [weine, casa, comum]) {
    assert.strictEqual(api.lerCentavosPtBr, legacy.lerCentavosPtBr);
    assert.strictEqual(api.formatarCentavosPtBr, legacy.formatarCentavosPtBr);
    assert.equal(api.lerCentavosPtBr('R$ 1.234,56'), 123456);
    assert.equal(api.formatarCentavosPtBr(123456), 'R$ 1.234,56');
  }
});

test('T5: runner mapeia apenas suites autorizadas e rejeita traversal', () => {
  const source = txt('tools/run-public-suite.mjs');
  assert.match(source, /security:\s*join\('tests', 'security'\)/u);
  assert.match(source, /weine:\s*join\('weine', 'tests'\)/u);
  assert.match(source, /'casa-santana':\s*join\('casa-santana', 'tests'\)/u);
  assert.match(source, /ALLOWED\.has\(suite\)/u);
  assert.match(source, /PUBLIC_SUITE_UNSAFE_DIRECTORY/u);
  const common = {
    cwd: ROOT, encoding: 'utf8', shell: false, windowsHide: true,
    timeout: 10000, maxBuffer: 65536,
    env: {
      PATH: process.env.PATH || '',
      HOME: process.env.HOME || '',
      TMPDIR: process.env.TMPDIR || '',
      CI: 'true',
      NODE_OPTIONS: ''
    }
  };
  for (const args of [
    ['../../src/shared'], ['comum'], ['weine', '../../hidden'], ['../weine']
  ]) {
    const child = spawnSync(process.execPath, ['tools/run-public-suite.mjs', ...args], common);
    assert.equal(child.error, undefined);
    assert.equal(child.status, 2);
    assert.match(child.stderr, /PUBLIC_SUITE_INVALID_ARGUMENT/u);
  }
});

test('T5: manifesto v1, bytes hashados e comprovante antigo intactos', () => {
  const manifest = JSON.parse(txt('contracts/public-demo.json'));
  assert.equal(manifest.schema, 'local-integrity/v1');
  assert.equal(manifest.scope, 'public-demo');
  assert.equal(manifest.files.length, 1);
  assert.equal(manifest.files[0].path, 'src/shared/centavos-demo.mjs');
  const actual = sha256(readFileSync(at(manifest.files[0].path)));
  assert.equal(actual, manifest.files[0].sha256);
  const proof = checkLocalContract(manifest, { root: ROOT });
  assert.equal(proof.status, 'LOCAL_BYTES_MATCH');
  assert.equal(proof.provesFinancialE2E, false);
  isRegular('tests/weine/piloto.test.mjs');
  const receipt = txt('tools/prove-public-demo-run.mjs');
  assert.match(receipt, /TEST_PATH = 'tests\/weine\/piloto\.test\.mjs'/u);
  assert.match(receipt, /SOURCE_PATH = 'src\/shared\/centavos-demo\.mjs'/u);
});

test('T5: CI e comandos preservam gates, regressoes e proprietarios', () => {
  const workflow = txt('.github/workflows/ci.yml');
  const scripts = JSON.parse(txt('package.json')).scripts;
  const owners = txt('.github/CODEOWNERS');
  assert.match(workflow, /^permissions:\s*\n\s+contents: read$/mu);
  assert.match(workflow, /actions\/checkout@[0-9a-f]{40}/u);
  assert.match(workflow, /name: Gate de publicacao/u);
  assert.match(workflow, /name: Piloto \$\{\{ matrix\.suite \}\}/u);
  assert.match(workflow, /needs: security/u);
  for (const action of [
    'node tools/run-public-suite.mjs security',
    'npm run test:legacy', 'npm run test:comum',
    'node tools/check-publication.mjs'
  ]) assert.ok(workflow.includes(action), 'Required gate command absent');
  for (const suite of ['weine', 'casa-santana']) {
    assert.ok(workflow.includes(suite), 'Expected CI suite missing');
    assert.ok(scripts.test.includes(join(suite, 'tests')), 'npm aggregate missing area');
  }
  assert.ok(scripts.test.includes(join('comum', 'tests')));
  assert.ok(scripts['test:legacy'].includes('tests/weine/'));
  assert.ok(scripts['test:legacy'].includes('tests/casa-santana/'));
  for (const area of AREAS) {
    assert.ok(owners.split(/\r?\n/u).some(line => line.startsWith(area + '/ ')), 'Area ownership missing');
  }
});
