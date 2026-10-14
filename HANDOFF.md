# HANDOFF — Financeiro-Testes

Data: 2026-10-14.
Objetivo: piloto publico de CI compartilhada para testes OFFLINE autorizados de Weine e Casa Santana. Repositorios operacionais permanecem PRIVADOS e NAO foram modificados pela implementacao do hub.

## Estado comprovado
- Conselho tecnico: decisao por UM repositorio publico compartilhado com suites isoladas, sem dados financeiros, Google, OAuth ou secrets.
- Repositorio criado e visibilidade PUBLIC confirmada: https://github.com/brunooss1987-a11y/financeiro-testes
- Codigo piloto sintetico e teste de gate publicados na main (sem reproduzir fontes privadas).
- Execucao real GitHub Actions run https://github.com/brunooss1987-a11y/financeiro-testes/actions/runs/38572537327 com 3 jobs COMPLETED SUCCESS: Gate de publicacao, Piloto weine, Piloto casa-santana.
- Nenhuma escrita em planilhas, nenhum deploy Apps Script, nenhum clone autenticado de Weine/Casa, nenhuma credencial armazenada no hub.
- P0.1 e P0.2 VALIDADO, P0 100%. P1.1 VALIDADO por API/readback e PR de regressao #1 (Actions run 38574081937 3/3 SUCCESS). E-TEST agora 2,00/6,00h = 33,33% concluido, 66,67% restante. Weine permanece em 92,11% no baseline de 19h, sem incorporar automaticamente a expansao compartilhada.
- Os testes passam somente com valores sinteticos; NAO validam motores, pagamentos, Sheets, apps script ou E2E.
- P2.1 concluida e VALIDADA na auditoria de candidatos reais da Weine: par offline E1.4 com SHA dos blobs conferidos e 7 testes PASS em computador autorizado, temporarios excluidos. Somente RELATORIO de avaliacao foi publicado no hub; fontes privadas ainda NAO foram copiadas. E-TEST 3,50/6h = 58,33% concluido / 41,67% restante. Weine historica 92,11% inalterada.
- P3.1 concluida e VALIDADA por inventario + comprovacao de teste privado ja executado na versao identica: Casa Santana main 608 arquivos, candidato puro 'adv1-connector-refusal-guard.mjs' e teste com 13 cenarios sinteticos. Run privado 38489755488 SUCCESS com blobs iguais aos da main; nova execucao local bloqueada por seguranca, portanto NAO executada nem contornada. Somente documentacao publica. E-TEST 5,00/6h = 83,33% concluido / 16,67% restante. Weine 92,11% inalterada.

## Nao confundir
- A politica escrita SECURITY.md nao prova seguranca por si so; nesta rodada as configuracoes reais foram confirmadas por API, mas auditoria periodica e revisao humana de codigo a publicar continuam necessarias.
- A execucao publica funcionando NAO desbloqueia os jobs privados de billing, nem elimina necessidade de homologacao em LAB.
- A separacao de testes reais requer demonstrar identidade de versao/hashes e revisao de dados antes de qualquer publicacao.

## P1.1 — CONTROLES ADMINISTRATIVOS VALIDADOS EM 2026-10-14
- Settings de Actions consultadas e verificadas apos escrita: allowed_actions=selected, sha_pinning_required=true; selected-actions com UNICO actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683; GitHub-owned e verified actions indiscriminados desabilitados.
- Default GITHUB_TOKEN = read, can_approve_pull_request_reviews=false, conferidos antes de qualquer alteracao (preservados); policy de fork = all_external_contributors, confirmada.
- Branch main protegida inclusive para administradores, exigindo os checks Gate de publicacao, Piloto weine e Piloto casa-santana; PR obrigatorio sem segundo aprovador (required_approving_review_count=0), historico linear e resolucao de conversas, sem force push ou exclusao.
- Ensaio de PR de um mantenedor: https://github.com/brunooss1987-a11y/financeiro-testes/pull/1 ; primeira CI no PR https://github.com/brunooss1987-a11y/financeiro-testes/actions/runs/38574081937 terminou com 3/3 jobs SUCCESS. Atualizacoes posteriores do mesmo PR exigem novo check antes de merge.
- CODEOWNERS atribui revisao/ownership ao proprietario mas nao exige aprovacao de um segundo mantenedor.
- Nao foram tocados scripts, planilhas, secrets nem as branches dos dois repositorios privados. Testes ficticios nao validam logica financeira.
- Subetapa P1.1: EXECUTADA E VALIDADA em API e teste de PR; marco E-TEST 33,33% concluido / 66,67% restante. P0 100%, P1 100%; P2.1 pendente. Baseline historico Weine 19h/progresso 92,11% preservado.

## P2.1 — AUDITORIA DE FONTES E TESTE REAL OFFLINE, 14/10/2026
- Fontes consultadas SOMENTE LEITURA no Weine privado: main (59 arquivos), PR E1.4 #105 DRAFT (79 arquivos) e PR E-DIV.2 #107 DRAFT (89 arquivos); origem de testes e dependencias categorizadas no documento `docs/P2-1-inventario-weine.md`.
- Candidato condicional: `lab-e14/overwrite-guard.mjs` Git blob SHA `148666fc3ee4dd5de1fa38843a24226a98c89986` e `lab-e14/overwrite-guard-test.mjs` SHA `6bff970930553d85c1d7faa7c478cc80a37c460b`. Origem PR privado #105, head SHA `703f3d8ea6824eef413742634084d590207483e5`.
- Evidencia de autenticidade e comportamento: GH CLI obteve os dois arquivos somente em pasta TEMP local, Git hash-object confirmou ambos os blobs, node executou teste real offline -> '7 testes ... passaram', exit 0, `P21_OFFLINE_SOURCE_TEST=PASS`; pasta TEMP excluida no finally (`P21_TEMP_CLEANED=YES`). Nenhum segredo impresso ou reutilizado.
- Os demais tests/main e suites LAB dependentes de Sheets, IDs reais, scripts, fontes Code.gs, OAuth ou snapshots sao **PRIVADOS** ou demandam revisao adicional. Nao confundir triagem com auditoria integral de todos commits historicos.
- Apenas o relatorio, ROADMAP e este HANDOFF foram alterados no REPO PUBLICO. Nenhum arquivo ou branch no Weine privado ou Casa Santana foi modificado; nenhuma planilha ou Apps Script foi acessada para gravacao.
- P2.1 VALIDADA como INVENTARIO E SELECAO, nao como migracao. P2: 100% / 0%. E-TEST: 3,50/6,00h (58,33% / 41,67%). Progresso Weine 92,11% do baseline historico de 19h inalterado.
- Gates de PUBLICACAO DO CODIGO REAL, correspondencia de hashes, protecoes e integracao continuam em P4.1; nao publicar a dupla E1.4 ainda.

## P3.1 — INVENTARIO CASA SANTANA VALIDADO EM 2026-10-14
- Casa Santana e Weine permaneceram PRIVADOS e INALTERADOS. Triagem na arvore main de Casa Santana: 608 arquivos (129 scripts tests; 92 em src; 62 snapshots; 20 workflows). Isso nao significa revisao integral de cada codigo.
- Candidato condicional puramente offline: `scripts/adv1-connector-refusal-guard.mjs` Git blob SHA `dbf81cb36f07aeeba5cfd52b239d2f12ed1267e1`; teste `scripts/test-adv1-connector-refusal-guard.mjs` Git blob SHA `d096b4df3eeb4cfc73997d8bd87e42af204443d9`. Inspecao de ambas fontes: sem API Google, rede, filesystem, subprocessos, variaveis de ambiente, URLs de planilha ou tokens.
- Evidencia EXECUTADA ANTERIORMENTE por CI privada: run https://github.com/brunooss1987-a11y/Casa-santana/actions/runs/38489755488, job 115611901085 'validate' SUCCESS; head commit `40b2b20cf13ac2eb350f65956bd2a604876931f4`. A arvore do head contem exatamente os MESMOS Git blob SHA dos dois arquivos. `scripts/validate-repo.mjs` inclui o teste; log privado registra 'ADV-1 connector refusal guard OK (13 scenarios; no live writes)'.
- Tentativa de executar novamente em computador autorizado foi BLOQUEADA por restricao de seguranca. Nenhum comando equivalente foi usado para contornar. A selecao foi VALIDADA por hash + evidencia de CI anterior, nao por nova execucao.
- Conjuntos que dependem de `src/`, Google, OAuth, dados, backups ou integrações reais permanecem privados ou exigem revisao individual. Documento auditavel `docs/P3-1-inventario-casa-santana.md` no hub publico tem detalhes, sem codigo-fonte confidencial.
- P3.1 VALIDADA como INVENTARIO/SELECAO, NAO PUBLICACAO/INTEGRACAO. P3: 100% concluida / 0% restante. E-TEST 5,00/6,00h = 83,33% concluido / 16,67% restante. Progresso historico Weine 92,11% inalterado. P4.1 PENDENTE.

## P4.1 — CONTINUIDADE DA CI PUBLICA SEM FATURAMENTO PRIVADO — 2026-10-14

- O usuario solicitou continuar o trabalho sem tratar agora o bloqueio de faturamento dos workflows privados. A investigacao financeira fica EM ESPERA, nao e pre-requisito dos testes sinteticos do hub.
- PR publico #5: https://github.com/brunooss1987-a11y/financeiro-testes/pull/5. Nenhuma fonte ou fixture proveniente dos repositorios privados foi inserida neste PR. Foram adicionados dois testes novos e independentes, usando exclusivamente o modulo demonstrativo ja publico `src/shared/centavos-demo.mjs`.
- `.github/workflows/ci.yml` passou a executar todos os arquivos `tests/weine/*.test.mjs` e `tests/casa-santana/*.test.mjs` de cada suite. Nomes dos checks obrigatorios preservados.
- Execucao REAL do hub publico https://github.com/brunooss1987-a11y/financeiro-testes/actions/runs/38583678164: gate de publicacao SUCCESS; Weine 7/7 testes sinteticos PASS, Casa Santana 6/6 testes sinteticos PASS, ambos com 0 falhas nos logs. Isso prova SOMENTE a infraestrutura e as invariantes da funcao DEMO, NAO o funcionamento dos motores reais.
- Documentada a matriz de cobertura em `docs/P4-1-continuidade-offline.md`; README do hub explica comandos `npm run test:weine`, `npm run test:casa` e `npm run guard`. Nenhuma autenticao Google, deploy, acesso a Sheets ou dados bancarios.
- PR #4 com proveniencia e bloqueio de copia de fontes privadas permanece EM SEPARADO e ABERTO, nao repetir ou contornar a recusa do merge/publicacao. Os sistemas operacionais privados e suas planilhas permanecem INALTERADOS.
- P4.1 permanece EM EXECUCAO/PARCIAL, pois nao ha identidade validada com codigo financeiro real. P0–P3 ja validadas, E-TEST permanece 5,00/6,00h = 83,33% concluido / 16,67% restante, Weine historica 19h = 92,11% inalterada.

## PROXIMA ACAO A EXECUTAR - SUJEITA A VERIFICACAO
1. Verificar o estado real do PR #5, os tres checks e o diff. Se merge ainda for permitido, incorporar somente este PR de testes sinteticos, depois exigir CI success na main e reler README, ROADMAP, HANDOFF e docs/P4-1-continuidade-offline.md. Se o merge for recusado, parar essa operacao e registrar, sem tentar outro caminho.
2. Manter PR #4 separado e SEM nova tentativa de incorporar as fontes privadas ou contornar qualquer bloqueio.
3. A proxima frente efetiva da P4.1 e um desenho de rastreabilidade de **codigo real privado**, sem acesso publico a ele: identificar contratos verificaveis entre versoes, executar testes reais apenas em ambiente autorizado e seguro, e documentar claramente a diferenca entre teste sintetico e E2E. Nao declarar P4.1 concluida com base apenas nos resultados do hub publico.
4. Faturamento GitHub privado permanece ADIADO a pedido do usuario. Nao exigir pagamento, novo token, servico pago ou acao do usuario para dar continuidade aos testes publicos. Preservar progresso anterior E-TEST 83,33% e Weine 92,11% ate efetiva validacao.
