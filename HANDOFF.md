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

## PROXIMA ACAO A EXECUTAR - SUJEITA A VERIFICACAO
1. Verificar estado real da main, PR de P2.1, CI e docs publicados antes de repetir ou concluir outra operacao. Nao repetir P0, P1.1 nem triagem P2.1 se persistirem validados.
2. Executar P3.1 SOMENTE LEITURA no repo privado Casa Santana: inventariar testes Node offline de logica pura que nao dependam de `src/` privado, dados reais, OAuth, Apps Script ou IDs; selecionar 1 candidato rastreavel e testar com fixtures inteiramente sinteticas em ambiente autorizado isolado. Se nao houver candidato seguro, registrar impeditivo de forma fundamentada sem publicacao.
3. Somente em P4.1, apos revisao do diff, proveniencia do codigo e checks de seguranca, avaliar PR publicavel de componentes reais selecionados. Nunca armazenar tokens ou copiar repositorios privados completos para hub; nunca declarar teste publico como homologacao financeira E2E.
