// Resumo limitado a contagens TAP de testes sinteticos PUBLICOS; nunca leia logs privados.
export const PUBLIC_CI_SUMMARY_VERSION = 'public-ci-summary/v1';

const FIELDS = Object.freeze(['tests', 'pass', 'fail', 'cancelled', 'skipped', 'todo']);
const LABELS = Object.freeze({
  security: 'Gate de publicacao - testes negativos',
  weine: 'Piloto weine - testes sinteticos',
  'casa-santana': 'Piloto casa-santana - testes sinteticos'
});

export function parsePublicTapSummary(source) {
  if (typeof source !== 'string' || source.length > 2_000_000) {
    throw new Error('PUBLIC_TAP_SIZE_OR_TYPE_INVALID');
  }
  const counts = Object.create(null);
  for (const line of source.split(/\r?\n/)) {
    const match = /^# (tests|pass|fail|cancelled|skipped|todo) ([0-9]+)$/.exec(line);
    if (!match) continue;
    const key = match[1];
    if (Object.hasOwn(counts, key)) throw new Error('PUBLIC_TAP_DUPLICATE_SUMMARY');
    const value = Number(match[2]);
    if (!Number.isSafeInteger(value) || value > 100000) {
      throw new Error('PUBLIC_TAP_INVALID_COUNT');
    }
    counts[key] = value;
  }
  if (FIELDS.some(key => !Object.hasOwn(counts, key)) || counts.tests < 1) {
    throw new Error('PUBLIC_TAP_MISSING_SUMMARY');
  }
  if (counts.pass + counts.fail + counts.cancelled + counts.skipped + counts.todo !== counts.tests) {
    throw new Error('PUBLIC_TAP_INCONSISTENT_COUNTS');
  }
  return Object.freeze(Object.fromEntries(FIELDS.map(key => [key, counts[key]])));
}

export function publicSuitePassed(summary, childExitCode) {
  if (!summary || !Number.isInteger(childExitCode)) return false;
  return childExitCode === 0 &&
    summary.tests > 0 &&
    summary.pass === summary.tests &&
    summary.fail === 0 &&
    summary.cancelled === 0 &&
    summary.skipped === 0 &&
    summary.todo === 0;
}

export function formatPublicStepSummary(suite, counts, passed) {
  if (!Object.hasOwn(LABELS, suite)) throw new Error('PUBLIC_SUITE_UNKNOWN');
  if (!counts || FIELDS.some(key => !Number.isSafeInteger(counts[key]) || counts[key] < 0)) {
    throw new Error('PUBLIC_SUITE_UNVERIFIED_COUNTS');
  }
  if (typeof passed !== 'boolean') throw new Error('PUBLIC_SUITE_INVALID_STATUS');
  // Apenas rotulos constantes e contagens inteiras. Nunca incluir stdout, stderr ou caminhos.
  return [
    '### ' + LABELS[suite],
    '',
    '| Resultado da suite | Testes | Passaram | Falharam | Cancelados | Ignorados | Pendentes |',
    '|---|---:|---:|---:|---:|---:|---:|',
    '| ' + (passed ? 'PASS' : 'FAIL') + ' | ' +
      FIELDS.map(key => counts[key]).join(' | ') + ' |',
    '',
    'Escopo: somente demonstracoes e testes publicos. Nao comprova L1/L2 privados, runtime Google nem E2E financeiro.',
    'O resultado integral do job tambem depende das outras etapas de seguranca.',
    ''
  ].join('\n');
}
