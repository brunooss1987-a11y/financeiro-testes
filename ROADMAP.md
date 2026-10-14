# ROADMAP E-TEST — Testes publicos compartilhados

Status: expansao MULTIPROJETO independente, nao incorporada aos baselines Weine ou Casa Santana.
Baseline indicativo: 6 horas; progresso por peso, validacoes estritas.

| Etapa | Peso | Estado | Evidencia |
|---|---:|---|---|
| P0.1 Criar repo publico minimo e isolado | 0,25 h | VALIDADO | Repositorio publico brunooss1987-a11y/financeiro-testes criado, sem dados privados |
| P0.2 Executar piloto de seguranca e duas suites ficticias | 0,75 h | VALIDADO | GitHub Actions run 38572537327: Gate de publicacao, Piloto weine e Piloto casa-santana, todos SUCCESS |
| P1.1 Revisar politica de seguranca, branch protection e workflow permissions | 1,00 h | PENDENTE | Documento SECURITY.md publicado, mas nao ha prova de configuracao administrativa aplicada |
| P2.1 Inventariar e selecionar apenas testes offline Weine publicaveis | 1,50 h | PENDENTE | Precisa revisar codigo e contratos reais antes de publicar |
| P3.1 Inventariar e selecionar apenas testes offline Casa Santana publicaveis | 1,50 h | PENDENTE | Precisa revisar codigo e contratos reais antes de publicar |
| P4.1 Versionamento rastreavel e integracao documentada | 1,00 h | PENDENTE | Validar correspondencia exata entre codigo publico e privado |

P0: 1,00 h / 1,00 h = 100% concluida, 0% restante.
E-TEST: 1,00 h / 6,00 h = 16,67% concluido, 83,33% restante.
Weine F0-F16: 100%; E1: 62,50%; Weine F0-F16+E1: 92,11% (baseline historico 19h), INALTERADO.

CRITERIO DE SEGURANCA: nenhuma CI publica autentica Google, acessa repositorios privados, executa implantacao ou processa dados reais. Sucesso nos exemplos ficticios NAO equivale a homologacao financeira. Proibido misturar credenciais e identificadores de producao.

Proxima: P1.1, confirmar protecao da main e permissoes de workflows por API e testar guardas sem utilizar secrets; depois P2.1 (Weine) e P3.1 (Casa Santana) em revisoes separadas.
