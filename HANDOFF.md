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

## P4.1 — CONTRATO DE INTEGRIDADE LOCAL DEMONSTRATIVO, 2026-10-14

- Estado real verificado antes da operacao: hub publico main com PR #5 MERGED (commit 5004ae7f2f1d6957eefb5ee6a7431f1c38f71b58; run pos-merge 38584118449, 3/3 SUCCESS, 7 testes sinteticos Weine e 6 Casa Santana); PR #4 ainda ABERTO, SEM MERGE, bloqueio de publicacao nao contornado. Arvore da main sem pasta components/ nem fontes privadas.
- Em branch PR #6 foi implementado `tools/check-local-contract.mjs` (leitura local, SHA-256, scope restrito public-demo, bloqueio de symlinks, caminho inseguro e hash divergente), `contracts/public-demo.json` (fixa SOMENTE SHA-256 de src/shared/centavos-demo.mjs ja publico), cinco testes adicionais em cada suite, e `docs/P4-1-contrato-integridade-local.md`.
- Evidencia LOCAL dos 10 novos testes: 10/10 PASS, com execucao apenas em pasta temporaria avaliativa, sem Google ou codigo privado. Evidencia CI GitHub em PR #6: https://github.com/brunooss1987-a11y/financeiro-testes/actions/runs/38585806120; gate de publicacao SUCCESS, Piloto weine 12/12 PASS, Piloto casa-santana 11/11 PASS, zero falhas; logs lidos pela API.
- O resultado LOCAL_BYTES_MATCH significa SOMENTE igualdade de bytes de um arquivo demonstrativo e seu hash publico. Campos de resultado marcam false para teste executado, identidade de motor privado e homologacao E2E. Isso nao valida o codigo financeiro real.
- Nenhuma alteracao em planilhas, Apps Script ou nos dois repositorios privados; nenhuma tentativa de resolver faturamento, nenhuma transferencia bloqueada foi repetida.
- P4.1 EM EXECUCAO/PARCIAL, nao concluida. E-TEST 5,00/6,00h = 83,33% concluida / 16,67% restante; historico Weine 92,11% inalterado.

## P4.1 — RELEITURA FINAL DO CONTRATO PUBLICO NA MAIN

- PR #6 de verificacao offline por SHA-256 foi incorporado: https://github.com/brunooss1987-a11y/financeiro-testes/pull/6, commit `f637c96cf785255ee2d6886004487d74b0ad3e99`. Os cinco arquivos adicionados sao de codigo e dados demonstrativos publicos, nao provenientes dos repositorios financeiros privados.
- Evidencia apos merge: GitHub Actions https://github.com/brunooss1987-a11y/financeiro-testes/actions/runs/38586277288 `completed/success`; Gate de publicacao SUCCESS, Piloto weine 12/12 PASS, Piloto casa-santana 11/11 PASS (0 fail), confirmados na API e em logs de jobs.
- Releitura da main confirmou `tools/check-local-contract.mjs`, `contracts/public-demo.json`, ambos os testes, ROADMAP e este HANDOFF; arvore publica sem pasta `components/` ou arquivos de motores financeiros privados. PR #4 permanece ABERTO, sem merge, e NAO deve ser repetido.
- Evidencia limitada a hash de arquivo demonstrativo publico; nao atesta versao, execucao, calculos, autorizacao, operacoes ou Google Sheets dos sistemas reais.
- P4.1 ainda EM EXECUCAO/PARCIAL. E-TEST permanece 5,00/6,00h = 83,33% concluido | 16,67% restante. Weine historica 19h/92,11% inalterada.

## P4.1 — INVESTIGACAO DOS MECANISMOS PRIVADOS, 2026-10-14

- PROTOCOLO NOVO (DESENHADO, NAO EXECUTADO): `docs/P4-1-protocolo-evidencia-privada.md`. Define L0 (demonstracao publica), L1 (bytes privados ligados ao commit), L2 (teste real offline com dependencias efetivamente carregadas verificadas), L3 (runtime remoto conferido) e L4 (homologacao E2E em LAB). Ainda **nao** existe atestado L2 emitido por esse protocolo.
- Inspecao somente em leitura, sem modificar repositorios financeiros: Weine main valida sintaxe/manifesto; suas suites de LAB em PRs DRAFT fazem verificacoes Node e VM; testes WAC dependem de `clasp` remoto e NAO qualificam como offline. Casa Santana valida estrutura e sintaxe e despacha testes Node; ha provas por import direto de modulo puro e provas por carregamento de `.gs` em VM. Para ambas, e obrigatorio ligar a execucao ao commit exato, hashes dos bytes efetivamente lidos e ambiente confiavel.
- Nao houve acesso a Google Sheets, alteracao de dados, escrita no Apps Script, deploy, copia de codigo financeiro, chamada de secretos, criacao de runner nem revisao de faturamento privado.
- O contrato publico do PR #6 permanece DEMONSTRATIVO e nao suporta automaticamente arquivos privados. PR #4 com transferencia bloqueada segue ABERTO e NAO deve ser mesclado ou contornado.
- P4.1: ANALISE E PROTOCOLO DESENHADOS, MAS IMPLEMENTACAO PRIVADA/L2 E VALIDACAO FINANCEIRA AINDA PENDENTES. E-TEST 5,00/6,00h = 83,33% concluido / 16,67% restante; Weine historica 19h = 92,11% concluido / 7,89% restante. Potencial esforco adicional 2 a 4h NAO incluido no baseline atual.

## P4.1 — PRE-FLIGHT DO AMBIENTE ISOLADO (SOMENTE LEITURA) — 2026-10-14

- Objetivo: avaliar ambiente autorizado para futuro atestado PRIVADO L1/L2 sem depender de GitHub Actions privado, sem publicar codigo nem executar scripts financeiros no host.
- Resultado real da inspecao: plataforma Windows apta em principio, virtualizacao detectada, executavel do Windows Sandbox presente. HABILITACAO DO RECURSO E GUEST ISOLADO NAO COMPROVADOS, pois consultar o recurso exigiu elevacao administrativa indisponivel. WSL nao estava instalado e Docker/Podman nao foram localizados. Nao tratar Windows Sandbox presente como sandbox funcional/validada.
- Fontes de confianca: orientacoes Microsoft Learn para arquivos .wsb, rede e clipboard normalmente ativados no perfil padrao. Foi preparado APENAS um modelo INATIVO `examples/windows-sandbox-no-access.wsb`: networking, clipboard, dispositivos e vGPU desligados; ProtectedClient solicitado, nenhuma pasta compartilhada e nenhum comando automaticamente executado.
- Documento de decisao e preflight: `docs/P4-1-avaliacao-ambiente-isolado.md`. Requer primeiro comprovar ativacao sem instalar, depois inspecionar guest com dados sinteticos, aprovar runtime Node offline, definir entradas minimas e metodos de recolher evidencias sem exposicao; os arquivos candidatos permanecem nos repositorios privados.
- NAO houve elevacao, mudanca nas configuracoes de Windows, instalacao de software, inicio de VM/Windows Sandbox, copia de codigo financeiro, execucao de teste privado ou alteracao das planilhas. Nao foi produzido atestado L1/L2. Nenhum detalhe identificador do equipamento esta incluido no repo publico.
- PR #4 bloqueado continua ABERTO e nao deve ser mesclado ou contornado. PR #8 do protocolo L0-L4 ja estava publicado e a CI pos-merge 38588202738 estava SUCCESS antes desta acao.
- P4.1 permanece EM EXECUCAO, nao validada integralmente. E-TEST 5,00/6,00h = 83,33% concluido | 16,67% restante; historico Weine 19h = 92,11% concluido | 7,89% restante. Futuro deploy de ambiente isolado pode exigir expansao de escopo separada, ainda nao incorporada.

## PROXIMA ACAO A EXECUTAR - SUJEITA A VERIFICACAO
1. Verificar o estado REAL do PR que registra avaliacao e do perfil `examples/windows-sandbox-no-access.wsb`: arquivos na main, checks Gate/Weine/Casa Santana completos e STATUS pos-merge. Se aprovados, nao repetir diagnostico nem alterar documentos sem motivo.
2. Checar SOMENTE DE LEITURA se o Windows Sandbox esta realmente habilitado e operacional. A consulta anterior exigiu permissao administrativa; nao pedir elevacao automatica, instalar recursos, reiniciar o computador ou executar qualquer teste privado sem aprovacao dos gates.
3. Se for possivel comprovar a ativacao com seguranca, planejar/realizar primeiro um teste SINTETICO do confinamento com perfil .wsb: rede/clipboard desabilitados, sem mapeamentos, sem comandos de inicializacao e sem dados financeiros. Se o perfil nao abrir ou exigir mudanca do SO, registrar bloqueio e projetar alternativa privada reversivel com estimativa de esforco; nao criar runner permanente.
4. Somente apos gates A–F comprovados, preparar uma prova L1/L2 com UM modulo e teste revisados por projeto, em ambiente isolado, sem transferir fontes ao hub publico. As evidencias L1/L2 devem permanecer privadas e associadas a commit, hash de todos os bytes usados e resultado.
5. Adiar faturamento do GitHub conforme pedido, nao retomar o PR #4 de publicacao bloqueada, nao alterar bases de progresso nem considerar a P4.1 concluida sem integracao do codigo real.
