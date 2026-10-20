/**
 * Exemplo ORIGINAL e PUBLICO de conciliacao ficticia de remuneracao.
 * Esta funcao so calcula: nao le/atualiza banco, planilha, arquivos ou rede.
 * Nao e componente do motor financeiro privado nem prova pagamentos reais.
 */
export function conciliarRemuneracaoFicticia(entrada) {
  const erros = [];
  const avisos = [];
  const porObrigacao = new Map();
  const porPagamento = new Map();
  const alocacoesConhecidas = new Set();

  const idValido = (id) => typeof id === 'string' &&
    /^[a-z][a-z0-9_-]{1,39}$/.test(id);
  const centavosValidos = (valor) => Number.isSafeInteger(valor) && valor > 0;
  const competenciaValida = (valor) => typeof valor === 'string' &&
    /^\d{4}-(0[1-9]|1[0-2])$/.test(valor);
  const dataValida = (valor) => {
    if (typeof valor !== 'string' || !/^\d{4}-(0[1-9]|1[0-2])-\d{2}$/.test(valor)) return false;
    const [ano, mes, dia] = valor.split('-').map(Number);
    if (ano < 100 || dia < 1) return false;
    return new Date(Date.UTC(ano, mes, 0)).getUTCDate() >= dia;
  };
  const falha = (codigo) => { erros.push(codigo); };
  const somenteObjetos = (valor) => valor !== null && typeof valor === 'object' && !Array.isArray(valor);

  if (!somenteObjetos(entrada) ||
      !Array.isArray(entrada.obrigacoes) ||
      !Array.isArray(entrada.pagamentos) ||
      !Array.isArray(entrada.alocacoes) ||
      Object.keys(entrada).some(k => !['obrigacoes', 'pagamentos', 'alocacoes'].includes(k)) ||
      [entrada.obrigacoes, entrada.pagamentos, entrada.alocacoes].some(a => a.length > 1000)) {
    return { ok: false, erros: ['CONTRATO_INVALIDO'], avisos: [], obrigacoes: [], pagamentos: [], escritaRealizada: false };
  }

  for (const o of entrada.obrigacoes) {
    if (!somenteObjetos(o) || !idValido(o.id) || !idValido(o.pessoa) ||
        !competenciaValida(o.competencia) || !centavosValidos(o.valorCentavos)) {
      falha('OBRIGACAO_INVALIDA'); continue;
    }
    if (porObrigacao.has(o.id)) { falha('OBRIGACAO_DUPLICADA'); continue; }
    porObrigacao.set(o.id, { id: o.id, pessoa: o.pessoa, competencia: o.competencia,
      devido: BigInt(o.valorCentavos), alocado: 0n });
  }

  for (const p of entrada.pagamentos) {
    if (!somenteObjetos(p) || !idValido(p.id) || !idValido(p.pessoa) ||
        !dataValida(p.dataCaixa) || !centavosValidos(p.valorCentavos) ||
        !['QUITACAO', 'ANTECIPACAO'].includes(p.tipo) ||
        !['LIQUIDACAO', 'PATRIMONIAL', 'DESPESA'].includes(p.natureza) ||
        p.confirmado !== true) {
      falha('PAGAMENTO_INVALIDO'); continue;
    }
    if (porPagamento.has(p.id)) { falha('PAGAMENTO_DUPLICADO'); continue; }
    const classificacaoValida = p.tipo === 'QUITACAO' && p.natureza === 'LIQUIDACAO' ||
      p.tipo === 'ANTECIPACAO' && p.natureza === 'PATRIMONIAL';
    if (!classificacaoValida) avisos.push('NATUREZA_ECONOMICA_PENDENTE:' + p.id);
    porPagamento.set(p.id, { id: p.id, pessoa: p.pessoa, dataCaixa: p.dataCaixa,
      tipo: p.tipo, classificacaoValida, valor: BigInt(p.valorCentavos), alocado: 0n });
  }

  for (const a of entrada.alocacoes) {
    if (!somenteObjetos(a) || !idValido(a.id) || !idValido(a.obrigacaoId) ||
        !idValido(a.pagamentoId) || !centavosValidos(a.valorCentavos)) {
      falha('ALOCACAO_INVALIDA'); continue;
    }
    if (alocacoesConhecidas.has(a.id)) { falha('ALOCACAO_DUPLICADA'); continue; }
    alocacoesConhecidas.add(a.id);
    const obrigacao = porObrigacao.get(a.obrigacaoId);
    const pagamento = porPagamento.get(a.pagamentoId);
    if (!obrigacao || !pagamento) { falha('VINCULO_SEM_FONTE'); continue; }
    if (obrigacao.pessoa !== pagamento.pessoa) { falha('PESSOA_DIVERGENTE'); continue; }
    if (!pagamento.classificacaoValida) { falha('NATUREZA_NAO_ALOCAVEL'); continue; }
    const parte = BigInt(a.valorCentavos);
    obrigacao.alocado += parte;
    pagamento.alocado += parte;
  }

  for (const o of porObrigacao.values()) {
    if (o.alocado > o.devido) falha('OBRIGACAO_EXCEDIDA:' + o.id);
  }
  for (const p of porPagamento.values()) {
    if (p.alocado > p.valor) falha('PAGAMENTO_EXCEDIDO:' + p.id);
  }

  // Nenhum saldo parcial e retornado se houver uma falha ou estouro de limite seguro.
  const limite = BigInt(Number.MAX_SAFE_INTEGER);
  for (const o of porObrigacao.values()) if (o.alocado > limite) falha('LIMITE_CENTAVOS');
  for (const p of porPagamento.values()) if (p.alocado > limite) falha('LIMITE_CENTAVOS');
  if (erros.length) return {
    ok: false, erros: [...new Set(erros)].sort(), avisos: [...new Set(avisos)].sort(),
    obrigacoes: [], pagamentos: [], escritaRealizada: false
  };

  const obrigacoes = [...porObrigacao.values()].map(o => ({
    id: o.id, pessoa: o.pessoa, competencia: o.competencia,
    devidoCentavos: Number(o.devido), pagoCentavos: Number(o.alocado),
    saldoCentavos: Number(o.devido - o.alocado),
    situacao: o.alocado === o.devido ? 'QUITADO' : o.alocado > 0n ? 'PARCIAL' : 'PENDENTE'
  })).sort((a, b) => a.id.localeCompare(b.id));

  const pagamentos = [...porPagamento.values()].map(p => ({
    id: p.id, pessoa: p.pessoa, dataCaixa: p.dataCaixa, tipo: p.tipo,
    valorCentavos: Number(p.valor), alocadoCentavos: Number(p.alocado),
    naoAlocadoCentavos: Number(p.valor - p.alocado),
    requerRevisao: !p.classificacaoValida
  })).sort((a, b) => a.id.localeCompare(b.id));

  return { ok: true, erros: [], avisos: [...new Set(avisos)].sort(),
    obrigacoes, pagamentos, escritaRealizada: false };
}
