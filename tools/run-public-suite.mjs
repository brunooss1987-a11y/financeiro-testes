// Executa SOMENTE uma das 3 suites sinteticas publicas autorizadas.
// Este runner nao aceita comandos, caminhos ou argumentos de teste arbitrarios.
import { spawnSync } from 'node:child_process';
import { appendFileSync, lstatSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { formatPublicStepSummary, parsePublicTapSummary, publicSuitePassed } from './public-ci-summary.mjs';

const PATHS = Object.freeze({
  security: join('tests', 'security'),
  weine: join('weine', 'tests'),
  'casa-santana': join('casa-santana', 'tests')
});
const ALLOWED = new Set(Object.keys(PATHS));
const root = fileURLToPath(new URL('../', import.meta.url));
const suite = process.argv[2];

if (process.argv.length !== 3 || !ALLOWED.has(suite)) {
  console.error('PUBLIC_SUITE_INVALID_ARGUMENT');
  process.exitCode = 2;
} else {
  const relativeDirectory = PATHS[suite];
  const directory = join(root, relativeDirectory);
  let files = [];
  let discovered = false;
  try {
    const rootDirectory = lstatSync(directory);
    if (!rootDirectory.isDirectory() || rootDirectory.isSymbolicLink()) throw new Error('PUBLIC_SUITE_UNSAFE_DIRECTORY');
    files = readdirSync(directory).filter(name => name.endsWith('.test.mjs')).sort();
    if (files.length < 1 || files.length > 40) throw new Error('PUBLIC_SUITE_FILE_COUNT_INVALID');
    for (const name of files) {
      if (!/^[a-z0-9][a-z0-9_-]*\.test\.mjs$/.test(name)) throw new Error('PUBLIC_SUITE_UNSAFE_FILENAME');
      const state = lstatSync(join(directory, name));
      if (!state.isFile() || state.isSymbolicLink()) throw new Error('PUBLIC_SUITE_UNSAFE_FILE');
    }
    discovered = true;
  } catch (error) {
    console.error('PUBLIC_SUITE_DISCOVERY_FAILED: ' + error.message);
    process.exitCode = 1;
  }
  if (discovered) {
    const args = ['--test', '--test-reporter=tap', ...files.map(name => join(relativeDirectory, name))];
    const child = spawnSync(process.execPath, args, {
      cwd: root,
      shell: false,
      windowsHide: true,
      encoding: 'utf8',
      timeout: 240000,
      maxBuffer: 2_000_000
    });
    if (child.stdout) process.stdout.write(child.stdout);
    if (child.stderr) process.stderr.write(child.stderr);

    let counts;
    let parseError = null;
    try {
      counts = parsePublicTapSummary(child.stdout);
    } catch (error) {
      parseError = error.message;
      console.error('PUBLIC_CI_SUMMARY_UNVERIFIED: ' + parseError);
    }

    const passed = !child.error && !child.signal &&
      publicSuitePassed(counts, child.status);
    let summaryWritten = true;
    // O arquivo de resumo pertence ao proprio GitHub Actions. Sem upload de logs.
    if (process.env.GITHUB_STEP_SUMMARY) {
      try {
        if (counts) {
          appendFileSync(process.env.GITHUB_STEP_SUMMARY,
            formatPublicStepSummary(suite, counts, passed), 'utf8');
        } else {
          // Texto estritamente constante; nunca registrar saida bruta de teste.
          appendFileSync(process.env.GITHUB_STEP_SUMMARY,
            '### Testes publicos - resultado nao verificado\n\nFAIL: resumo TAP ausente ou invalido. Conferir o job.\n', 'utf8');
        }
      } catch {
        summaryWritten = false;
        console.error('PUBLIC_CI_STEP_SUMMARY_WRITE_FAILED');
      }
    }

    if (passed && summaryWritten) {
      console.log('PUBLIC_CI_SUMMARY=PASS suite=' + suite +
        ' tests=' + counts.tests + ' pass=' + counts.pass + ' fail=' + counts.fail);
    } else {
      console.error('PUBLIC_CI_SUMMARY=FAIL suite=' + suite +
        ' reason=' + (parseError || (child.error ? 'CHILD_ERROR' : 'TEST_OR_REPORT_FAILURE')));
      process.exitCode = 1;
    }
  }
}
