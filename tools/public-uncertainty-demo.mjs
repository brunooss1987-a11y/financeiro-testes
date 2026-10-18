// E-RES.1: exemplo ORIGINAL e PUBLICO. Nao executa operacoes, rede ou armazenamento.
// Retorna uma recomendacao de verificacao; jamais autoriza retry ou confirma pagamento.
const VALID = new Set(['SUCESSO_COM_LEITURA','RECUSADO','TEMPO_ESGOTADO','DESCONHECIDO','ERRO_TRANSPORTE']);
const result = (status,reason) => Object.freeze({
  schema: 'public-uncertainty-demo/v1',
  status, reason,
  allowAutomaticRetry: false,
  allowWrite: false,
  provesPayment: false,
  requiresIndependentCheck: true
});

export function classifySyntheticOutcome(input) {
  if (input === null || typeof input !== 'object' || Array.isArray(input))
    return result('BLOQUEADO','ENTRADA_INVALIDA');
  if (input.demoScope !== 'SYNTHETIC_ONLY' ||
      typeof input.outcome !== 'string' || !VALID.has(input.outcome))
    return result('BLOQUEADO','ESCOPO_OU_RESULTADO_INVALIDO');
  if (input.outcome === 'RECUSADO')
    return result('RECUSADO','SEM_NOVA_TENTATIVA_AUTOMATICA');
  if (input.outcome !== 'SUCESSO_COM_LEITURA')
    return result('INCERTO','RECONCILIAR_ANTES_DE_QUALQUER_ACAO');
  if (input.independentRead === true && input.resultMatches === true &&
      input.duplicateEffects === false)
    return result('DEMO_COHERENT','DEMONSTRACAO_NAO_E_PAGAMENTO');
  return result('INCERTO','LEITURA_OU_POSCONDICAO_INSUFICIENTE');
}
