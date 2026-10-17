# E-ARQ T5 — Homologação pública da estrutura de três áreas

**Data:** 2026-10-17. **Peso:** 0,50h JÁ INCLUÍDO nas 5h E-ARQ. **Estado final:** **T5 VALIDADA na main**, mediante PR, CI PR/main e readback comprovados. Não autoriza inferir validação L1/L2 de sistemas privados.

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

## Evidência conclusiva da T5 (2026-10-17)

PR #42 incorporado à `main` no commit público `27383adaa750c942c9c03eafcea68eefdef4c690`. CI do PR [39073599636](https://github.com/brunooss1987-a11y/financeiro-testes/actions/runs/39073599636) e CI pós-merge [39073659211](https://github.com/brunooss1987-a11y/financeiro-testes/actions/runs/39073659211) **COMPLETED SUCCESS 3/3**. Gate **26/26** (21 originais + cinco testes T5; prova T3 37/37 incluída), legado **35/35**, Comum **2/2**, pilotos Weine **18/18** e Casa Santana **17/17**, scanner `PUBLIC_GUARD=PASS`. Readback da `main` confirmou arquivo T5, manifesto, somador fictício, piloto e comprovante v1 intactos; branch de backup ainda no SHA `53a4a6eba6ada83b4bcee1f28824257799bfa4b0`.

**PROGRESSO DO ROADMAP:** T5 **0,50/0,50h = 100,00% concluída | 0% restante**; fase E-ARQ **4,50/5,00h = 90,00% concluída | 10,00% restante**; projeto E-TEST+E-ARQ **13,00/14,50h = 89,66% concluído | 10,34% restante**. Baseline mantido 14,50h; resta T6 0,50h e P4.1 privada 1h. Nenhuma expansão nova.

## PROXIMA ACAO A EXECUTAR - SUJEITA A VERIFICACAO

Na próxima retomada verificar PR #42, as duas CIs, readback e este registro; não repetir T5. Executar T6 — documentação e transição de manutenção (0,50h), corrigindo textos operacionais obsoletos e preparando guia por área sem alterar os motores privados ou a evidência histórica.
