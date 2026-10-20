# CS-PUB.1 — Conciliação sintética de remuneração (escopo aprovado antes do código)

**Data:** 19/10/2026. **Situação inicial:** PLANEJADA; testes, PR e CI ainda não executados.
**Origem desta iniciativa:** continuação do módulo de profissionais do projeto Casa Santana, **sem copiar o Apps Script, os testes privados ou dados reais** para o repositório público.

## Escopo original e estimativa

Expandir o hub público por **1,50h de trabalho estimado, em trilha CS-PUB.1 separada**. Não incorporar este peso ao baseline histórico E-TEST+E-ARQ+E-RES.1 (15,50h), Weine e P4.1: a trilha é uma iniciativa da Casa Santana e não significa revalidar nem alterar progresso de Weine.

Criar módulo JS puro original sob `casa-santana/src/`, com testes inteiramente sintéticos acrescidos a **um dos cinco arquivos existentes** de `casa-santana/tests/`. Preservar os cinco nomes porque os contratos públicos T3/T5 verificam a lista exata de fixtures.

## Contrato e critérios de aceite

1. Entradas somente em memória, com IDs fictícios, competência no formato YYYY-MM, valores estritamente em **centavos inteiros**, obrigações, pagamentos e **alocações explícitas** entre um pagamento e uma obrigação.
2. Não vincular por valor, texto, identidade aproximada ou data. Bloquear IDs duplicados, inconsistências de pessoa, fontes ausentes, alocação acima da obrigação, pagamento dividido além do total e centavos não inteiros.
3. Distinguir quitação regular e adiantamento patrimonial alocável; um adiantamento classificado como despesa econômica é **pendência econômica**, nunca abatido automaticamente. Permitir várias alocações válidas para pagamentos parciais sem criar nova obrigação.
4. Resultado determinista, sem mutações de entrada, sem efeito colateral, sem importação privada, rede, filesystem, credenciais, Google Sheets, Apps Script, tokens, IDs reais, planilhas, CPF, nomes de clientes ou pagamentos verdadeiros. O módulo **não faz lançamento financeiro**.
5. Testar entradas normais, pagamentos no mês seguinte (representado por metadado de caixa, sem realocação implícita), adiantamento ainda não alocado, quitação completa, duplicidades, pagamento acima do saldo, pessoa divergente, centavo fracionário, ausência de vínculo, abuso de classificação e imutabilidade.
6. CI pública: exigir os três checks sem relaxar `tools/check-publication.mjs`, `contents: read`, sem checkout privado, segredos, deploy, Google OAuth nem substituição de validação privada. Não fazer merge antes da revisão do diff, dos checks e da aprovação de segurança.
7. Atestar unicamente o comportamento do contrato **sintético público**; a homologação do motor Casa Santana exige integração em ambiente privado, gateway de escrita ADV, backup e testes em cópia autorizada.

## Plano de execução

- **Planejado:** registrar expansão e controles (este documento e referência no ROADMAP) antes do código.
- **A executar:** criar o módulo original e testes sintéticos na branch `feature/casa-pagamentos-sinteticos-20261019`.
- **A validar:** PR isolado, gate, piloto Weine e piloto Casa Santana na CI, inspeção de arquivos publicados e limites de segurança.
- **Após validação:** atualizar ROADMAP/HANDOFF público e issue de Casa Santana com evidências concretas. Nenhuma fonte privada ou planilha sofrerá qualquer alteração por esta etapa.

## PROXIMA ACAO A EXECUTAR - SUJEITA A VERIFICACAO

Verificar HEAD da branch pública e se os controles históricos continuam presentes. Implementar apenas módulo e testes sintéticos desta etapa, sem alterar os testes de contratos históricos além dos cenários de Casa Santana no arquivo escolhido. Depois criar PR, verificar checks e rever segurança antes de merge.


## Evidência da implementação e validação do PR público

**IMPLEMENTADO NA BRANCH / CI DO PR VALIDADA** (ainda não é homologação privada). No PR [#48](https://github.com/brunooss1987-a11y/financeiro-testes/pull/48), a implementação original de `casa-santana/src/conciliacao-remuneracao-ficticia.mjs` foi acompanhada de **20 novos testes sintéticos** adicionados a `casa-santana/tests/limites-sinteticos.test.mjs`. Os cinco filenames originais permaneceram; `tests/security/areas-publicas.test.mjs` passou a exigir 57/57 na ponte T3 (antes 37/37), sem relaxar as assertivas.

**Executado e validado pelo GitHub Actions público:** run [39349864098](https://github.com/brunooss1987-a11y/financeiro-testes/actions/runs/39349864098) = `completed/success`, jobs reais com steps e logs: Gate de publicação **38/38**, Piloto Casa Santana **37/37** (17 anteriores + 20 novos), Piloto Weine **18/18**, `PUBLIC_GUARD=PASS`; zero testes falhos. Execução associada à HEAD do PR `ca19a7aa3970d5b1ef0c477e1b057dd441bebb7d`. O gate também executou as regressões legadas e Comum. Nenhuma permissão, workflow, arquivo Weine/Comum, Apps Script ou dado real foi modificado.

**Revisão de diffs:** seis caminhos esperados: `ROADMAP.md`, `casa-santana/README.md`, módulo novo, teste da Casa, este documento e ajuste da contagem exata no gate T3. Sem arquivos/IDs/URLs privados, credenciais ou checkouts privados. O verificador do repositório é uma defesa adicional, não prova universal de ausência de segredo.

**Estado dessa leitura:** o código passou **na CI do PR**; merge, CI na `main` e leitura pós-merge continuam pendentes até evidência. Não equivale a E2E, quitação bancária, ligação ao sistema privado ou autorização para escrever em planilha.

## PROXIMA ACAO A EXECUTAR - SUJEITA A VERIFICACAO

Verificar HEAD, diff e checks atuais do PR #48, resolver eventuais mudanças concorrentes em `main`; após aprovação de segurança, mesclar e confirmar 3/3 checks na `main`, ler os arquivos publicados e registrar CS-PUB.1 como validada **somente no escopo sintético público**. Integrar contratos reais, se necessário, exclusivamente no repositório privado, sob ADV/backup/testes de homologação.


## CS-PUB.1 — VALIDADA NA MAIN (conclusão pública)

**Validação concluída exclusivamente para o laboratório sintético público.** O [PR #48](https://github.com/brunooss1987-a11y/financeiro-testes/pull/48) foi incorporado à `main` no commit `3b028f738c57baf5cd1da0369acec0faf0b1f46f`. CI do PR após documentação: run [39350035949](https://github.com/brunooss1987-a11y/financeiro-testes/actions/runs/39350035949) = 3/3 SUCCESS. CI pós-merge da `main`: run [39350133121](https://github.com/brunooss1987-a11y/financeiro-testes/actions/runs/39350133121) = 3/3 SUCCESS (Gate, Piloto Casa Santana e Piloto Weine). Ambos registraram jobs efetivos, não somente status de fila.

**Readback da `main`:** módulo sintético publicado e 20 novos testes presentes; `weine/src/index.mjs` e `comum/src/index.mjs` têm blobs idênticos à versão-base anterior; os blobs do contrato `local-integrity/v1` e sua fonte permanecem idênticos aos anteriores. Segurança de publicação da CI aprovou; nenhum dado, token, planilha, Apps Script ou módulo financeiro privado foi inserido.

**Estado da trilha independente CS-PUB.1:** **VALIDADA 1,50/1,50h (100% do seu escopo público)**. Não alterar o histórico Weine ou o E-TEST (15,50h; P4.1 privada pendente). A suíte pública permanece demonstrativa e não prova homologação bancária ou autorização de gravação.

## PROXIMA ACAO A EXECUTAR - SUJEITA A VERIFICACAO

Após validar esta nota documental na CI e reler a `main`, atualizar a issue privada Casa Santana com a referência à prova pública. No repositório privado, começar por reler o estado do PR #630 e do gateway ADV; preparar contrato de integração/validação sobre dados **sintéticos** antes de qualquer teste de escrita autorizado. Não executar deploy nem mudar planilha ou PDS/controle financeiro por simples sucesso da CI pública.
