# E-ARQ T5 — Homologação pública da estrutura de três áreas

**Data:** 2026-10-17. **Peso:** 0,50h JÁ INCLUÍDO nas 5h E-ARQ. **Estado:** testes de homologação ADICIONADOS em branch; pendente CI PR, merge, CI main e readback — NÃO VALIDADA ainda.

## Origem e limites

- `main` no início da T5: `85e086781b32431a35a03f663421ed26db8c752b`; CI `39073086918` **3/3 SUCCESS**; T0–T4 validadas nos limites públicos.
- Branch de recuperação `backup/e-arq-t2-pre-migracao-20261017` permanece no commit `53a4a6eba6ada83b4bcee1f28824257799bfa4b0` (branch não protegida/imutável).
- 74 arquivos públicos em `main`, sem truncamento da árvore. Blobs protegidos do manifesto v1, somador, teste piloto e comprovante correspondem aos registros T2/T4. PR #4 bloqueado e P4.1 L1/L2 privados ainda pendentes.
- **NÃO** avaliados: motores financeiros privados, Google Sheets reais, saldos/parcelas/contas, Apps Script, OAuth, credenciais, VM/infraestrutura, deploy nem certificação financeira E2E.

## Entrega técnica T5

Adicionado `tests/security/homologacao-tres-areas.test.mjs`, **cinco testes de aceite públicos** (não substituem nem desabilitam os 21 anteriores):

1. **Diretórios e suites** — `weine/`, `casa-santana/` e `comum/` são diretórios reais sem symlink; os `src/index.mjs`, README e arquivos de teste autorizados existem nos três domínios.
2. **Fronteiras e API** — Weine/Casa expõem suas próprias entradas, não importam código específico uma da outra e recebem a biblioteca monetária genérica de `comum/`; funções referem ao mesmo contrato público E-COM.1 e realizam round-trip sintético.
3. **Runner restrito** — mapeamentos `weine/tests`, `casa-santana/tests`, `tests/security` confirmados e execução real de entradas inválidas/traversal/suite não autorizada retorna erro (código 2), não execução arbitrária. Ambiente de subprocesso isolado e sem parâmetros de shell.
4. **Contrato v1** — manifesto `local-integrity/v1` com caminho original, SHA-256 de fonte fictícia recalculado, `LOCAL_BYTES_MATCH`, ausência de alegação financeira E2E, e comprovante público pinado ao teste piloto antigo.
5. **CI e governança** — `contents: read`, checkout pinado, nomes do gate e pilotos, dependência `needs: security`, regressão legada, Comum e scanner preservados; `npm test` abrange três áreas; CODEOWNERS atribui as três.

**Aceite integral esperado:** segurança **26/26** (21 anteriores + 5 novos), ponte das novas áreas 37/37, legado 35/35, Comum 2/2, pilotos Weine 18/18 e Casa 17/17, scanner PASS e CI 3/3 tanto no PR como na `main`. Todos os testes devem realmente executar — ausência, skips, falsos PASS ou relaxamento das verificações é NO-GO.

## Progresso ponderado

Até validação T5: fase E-ARQ **4,00/5,00h = 80,00% concluída | 20,00% restante**; E-TEST+E-ARQ **12,50/14,50h = 86,21% concluído | 13,79% restante**.

**Depois da validação (e somente depois):** T5 **0,50/0,50h = 100%**, E-ARQ **4,50/5,00h = 90,00% concluída | 10,00% restante**, projeto E-TEST ampliado **13,00/14,50h = 89,66% concluído | 10,34% restante**. T6 de documentação 0,50h e P4.1 privada 1h permanecem pendentes. Histórico Weine 92,11% inalterado. Não há expansão de escopo.

## PROXIMA ACAO A EXECUTAR - SUJEITA A VERIFICACAO

Verificar resultado efetivo do PR T5 e CI de seus três checks, corrigir falhas sem reduzir o conjunto de testes. Após merge, verificar CI 3/3 da `main`, ler os cinco testes e os contratos/readbacks e atualizar ROADMAP/HANDOFF para marcar T5 validada. Próxima T6 — documentação e transição (0,50h). Não repetir T0–T4 nem criar novos recursos fora de escopo.
