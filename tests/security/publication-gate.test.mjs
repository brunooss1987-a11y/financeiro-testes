import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { assertPublicationFile, MAX_PUBLIC_FILE_BYTES } from '../../tools/publication-guard-core.mjs';

// Todos os artefatos sao FICTICIOS e vivem somente em diretorios temporarios.
function withTemporaryRoot(run) {
  const root = mkdtempSync(join(tmpdir(), 'public-gate-test-'));
  try {
    return run(root);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

function fixture(root, name, body = 'conteudo demonstrativo sem dados reais') {
  const path = join(root, ...name.split('/'));
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, body);
  return path;
}

test('gate: permite arquivo publico pequeno e aninhado', () => {
  withTemporaryRoot(root => {
    fixture(root, 'docs/public-note.md');
    assert.equal(assertPublicationFile('docs/public-note.md', { root }), true);
  });
});

test('gate: bloqueia formatos e nomes proibidos', () => {
  withTemporaryRoot(root => {
    const names = [
      '.env', 'nested/.env.local', 'credentials.json', '.clasprc.json',
      '.clasp.json', '.clasp.production.json', 'service-account-example.json',
      'export/demo.csv', 'report.pdf', 'sheet.xlsx', 'database.sqlite', 'private.pem'
    ];
    for (const name of names) {
      assert.throws(() => assertPublicationFile(name, { root }), /Arquivo proibido/, name);
    }
  });
});

test('gate: bloqueia todas as familias de dados sensiveis sinteticos', () => {
  withTemporaryRoot(root => {
    // Construir valores em tempo de teste evita armazenar credenciais ou
    // cadeias completas que possam se parecer com dados reais neste repositorio.
    const samples = [
      ['Segredo OAuth Google', 'GOCSPX-' + 'x'.repeat(20)],
      ['Chave API Google', 'AIza' + 'A'.repeat(35)],
      ['Token GitHub', 'ghp_' + 'b'.repeat(24)],
      ['Token GitHub', 'github_pat_' + 'x'.repeat(26)],
      ['Chave privada', '-----BEGIN ' + 'PRIVATE KEY-----'],
      ['URL planilha real', ['https://', 'docs.google.com', '/spreadsheets/d/', 'X'.repeat(25)].join('')],
      ['CPF formatado', ['123', '456', '789'].join('.') + '-00']
    ];
    for (const [label, synthetic] of samples) {
      fixture(root, 'docs/sample.txt', synthetic);
      assert.throws(() => assertPublicationFile('docs/sample.txt', { root }), new RegExp(label), label);
    }
  });
});

test('gate: nao classifica fragmentos benignos como segredos completos', () => {
  withTemporaryRoot(root => {
    fixture(root, 'docs/benign.txt', 'exemplo ficticio curto: ghp_' + 'x'.repeat(3));
    assert.equal(assertPublicationFile('docs/benign.txt', { root }), true);
  });
});

test('gate: bloqueia escapes e caminhos inseguros antes da leitura', () => {
  withTemporaryRoot(root => {
    const names = ['../outside.txt', 'docs/../note.md', './note.md', '/tmp/note.md', 'docs//note.md', 'docs\\note.md'];
    for (const name of names) {
      assert.throws(() => assertPublicationFile(name, { root }), /Caminho inseguro/, name);
    }
  });
});

test('gate: bloqueia arquivo ausente e destino que seja diretorio', () => {
  withTemporaryRoot(root => {
    assert.throws(() => assertPublicationFile('absent.txt', { root }), /Arquivo versionado ausente/);
    mkdirSync(join(root, 'empty'));
    assert.throws(() => assertPublicationFile('empty', { root }), /Arquivo inesperado/);
  });
});

test('gate: bloqueia arquivo acima do limite de tamanho', () => {
  withTemporaryRoot(root => {
    fixture(root, 'oversize.txt', Buffer.alloc(MAX_PUBLIC_FILE_BYTES + 1, 65));
    assert.throws(() => assertPublicationFile('oversize.txt', { root }), /Arquivo inesperado/);
  });
});

test('gate: bloqueia link simbolico para arquivo, mesmo interno', () => {
  withTemporaryRoot(root => {
    fixture(root, 'data/target.txt');
    symlinkSync(join(root, 'data', 'target.txt'), join(root, 'linked.txt'));
    assert.throws(() => assertPublicationFile('linked.txt', { root }), /Link simbolico proibido/);
  });
});

test('gate: bloqueia diretorio pai simbolico', () => {
  withTemporaryRoot(root => {
    fixture(root, 'data/target.txt');
    symlinkSync(join(root, 'data'), join(root, 'alias'), 'dir');
    assert.throws(() => assertPublicationFile('alias/target.txt', { root }), /Link simbolico proibido/);
  });
});

test('gate: exige diretorio raiz explicito', () => {
  assert.throws(() => assertPublicationFile('docs/file.md'), /Raiz explicita obrigatoria/);
});
