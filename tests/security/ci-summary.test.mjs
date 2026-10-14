import test from 'node:test';
import assert from 'node:assert/strict';
import {
  parsePublicTapSummary,
  publicSuitePassed,
  formatPublicStepSummary
} from '../../tools/public-ci-summary.mjs';

const good = () => [
  'TAP version 13', '# tests 3', '# suites 0', '# pass 3', '# fail 0',
  '# cancelled 0', '# skipped 0', '# todo 0', '# duration_ms 1.23'
].join('\n');

test('E-OBS.1: extrai apenas seis contagens numericas TAP', () => {
  const summary = parsePublicTapSummary(good());
  assert.deepEqual(summary, {
    tests: 3, pass: 3, fail: 0, cancelled: 0, skipped: 0, todo: 0
  });
});

test('E-OBS.1: uma suite de zero testes nunca pode passar', () => {
  assert.throws(() => parsePublicTapSummary(good().replace('# tests 3', '# tests 0')), /INCONSISTENT_COUNTS|MISSING_SUMMARY/);
});

test('E-OBS.1: contador ausente falha fechado', () => {
  assert.throws(() => parsePublicTapSummary(good().replace('# todo 0', '')), /MISSING_SUMMARY/);
});

test('E-OBS.1: contador duplicado nao e aceito', () => {
  assert.throws(() => parsePublicTapSummary(good() + '\n# pass 3'), /DUPLICATE_SUMMARY/);
});

test('E-OBS.1: inconsistencias de soma nao sao escondidas', () => {
  assert.throws(() => parsePublicTapSummary(good().replace('# pass 3', '# pass 2')), /INCONSISTENT_COUNTS/);
});

test('E-OBS.1: numeros excessivos ou invalidos sao recusados', () => {
  assert.throws(() => parsePublicTapSummary(good().replace('# tests 3', '# tests 100001')), /INVALID_COUNT/);
  assert.throws(() => parsePublicTapSummary(42), /SIZE_OR_TYPE_INVALID/);
});

test('E-OBS.1: saida zero so passa com 100 por cento dos casos aceitos', () => {
  const summary = parsePublicTapSummary(good());
  assert.equal(publicSuitePassed(summary, 0), true);
  assert.equal(publicSuitePassed(summary, 1), false);
  assert.equal(publicSuitePassed(undefined, 0), false);
  assert.equal(publicSuitePassed(summary, null), false);
});

test('E-OBS.1: um caso com skip jamais gera PASS sintentico', () => {
  const sample = good().replace('# pass 3', '# pass 2').replace('# skipped 0', '# skipped 1');
  const summary = parsePublicTapSummary(sample);
  assert.equal(publicSuitePassed(summary, 0), false);
});

test('E-OBS.1: resumo Markdown aceita somente rotulos predefinidos e numeros', () => {
  const summary = parsePublicTapSummary(good());
  const rendered = formatPublicStepSummary('weine', summary, true);
  assert.match(rendered, /Piloto weine/);
  assert.match(rendered, /\| PASS \| 3 \| 3 \| 0 \|/);
  assert.match(rendered, /nao comprova L1\/L2 privados/);
  assert.doesNotMatch(rendered, /TAP version|duration_ms|Subtest/);
});

test('E-OBS.1: nomes de suite nao autorizados sao recusados', () => {
  assert.throws(() => formatPublicStepSummary('../private', parsePublicTapSummary(good()), true), /PUBLIC_SUITE_UNKNOWN/);
});
