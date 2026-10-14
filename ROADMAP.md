# ROADMAP E-TEST — Testes publicos compartilhados

Status: expansao MULTIPROJETO independente, nao incorporada aos baselines Weine ou Casa Santana.
Baseline indicativo: 6 horas; progresso por peso, validacoes estritas.

| Etapa | Peso | Estado | Evidencia |
|---|---:|---|---|
| P0.1 Criar repo publico minimo e isolado | 0,25 h | VALIDADO | Repositorio publico brunooss1987-a11y/financeiro-testes criado, sem dados privados |
| P0.2 Executar piloto de seguranca e duas suites ficticias | 0,75 h | VALIDADO | GitHub Actions run 38572537327: Gate de publicacao, Piloto weine e Piloto casa-santana, todos SUCCESS |
| P1.1 Revisar politica de seguranca, branch protection e workflow permissions | 1,00 h | VALIDADO | Configuracoes verificadas por GitHub API: main protegida, 3 checks exigidos inclusive para admin, 0 revisoes externas obrigatorias (mantenedor unico), sem force push/exclusao; Actions apenas checkout SHA; PR externo exige aprovacao previa; PR #1 CI 3/3 SUCCESS (run 38574081937) |
| P2.1 Inventariar e selecionar apenas testes offline Weine publicaveis | 1,50 h | VALIDADO | Auditoria de fontes e classificacao por risco; dupla overwrite-guard E1.4 com Git blob SHA verificado e 7 testes offline PASS; arquivo docs/P2-1-inventario-weine.md (nenhum codigo privado publicado) |
| P3.1 Inventariar e selecionar apenas testes offline Casa Santana publicaveis | 1,50 h | PENDENTE | Precisa revisar codigo e contratos reais antes de publicar |
| P4.1 Versionamento rastreavel e integracao documentada | 1,00 h | PENDENTE | Validar correspondencia exata entre codigo publico e privado |

P0: 1,00 h / 1,00 h = 100% concluida, 0% restante.
P1: 1,00 h / 1,00 h = 100% concluida, 0% restante.
P2: 1,50 h / 1,50 h = 100% concluida, 0% restante.
E-TEST: 3,50 h / 6,00 h = 58,33% concluido, 41,67% restante.
Weine F0-F16: 100%; E1: 62,50%; Weine F0-F16+E1: 92,11% (baseline historico 19h), INALTERADO.

CRITERIO DE SEGURANCA: nenhuma CI publica autentica Google, acessa repositorios privados, executa implantacao ou processa dados reais. Sucesso nos exemplos ficticios NAO equivale a homologacao financeira. Proibido misturar credenciais e identificadores de producao.

EVIDENCIAS P1.1 (14/10/2026): GET repos/.../actions/permissions = enabled=true, allowed_actions=selected, sha_pinning_required=true. GET selected-actions = github_owned_allowed=false, verified_allowed=false, unico padrao permitido actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683. GET workflow = read e can_approve_pull_request_reviews=false. GET fork-pr-contributor-approval = all_external_contributors. GET branches/main/protection = enforce_admins=true, required_status_checks.strict=true, contexts ['Gate de publicacao','Piloto weine','Piloto casa-santana'], required_pull_request_reviews.required_approving_review_count=0, required_linear_history=true, required_conversation_resolution=true, allow_force_pushes=false, allow_deletions=false. PR #1 testado por GitHub Actions run 38574081937, 3/3 SUCCESS. Nenhum dado privado foi publicado.

EVIDENCIAS P2.1 (14/10/2026): Weine main (59 arquivos) e PRs privados E1.4 #105 (79 arquivos) / E-DIV.2 #107 (89 arquivos), triagem por tipo de teste e dependencias. Fonte exata lab-e14/overwrite-guard.mjs (Git blob SHA 148666fc3ee4dd5de1fa38843a24226a98c89986) e teste adjacente (SHA 6bff970930553d85c1d7faa7c478cc80a37c460b) foram lidos autenticados, validados por hash Git e testados localmente: 7 verificacoes PASS, pasta temporaria eliminada. Ambos classificados como CANDIDATOS CONDICIONAIS para futura revisao P4.1, NAO publicados. Manifestos, scripts, snapshots, fluxo WAC e mocks E-DIV.2 permanencem privados por dependencia de dados/IDs/Google/arquivos. Relatorio no docs/P2-1-inventario-weine.md.

Proxima: P3.1 auditar de modo independente os testes offline Casa Santana; nao copiar nem publicar codigo privado ate avaliacao. P4.1 cuidara de correspondencia de versao e eventual publicacao controlada.
