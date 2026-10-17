// Ponte de homologacao T3: as novas suites publicas sao executadas pelo gate
// ANTES da migracao do runner oficial (T4). Somente arquivos fixos e sinteticos.
import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { lstatSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../../', import.meta.url));
const suites = ['weine', 'casa-santana'];
const files = suites.flatMap(area => [
  'contrato-integridade.test.mjs',
  'limites-sinteticos.test.mjs',
  'moeda-ptbr.test.mjs',
  'piloto.test.mjs',
  'prova-publica-execucao.test.mjs'
].map(name => join(area, 'tests', name)));
files.push(join('comum', 'tests', 'moeda-ptbr.test.mjs'));

test('E-ARQ T3: as tres areas executam 37 casos publicos sem substituir suite v1', () => {
  for (const file of files) {
    const stat = lstatSync(join(root, file));
    assert.ok(stat.isFile() && !stat.isSymbolicLink(), 'Arquivo publico ausente ou inseguro');
  }
  const run = spawnSync(process.execPath, ['--test', '--test-reporter=tap', ...files], {
    cwd: root,
    encoding: 'utf8',
    shell: false,
    windowsHide: true,
    timeout: 90000,
    maxBuffer: 2_000_000,
    // O test runner Node injeta NODE_TEST_CONTEXT no processo atual.
    // Nao herdamos essa variavel nem segredos/ambiente de GitHub no filho:
    // o node --test precisa funcionar como CLI autonoma, com stdout TAP.
    env: {
      PATH: process.env.PATH || '',
      HOME: process.env.HOME || '',
      TMPDIR: process.env.TMPDIR || '',
      CI: 'true',
      NODE_OPTIONS: ''
    }
  });
  assert.equal(run.error, undefined, 'Execucao da estrutura falhou');
  assert.equal(run.signal, null, 'Execucao da estrutura interrompida');
  assert.equal(run.status, 0, 'Novas areas precisam passar todos os testes');
  assert.match(run.stdout, /# tests 37(?:\r?\n|$)/u, 'Contagem das areas inesperada');
  assert.match(run.stdout, /# pass 37(?:\r?\n|$)/u, 'Algum teste publico nao passou');
  assert.match(run.stdout, /# fail 0(?:\r?\n|$)/u, 'Falhas nao podem ser ignoradas');
});
