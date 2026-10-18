// Testes negativos e positivos exclusivamente publicos; sem dados reais.
import test from 'node:test';
import assert from 'node:assert/strict';
import { classifySyntheticOutcome } from '../../tools/public-uncertainty-demo.mjs';

const base = () => ({demoScope:'SYNTHETIC_ONLY',outcome:'SUCESSO_COM_LEITURA',
  independentRead:true,resultMatches:true,duplicateEffects:false});
const check = (input,expected) => {
  const before = structuredClone(input);
  const r = classifySyntheticOutcome(input);
  assert.equal(r.status,expected);
  assert.equal(r.schema,'public-uncertainty-demo/v1');
  assert.equal(r.allowAutomaticRetry,false);
  assert.equal(r.allowWrite,false);
  assert.equal(r.provesPayment,false);
  assert.equal(r.requiresIndependentCheck,true);
  assert.ok(Object.isFrozen(r));
  assert.deepEqual(input,before);
};
test('E-RES.1: sintese coerente nao prova pagamento',()=>check(base(),'DEMO_COHERENT'));
test('E-RES.1: recusa nunca autoriza retry',()=>check({...base(),outcome:'RECUSADO'},'RECUSADO'));
for (const outcome of ['TEMPO_ESGOTADO','DESCONHECIDO','ERRO_TRANSPORTE'])
  test('E-RES.1: falha incerta '+outcome,()=>check({...base(),outcome},'INCERTO'));
for (const bad of [
  {independentRead:false},{resultMatches:false},{duplicateEffects:true}
]) test('E-RES.1: poscondicao incompleta',()=>check({...base(),...bad},'INCERTO'));
for (const bad of [{demoScope:'PRIVATE'},{outcome:'INVALIDO'},{outcome:42}])
  test('E-RES.1: entrada fora de escopo',()=>check({...base(),...bad},'BLOQUEADO'));
test('E-RES.1: entrada nula bloqueada',()=>{
 const r = classifySyntheticOutcome(null);
 assert.equal(r.status,'BLOQUEADO');
 assert.equal(r.allowAutomaticRetry,false);
});
