// Dados inteiramente sinteticos. Nao verifica o motor financeiro privado Casa Santana.
import test from 'node:test';
import assert from 'node:assert/strict';
import {somarCentavosDemo} from '../../src/shared/centavos-demo.mjs';

test('casa santana demo: simulacao isolada nao mistura valores externos', () => {
  const ficticio = [1000, 400, -250];
  assert.equal(somarCentavosDemo(ficticio), 1150);
});
test('casa santana demo: zero e despesas ficticias', () => {
  assert.equal(somarCentavosDemo([0, -500, 500]), 0);
});
test('casa santana demo: evita estouro negativo', () => {
  assert.throws(() => somarCentavosDemo([-Number.MAX_SAFE_INTEGER, -1]), RangeError);
});
test('casa santana demo: limita tipos de entrada', () => {
  for (const notArray of [null, undefined, 0, '10', {}]) {
    assert.throws(() => somarCentavosDemo(notArray), TypeError);
  }
});
test('casa santana demo: nao altera valor original', () => {
  const entradas = Object.freeze([300, -80, 40]);
  assert.equal(somarCentavosDemo(entradas), 260);
  assert.deepEqual(entradas, [300, -80, 40]);
});

/**
 * CS-PUB.1: demonstracoes originais, sem dados reais e sem acesso externo.
 * A lista de cinco arquivos desta area permanece inalterada (contrato T5).
 */
import { conciliarRemuneracaoFicticia as conciliar } from '../src/conciliacao-remuneracao-ficticia.mjs';

const obrigacao = (campos = {}) => ({
  id: 'folha-a', pessoa: 'pessoa-a', competencia: '2026-11',
  valorCentavos: 10000, ...campos
});
const pagamento = (campos = {}) => ({
  id: 'caixa-a', pessoa: 'pessoa-a', dataCaixa: '2026-12-05',
  valorCentavos: 3000, tipo: 'QUITACAO', natureza: 'LIQUIDACAO',
  confirmado: true, ...campos
});
const alocacao = (campos = {}) => ({
  id: 'vinculo-a', obrigacaoId: 'folha-a', pagamentoId: 'caixa-a',
  valorCentavos: 3000, ...campos
});
const simular = (obrigacoes, pagamentos, alocacoes) =>
  conciliar({ obrigacoes, pagamentos, alocacoes });

test('CS-PUB.1 — sem fatos nao inventa despesa ou caixa', () => {
  const r = simular([], [], []);
  assert.equal(r.ok, true);
  assert.deepEqual(r.obrigacoes, []);
  assert.deepEqual(r.pagamentos, []);
  assert.equal(r.escritaRealizada, false);
});

test('CS-PUB.1 — saldo integral pendente', () => {
  const r = simular([obrigacao()], [], []);
  assert.equal(r.obrigacoes[0].situacao, 'PENDENTE');
  assert.equal(r.obrigacoes[0].saldoCentavos, 10000);
});

test('CS-PUB.1 — pagamento parcial precisa de vinculo explicito', () => {
  const r = simular([obrigacao()], [pagamento()], [alocacao()]);
  assert.equal(r.ok, true);
  assert.equal(r.obrigacoes[0].pagoCentavos, 3000);
  assert.equal(r.obrigacoes[0].saldoCentavos, 7000);
  assert.equal(r.obrigacoes[0].situacao, 'PARCIAL');
});

test('CS-PUB.1 — duas baixas quitam a mesma obrigacao sem segunda despesa', () => {
  const r = simular([obrigacao()], [
    pagamento(), pagamento({ id: 'caixa-b', valorCentavos: 7000 })
  ], [alocacao(), alocacao({
    id: 'vinculo-b', pagamentoId: 'caixa-b', valorCentavos: 7000
  })]);
  assert.equal(r.ok, true);
  assert.equal(r.obrigacoes.length, 1);
  assert.equal(r.obrigacoes[0].situacao, 'QUITADO');
});

test('CS-PUB.1 — data de caixa posterior nao troca competencia do servico', () => {
  const r = simular([obrigacao()], [pagamento()], [alocacao()]);
  assert.equal(r.obrigacoes[0].competencia, '2026-11');
  assert.equal(r.pagamentos[0].dataCaixa, '2026-12-05');
});

test('CS-PUB.1 — adiantamento sem alocacao nao liquida salario', () => {
  const r = simular([obrigacao()], [
    pagamento({ tipo: 'ANTECIPACAO', natureza: 'PATRIMONIAL' })
  ], []);
  assert.equal(r.obrigacoes[0].situacao, 'PENDENTE');
  assert.equal(r.pagamentos[0].naoAlocadoCentavos, 3000);
});

test('CS-PUB.1 — adiantamento patrimonial e quitação regular abatem uma vez', () => {
  const r = simular([obrigacao()], [
    pagamento({ tipo: 'ANTECIPACAO', natureza: 'PATRIMONIAL' }),
    pagamento({ id: 'caixa-b', valorCentavos: 7000 })
  ], [alocacao(), alocacao({
    id: 'vinculo-b', pagamentoId: 'caixa-b', valorCentavos: 7000
  })]);
  assert.equal(r.ok, true);
  assert.equal(r.obrigacoes[0].saldoCentavos, 0);
  assert.equal(r.obrigacoes[0].situacao, 'QUITADO');
});

test('CS-PUB.1 — adiantamento como despesa exige revisao mesmo sem alocar', () => {
  const r = simular([obrigacao()], [
    pagamento({ tipo: 'ANTECIPACAO', natureza: 'DESPESA' })
  ], []);
  assert.equal(r.ok, true);
  assert.equal(r.pagamentos[0].requerRevisao, true);
  assert.ok(r.avisos.includes('NATUREZA_ECONOMICA_PENDENTE:caixa-a'));
});

test('CS-PUB.1 — adiantamento como despesa nao e abatido automaticamente', () => {
  const r = simular([obrigacao()], [
    pagamento({ tipo: 'ANTECIPACAO', natureza: 'DESPESA' })
  ], [alocacao()]);
  assert.equal(r.ok, false);
  assert.ok(r.erros.includes('NATUREZA_NAO_ALOCAVEL'));
  assert.deepEqual(r.obrigacoes, []);
});

test('CS-PUB.1 — proibe cruzar pagamentos entre pessoas', () => {
  const r = simular([obrigacao()], [
    pagamento({ pessoa: 'pessoa-b' })
  ], [alocacao()]);
  assert.equal(r.ok, false);
  assert.ok(r.erros.includes('PESSOA_DIVERGENTE'));
});

test('CS-PUB.1 — proibe alocacao sem fonte', () => {
  const r = simular([obrigacao()], [], [alocacao()]);
  assert.equal(r.ok, false);
  assert.ok(r.erros.includes('VINCULO_SEM_FONTE'));
});

test('CS-PUB.1 — IDs duplicados de obrigacao sao rejeitados', () => {
  const r = simular([obrigacao(), obrigacao()], [], []);
  assert.equal(r.ok, false);
  assert.ok(r.erros.includes('OBRIGACAO_DUPLICADA'));
});

test('CS-PUB.1 — IDs duplicados de pagamento sao rejeitados', () => {
  const r = simular([], [pagamento(), pagamento()], []);
  assert.equal(r.ok, false);
  assert.ok(r.erros.includes('PAGAMENTO_DUPLICADO'));
});

test('CS-PUB.1 — IDs duplicados de alocacao sao rejeitados', () => {
  const r = simular([obrigacao()], [pagamento()],
    [alocacao(), alocacao()]);
  assert.equal(r.ok, false);
  assert.ok(r.erros.includes('ALOCACAO_DUPLICADA'));
});

test('CS-PUB.1 — recusa pagamento que excede valor da obrigacao', () => {
  const r = simular([obrigacao({ valorCentavos: 2000 })], [pagamento()], [alocacao()]);
  assert.equal(r.ok, false);
  assert.ok(r.erros.includes('OBRIGACAO_EXCEDIDA:folha-a'));
});

test('CS-PUB.1 — recusa alocacoes maiores que o pagamento', () => {
  const r = simular([obrigacao()], [
    pagamento({ valorCentavos: 2000 })
  ], [alocacao()]);
  assert.equal(r.ok, false);
  assert.ok(r.erros.includes('PAGAMENTO_EXCEDIDO:caixa-a'));
});

test('CS-PUB.1 — recusa valores fracionarios de centavo', () => {
  const r = simular([obrigacao({ valorCentavos: 10000.1 })], [], []);
  assert.equal(r.ok, false);
  assert.ok(r.erros.includes('OBRIGACAO_INVALIDA'));
});

test('CS-PUB.1 — rejeita data impossivel e pagamento nao confirmado', () => {
  const data = simular([], [pagamento({ dataCaixa: '2027-02-30' })], []);
  const pendente = simular([], [pagamento({ confirmado: false })], []);
  assert.equal(data.ok, false);
  assert.equal(pendente.ok, false);
});

test('CS-PUB.1 — uma transferencia ficticia pode abater duas obrigacoes', () => {
  const r = simular([
    obrigacao({ valorCentavos: 1000 }),
    obrigacao({ id: 'folha-b', valorCentavos: 2000 })
  ], [pagamento()], [
    alocacao({ valorCentavos: 1000 }),
    alocacao({ id: 'vinculo-b', obrigacaoId: 'folha-b', valorCentavos: 2000 })
  ]);
  assert.equal(r.ok, true);
  assert.deepEqual(r.obrigacoes.map(x => x.situacao), ['QUITADO', 'QUITADO']);
  assert.equal(r.pagamentos[0].naoAlocadoCentavos, 0);
});

test('CS-PUB.1 — entradas nao sao mutadas e ordem da resposta e deterministica', () => {
  const origem = Object.freeze({
    obrigacoes: Object.freeze([
      Object.freeze(obrigacao({ id: 'folha-b' })),
      Object.freeze(obrigacao())
    ]),
    pagamentos: Object.freeze([]),
    alocacoes: Object.freeze([])
  });
  const r = conciliar(origem);
  assert.equal(r.ok, true);
  assert.deepEqual(r.obrigacoes.map(x => x.id), ['folha-a', 'folha-b']);
  assert.equal(origem.obrigacoes[0].id, 'folha-b');
});
