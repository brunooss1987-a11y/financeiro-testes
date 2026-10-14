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
- Resultado real da inspecao: plataforma Windows apta em principio, virtualizacao detectada, executavel do Windows Sandbox presente. A primeira consulta exigiu elevacao; uma segunda consulta via Win32_OptionalFeature confirmou InstallState=1 (Enabled) sem elevar privilegios. A INSTANCIA/ISOLAMENTO DO GUEST CONTINUAM NAO COMPROVADOS. WSL nao estava instalado e Docker/Podman nao foram localizados. Nao tratar Windows Sandbox presente como sandbox funcional/validada.
- Fontes de confianca: orientacoes Microsoft Learn para arquivos .wsb, rede e clipboard normalmente ativados no perfil padrao. Foi preparado APENAS um modelo INATIVO `examples/windows-sandbox-no-access.wsb`: networking, clipboard, dispositivos e vGPU desligados; ProtectedClient solicitado, nenhuma pasta compartilhada e nenhum comando automaticamente executado.
- Documento de decisao e preflight: `docs/P4-1-avaliacao-ambiente-isolado.md`. A ativacao foi confirmada via WMI; requer agora testar guest apenas com dados sinteticos, aprovar runtime Node offline, definir entradas minimas e metodos de recolher evidencias sem exposicao; os arquivos candidatos permanecem nos repositorios privados.
- NAO houve elevacao, mudanca nas configuracoes de Windows, instalacao de software, inicio de VM/Windows Sandbox, copia de codigo financeiro, execucao de teste privado ou alteracao das planilhas. Nao foi produzido atestado L1/L2. Nenhum detalhe identificador do equipamento esta incluido no repo publico.
- PR #4 bloqueado continua ABERTO e nao deve ser mesclado ou contornado. PR #8 do protocolo L0-L4 ja estava publicado e a CI pos-merge 38588202738 estava SUCCESS antes desta acao.
- P4.1 permanece EM EXECUCAO, nao validada integralmente. E-TEST 5,00/6,00h = 83,33% concluido | 16,67% restante; historico Weine 19h = 92,11% concluido | 7,89% restante. Futuro deploy de ambiente isolado pode exigir expansao de escopo separada, ainda nao incorporada.

## P4.1 — CORRECAO VERIFICADA DE ESTADO DE ATIVACAO

- O recurso Windows Sandbox esta efetivamente **HABILITADO** no sistema consultado, segundo `Win32_OptionalFeature.Name=Containers-DisposableClientVM` e `InstallState=1`; Microsoft Learn define 1 como Enabled. Consulta feita somente em leitura, sem privilegio administrativo e sem alteracao do computador.
- A confirmacao NAO atesta que a instancia Windows Sandbox inicia nem que sua configuracao segura seja aplicada. Os gates de isolamento (B), runtime offline (C), fontes privadas minimas (D), provas de saida (E) e politica de execucao (F) permanecem PENDENTES.
- O arquivo `examples/windows-sandbox-no-access.wsb` permanece INATIVO. Nenhum guest, codigo financeiro, WSL, Docker ou script privado foi iniciado pela avaliacao.
- P4.1 continua EM EXECUCAO, sem alterar os percentuais E-TEST 83,33% / 16,67% e Weine 92,11% / 7,89%.

## P4.1 — GATE B OBSERVABILIDADE INTERNA AINDA PENDENTE, 2026-10-14

- Estado antes do ensaio: Windows Sandbox estava HABILITADO e nao existia sessao iniciada. Perfil temporario .wsb fail-closed conferido por XML: Networking=Disable, ClipboardRedirection=Disable, sem mapeamentos e sem comando de inicializacao, audio/video/impressora desabilitados.
- OBSERVADO no HOST: a sessao WindowsSandboxRemoteSession abriu e possuia janela. O launcher WindowsSandbox.exe encerrou enquanto a sessao/VM se mantinha ativa, de modo que somente observar o launcher pode dar falso negativo de boot.
- NAO COMPROVADO: status real de rede, clipboard, pastas do host, comandos ou politicas do INTERIOR da VM. Nao houve log confiavel do guest; capturar pixels da janela por si so nao comprova isolamento. Nenhum comando foi executado dentro da Sandbox.
- LIMPEZA VERIFICADA: sessao remota encerrada, sem processo WindowsSandboxRemoteSession restante; arquivo .wsb e imagem temporaria removidos. Sem fonte privada, dados financeiros, Node, credenciais, acesso Google ou mudancas do Windows.
- Bloqueio tecnico: ferramentas de terminal remoto atuais nao ofereceram controle/leitura verificavel do conteudo interno da VM. Nao inventar aprovacao do Gate B e nao tentar passar codigo privado por um canal nao homologado.
- Estado ponderado: P4.1 EM EXECUCAO, Gate B PARCIAL, L1/L2 PENDENTES. E-TEST 5/6h = 83,33% concluido | 16,67% restante; Weine 92,11% inalterada. PR #4 bloqueado continua separado e faturamento privado ADIADO.

## P4.1 — TESTE SINTETICO DENTRO DA SANDBOX, 14/10/2026

- Estado do guest antes do ensaio: perfil .wsb VALIDADO com Networking=Disable e ClipboardRedirection=Disable, sem MappedFolders nem LogonCommand. A janela WindowsSandboxRemoteSession foi observada por PrintWindow e interagida somente depois de conferir foco.
- NO GUEST: cmd abriu; `ipconfig` nao listou adaptadores; `net use` nao listou conexoes de rede; `Get-PSDrive -PSProvider FileSystem` apresentou apenas `C:\` do guest.
- CLIPBOARD: marcador 100% ficticio foi inserido no guest via `clip` e recuperado via `Get-Clipboard` dentro do guest. Consulta booleana no host confirmou que o marcador NAO transitou ao clipboard principal. Clipboard existente no host NAO foi copiado, modificado ou divulgado. Sentido host->guest permanece NAO AFERIDO.
- LOGICA DE ACEITE: os controles operacionais observados passaram, mas nao equivalem a prova de ausencia de quaisquer canais ocultos ou a certificacao de seguranca adversarial. Gate B = PARCIAL para isolamento bidirecional. Gates C-F, atestados L1/L2 e testes financeiros reais permanecem PENDENTES.
- APOS O ENSAIO: sessao remota encerrada e segunda consulta confirmou ausencia do processo; perfil/capturas temporarios apagados. Nenhum codigo privado, token, Apps Script, Node, ou dado financeiro processado. Nenhuma captura/resultado com dado pessoal publicada. Evidencias sanitizadas em `docs/P4-1-ensaio-interno-sandbox.md`.
- PR #4 bloqueado continua separado. P4.1 NAO concluida. E-TEST 5,00/6,00 h = 83,33% concluido | 16,67% restante; Weine historica 92,11% | 7,89% inalterados. Faturamento privado continua adiado.

## P4.1 — GATE C NODE PORTATIL OFFLINE, ESTUDO SOMENTE LEITURA — 2026-10-14

- Confirmacao do estado antes da acao: PR #12 MERGED, commit main `09558969b3dc7bda386b4fe449ae73534cbc3cf6`; run publico `38595914371` completed/success. PR #4 continua aberto e NAO merged. Os tres Google Docs E-TEST (ROADMAP, HANDOFF e CHECKPOINT) foram relidos: a atualizacao do ciclo anterior nao havia sido persistida; nao repetir insercao sem primeiro confirmar revisao.
- Gate B anterior: `ipconfig` sem adaptadores no guest, `net use` sem conexoes, `Get-PSDrive` apenas C: e marcador ficticio guest->host nao transmitido. Host->guest NAO aferido; portanto Gate B permanece PARCIAL.
- Gate C: consulta SOMENTE LEITURA no equipamento autorizado detectou Node.js v24.16.0 no HOST e calculou SHA-256 do binario sem publicar hash nem caminho; nenhum pacote portable foi verificado como autentico nem colocado no guest. Consulta oficial encontrou ZIP Windows x64 e manifesto SHASUMS256 da release LTS Node v24.21.0. Nenhum download, instalacao ou teste foi efetuado.
- Sob `Networking=Disable`, `ClipboardRedirection=Disable` e AUSENCIA `MappedFolders/LogonCommand` da politica em vigor, nao existe caminho verificado de entrada/saida para binario de Node e atestados L1/L2. A Microsoft suporta mapeamento read-only, mas isso altera explicitamente a regra atual e NAO foi autorizado ou implantado.
- Decisao arquitetural: NAO enfraquecer isolamento nem transferir codigo privado para o hub publico. Investigar apenas em leitura se existe VM descartavel privada com midia offline somente leitura/preprovisionamento, como alternativa; nenhuma infraestrutura foi criada. Gate C continua PENDENTE/BLOQUEADO. Especificacao em `docs/P4-1-gate-c-node-offline.md`.
- P4.1 EM EXECUCAO, E-TEST 5h/6h = 83,33% concluido | 16,67% restante; Weine historica 92,11% concluida | 7,89% restante. Atendidos apenas testes publicos sintéticos e Gate B parcial. Nenhum L1/L2 criado, nenhum motor privado executado, nenhum faturamento tratado.

## P4.1 — AVALIACAO FORMAL DE VM PRIVADA OFFLINE, 2026-10-14

- Fontes verificadas ANTES de agir: GitHub publico `main` = `b34785247b177a87e52dcc7fae575c2f3101b1a7`, PR #13 merged e CI run 38598085000 3/3 SUCCESS; PR #4 aberto e NAO merged. Google Drive ROADMAP/HANDOFF/CHECKPOINT E-TEST relidos; registravam Gate C bloqueado e inventario de VM, sem divergencia factual ate esta avaliacao. Nenhuma etapa P0-P3 foi repetida.
- NOVA EVIDENCIA somente de leitura: memoria e armazenamento do computador mostram possibilidade de hospedar uma VM Linux pequena em unidade secundaria, com volume do sistema de folga limitada. Valores/identificadores da maquina NAO foram publicados no hub. Hyper-V completo desabilitado, sem Get-VM, sem VM adicional pronta, sem download, alteracao do Windows ou gastos.
- PESQUISA tecnica na Microsoft Learn: Hyper-V em Windows 11 Pro e VMs Generation 2 suportam VHDX e ISO virtual; a ativacao exige mudanca relevante do host/possivel reinicio e controles adicionais. Windows Sandbox sem Networking/Clipboard/MappedFolders nao possui canal aprovado para entregar Node e retirar atestado.
- NOVO documento `docs/P4-1-adr-vm-offline-proposta.md`: arquitetura FUTURA proposta Hyper-V com Linux minimo offline, sem NIC/sessao aprimorada/compartilhamento de host, ISO de entrada somente leitura, execucao L1/L2 controlada e saida por disco virtual dedicado apos shutdown sujeito a validacao de seguranca. NAO foi construida/validada. Alternativa de mapeamento read-only do Windows Sandbox EXIGIRIA alterar politica e nao foi aplicada.
- ESCOPO: proposta adicional E-INFRA-L2 estimada em 10 a 16 horas (infrainstalacao, provas e homologacao), SEM aprovacao/INCORPORACAO. Baseline E-TEST 6,00h e progresso ponderado 5,00/6,00h = 83,33% concluido, 16,67% restante MANTIDOS. Baseline historico Weine 19h = 92,11% concluido/7,89% restante MANTIDO. Nao recalcular silenciosamente.
- ESTADO DOS GATES: Gate B parcial (clip host->guest e testes adversariais nao provados); Gate C bloqueado pela inexistencia de meio aprovado de importar/exportar runtime/atestado no perfil restritivo; Gates D-F e atestados L1/L2 privados PENDENTES. P4.1 NAO concluida.
- Nenhum codigo privado, dados bancarios, credenciais, arquivo de laboratorio, Apps Script, acesso para escrita a planilhas ou alteracao de configuracao de host foi feito.

## P4.1 — CHECKLIST PREFLIGHT E REVERSIBILIDADE SEM IMPLANTACAO (2026-10-14)

- ESTADO REAL CONFIRMADO antes da acao: hub publico main `a097940d4f647acfeed362c9aab6d044bf162e75` do PR #14; run 38599899954 SUCCESS com tres jobs obrigatorios. PR #4 permanece ABERTO, NAO merged. ROADMAP, HANDOFF e CHECKPOINT E-TEST no Google Drive foram relidos e estavam atuais ate a avaliacao de VM do PR #14; nao duplicar ou reescrever evidencias antigas.
- ESPECIFICACAO NOVA: `docs/P4-1-checklist-preflight-reversibilidade-vm.md` — criterios G0-G9 com decisao de escopo, backup independente do HOST, recursos/disk, ISO Linux autenticado, Node LINUX x64 com hash/assinatura, Secure Boot para distribuicao, Gen2 sem NIC/switch/clipboard/pastas, ISO sintetico read-only, saida VHDX dedicada sob auditoria, execucao somente sintética, desligamento/descarte e rollback.
- TODOS os gates G0-G9 = NOT_TESTED/NAO AUTORIZADOS operacionalmente. Documento redigido NAO significa implantacao, aprovacao de fonte privada, capacidade garantida, seguranca adversarial certificada ou progresso ponderado adicional. Checkpoint de VM nao substitui backup independente.
- NOVA PESQUISA: Microsoft Learn confirma suporte da VM Gen2 a ISO/VHDX e Secure Boot (Linux requer configuracao de certificado adequada) e explica limites dos checkpoints para recuperacao. Fontes diretamente ligadas no checklist. Nenhuma ISO, runtime, VM ou software foi criado, baixado, instalado ou inicializado.
- ESTADO DOS SISTEMAS: P4.1 EM EXECUCAO; Gate B Sandbox PARCIAL, C pendente/sem canal aprovado no perfil restritivo, D-F NAO validados, L1/L2 privados inexistentes. E-INFRA-L2 de 10 a 16h e apenas EXPANSAO PROPOSTA e NAO incorporada. E-TEST 5,00/6,00h = 83,33% concluido/16,67% restante; Weine historica 92,11% concluido/7,89% restante. Nada mudou nas planilhas, formulas, relacoes ou repositorios financeiros.


## P4.1 — MATRIZ DOCUMENTAL GO/NO-GO E RECUPERACAO EMERGENCIAL — 2026-10-14
- Novo parecer em `docs/P4-1-matriz-decisao-go-no-go-vm.md` confronta checklist G0-G9 e ADR de VM offline: bloqueios, donos por funcao, provas de aceite, vetos e rollback. Todos gates operacionais continuam NOT_TESTED e G0 NAO AUTORIZADO. Decisao atual: NO-GO de implantacao; esta redacao nao aprova VM nem atestados L1/L2.
- Recuperacao de conversa cheia: docs E-TEST ROADMAP, HANDOFF e CHECKPOINT no Drive encontrados e relidos na pasta Handoffs e Checkpoints. Main previa = PR #15 merge `91ef92c66e139ea216536f72ae0b867dae96df48`, CI run 38601176719 tres jobs SUCCESS; PR #4 OPEN/bloqueado. Nenhuma operacao de infraestrutura ou fontes privadas repetida.
- Percentuais preservados: E-TEST 5/6h = 83,33% concluido/16,67% restante; Weine historica 92,11%/7,89%. Expansao E-INFRA-L2 de 10-16h proposta, ainda NAO incorporada.


## P4.1 — ALTERNATIVAS SEM INFRA E PILOTO DE RECIBO PUBLICO — 2026-10-14
- RECONCILIACAO: main antes da branch = e5b7efb14f4adf9b0ed683b33fdaaef14b3e381b, PR #16 merged, run pos-merge 38604767132 SUCCESS. PR #4 aberto/bloqueado. Tres Docs E-TEST da pasta indicada relidos. Conselho de Escalonamento decidiu ADIAR E-INFRA-L2, nao incorporar 10–16h nem autorizar Windows, VM ou reboot.
- ESTUDO NOVO: docs/P4-1-alternativas-l1-l2-sem-infra.md compara API Git read-only, CI historica privada, host Node, Sandbox sem canais, CI publica sintética, Actions privado e VM offline. CI historica da Casa Santana foi reconfirmada por metadados de run/job (SUCCESS no commit historico); isto NAO comprova manifesto de bytes carregados nem posflight exigidos por L2. Consulta sem novos testes privados e sem copiar fontes.
- IMPLEMENTADO EM BRANCH: tools/prove-public-demo-run.mjs e testes sintéticos separados nas duas suites, fazendo hash fixado de fonte publica, digest de teste, rodada controlada do piloto publico, posflight e flags L1/L2 explicitamente false. Nao e atestado de codigo privado nem certificacao de isolamento. VALIDACAO PENDENTE ate PR, CI e main/readback.
- P4.1 permanece EM EXECUCAO. G0 sem autorizacao de VM, G1–G9 NOT_TESTED, Gate B parcial, C bloqueado. L1/L2 privados NAO produzidos. E-TEST 5/6h = 83,33% concluido | 16,67% restante; Weine historica 92,11% | 7,89%. E-INFRA-L2 continua adiada/nao incorporada. Sem alteracao de formulas, dados, planilhas, Google, Windows, repos privados ou billing.

## E-SEC.1 — EXPANSAO DE TESTES NEGATIVOS DO GATE (2026-10-14)

- **ESTADO ANTES:** main `256f1ae6c7287b12b318151791c4c47b42ceec3e`, PR #17 merged, Gate publico sem `tests/security`, scanner usando `statSync` e fluxo de 3 checks existentes; PR #4 continua bloqueado. Nenhuma P4.1 privada reexecutada.
- **DECISAO DE ESCOPO E PESOS ANTES DE MUDANCA:** adicionar E-SEC.1 independente, estimativa 1,00h. E-TEST historico 5,00h de 6,00h = 83,33%; novo baseline **7,00h**, 5,00/7,00h = **71,43% concluido / 28,57% restante** enquanto E-SEC.1 nao validada. Apos concluir, 6,00/7,00h = **85,71% / 14,29%**, mantendo P4.1 pendente. Weine historica (19h, 92,11%) preservada. E-INFRA-L2 10–16h adiada e fora do baseline.
- **IMPLEMENTADO NA BRANCH, NAO HOMOLOGADO AINDA:** `tools/publication-guard-core.mjs` extrai regras atuais e recusa symlinks, travessia e arquivos acima de 1 MiB; `tools/check-publication.mjs` preserva `git ls-files -z`; `tests/security/publication-gate.test.mjs` contem 10 testes com dados ficticios em temporarios; job `Gate de publicacao` executa suite negativa sem alterar nomes dos tres checks; descricao e matriz em `docs/E-SEC-1-gate-testes-negativos.md`.
- **LIMITES:** gate cobre arquivos atuais do hub publico, nao historico Git completo nem atestados de codigo privado; dados de teste ficticios. Nenhuma planilha, Apps Script, VM, Hyper-V, OAuth, credencial, billing ou repo privado alterado.

## PROXIMA ACAO A EXECUTAR - SUJEITA A VERIFICACAO
1. Conferir HEAD, diff, status do PR de E-SEC.1 e CI (10 testes de seguranca + 3 checks nomeados); nunca marcar VALIDADO antes dos resultados observados.
2. Se passar, mesclar pelo processo protegido, conferir os tres checks de CI da main e reler `ROADMAP.md`, `HANDOFF.md` e os novos arquivos antes de registrar E-SEC.1 100% e E-TEST 85,71%.
3. Somente quando houver conclusao/validacao real, atualizar ROADMAP/HANDOFF com resultados. Nao repetir testes ja validados ou contornar bloqueios de Drive. Preserve PR #4 aberto/bloqueado e P4.1 pendente.
