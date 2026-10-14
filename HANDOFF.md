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

## PROXIMA ACAO A EXECUTAR - SUJEITA A VERIFICACAO
1. Conferir estado REAL do PR #1 (merge, jobs e ramo main) e do ROADMAP/HANDOFF publicados. Nao repetir P1.1 se controle persistir validado.
2. Iniciar P2.1 SOMENTE em leitura no repositorio privado Weine: listar candidatos de testes offline sem rede/autenticacao e sem referencia a dados ou IDs reais; classificar publicavel/nao publicavel, catalogar hashes, riscos e dependencia. Nao copiar nem publicar ainda.
3. Depois revisar criterios dos testes da Casa Santana na subetapa P3.1, mantendo separacao; qualquer alteracao exige PR, security gate e 3 checks completos, sem segredos, OAuth ou Apps Script remoto.
