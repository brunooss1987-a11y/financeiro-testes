# E-ARQ T1 — Inventário técnico e mapa de dependências

**Referência:** `main` `fb849ef2547615ba042222fe1d2b829c55d90254` (2026-10-17).
**Fase:** T1 — inventário e mapa de dependências; esforço **0,50h já previsto** no E-ARQ de 5h.
**Método:** leitura de árvore Git não truncada, arquivos executáveis/configurações e contratos públicos. Não houve leitura ou cópia de código financeiro privado, alteração de runtime, upload de artefatos ou movimentação de arquivos.
**Estado final:** T1 **VALIDADA NA MAIN**; inventário/relatório publicados, sem executar migração ou backup.

## 1. Resultado do inventário completo

A árvore da `main` contém **52 arquivos versionados**, distribuídos em:

| Área atual | Arquivos | Destino planejado / decisão |
|---|---:|---|
| `tests/weine/` | 5 | `weine/tests/`, sujeito a compatibilidade de imports e comprovante v1 |
| `tests/casa-santana/` | 5 | `casa-santana/tests/`, sujeito a imports e contrato v1 |
| `tests/security/` | 2 | manter inicialmente como infraestrutura de segurança transversal, na raiz; não introduzir migração desnecessária |
| `src/shared/` | 2 | candidato a `comum/src/`; **`centavos-demo.mjs` preso ao contrato v1**, não mover nem apagar antes de T2 e decisão de compatibilidade; `moeda-ptbr.mjs` é livre da pinagem v1 |
| `tools/` | 6 | manter na raiz como ferramentas transversais; adaptar apenas os caminhos que precisarem |
| `.github/` | 2 | manter na raiz: CI e CODEOWNERS |
| `docs/` | 22 | documentos transversais e histórico permanecem na raiz; documentos novos de projeto podem ocupar `weine/docs/` ou `casa-santana/docs/` conforme escopo |
| outros na raiz | 8 | README, ROADMAP, HANDOFF, SECURITY, package, ignore, contrato e exemplo Sandbox; preservar sem migração arbitrária |
| **TOTAL** | **52** | `weine/`, `casa-santana/` e `comum/` **não existem fisicamente nesta referência** |

O inventário de arquivos executáveis inclui **12 testes Node** (Weine 5, Casa Santana 5, segurança 2), **6 ferramentas `tools/`**, **2 fontes de demonstração `src/shared/`**, um contrato JSON e uma CI. Não foram encontradas pastas de código de projeto operacional no hub público.

### Relação explícita dos arquivos de código/testes afetados

- **Weine (5):** `contrato-integridade.test.mjs`, `limites-sinteticos.test.mjs`, `moeda-ptbr.test.mjs`, `piloto.test.mjs`, `prova-publica-execucao.test.mjs`.
- **Casa Santana (5):** os mesmos cinco nomes sob `tests/casa-santana/`.
- **Segurança (2):** `tests/security/ci-summary.test.mjs`, `tests/security/publication-gate.test.mjs`.
- **Utilitários (6):** `tools/check-local-contract.mjs`, `check-publication.mjs`, `prove-public-demo-run.mjs`, `public-ci-summary.mjs`, `publication-guard-core.mjs`, `run-public-suite.mjs`.
- **Fontes públicas (2):** `src/shared/centavos-demo.mjs`, `src/shared/moeda-ptbr.mjs`.

### Documentação e governança indexadas (demais 30 arquivos)

- `.github/CODEOWNERS`, `.github/workflows/ci.yml`, `.gitignore`, `README.md`, `ROADMAP.md`, `HANDOFF.md`, `SECURITY.md`, `package.json`, `contracts/public-demo.json`, `examples/windows-sandbox-no-access.wsb`.
- `docs/ADR-0001-arquitetura.md`, `ADR-0002-tres-areas-monorepo.md`, `CRIACAO_MANUAL.md`, `E-COM-1-conversao-moeda-ptbr.md`, `E-OBS-1-observabilidade-ci-publica.md`, `E-SEC-1-gate-testes-negativos.md`, `P2-1-inventario-weine.md`, `P3-1-inventario-casa-santana.md`.
- `docs/P4-1-adr-vm-offline-proposta.md`, `P4-1-alternativas-l1-l2-sem-infra.md`, `P4-1-auditoria-conteudo-historico-publico.md`, `P4-1-auditoria-refs-publicas.md`, `P4-1-avaliacao-ambiente-isolado.md`, `P4-1-checklist-preflight-reversibilidade-vm.md`, `P4-1-continuidade-offline.md`, `P4-1-contrato-integridade-local.md`, `P4-1-ensaio-interno-sandbox.md`, `P4-1-gate-c-node-offline.md`, `P4-1-matriz-decisao-go-no-go-vm.md`, `P4-1-plano-contencao-refs-obsoletas.md`, `P4-1-protocolo-evidencia-privada.md`, `ROADMAP-IMPLANTACAO-ARQUITETURA-V2.md`.

**Classificação:** documentos históricos P2/P3/P4, ADRs e governança são transversais. Sua permanência no lugar original evita mudanças desnecessárias de links e preserva rastreabilidade; `docs/E-COM-1...` pode descrever futuro destino do componente, mas não exige mover o registro histórico.

## 2. Matriz de dependências que podem quebrar com a migração

| ID | Origem atual | Caminho / condição fixada | Dependentes / consequências | Estratégia T2–T5 |
|---|---|---|---|---|
| D01 | `package.json` | `npm test`, `test:weine`, `test:casa` executam `tests/weine/*.test.mjs`, `tests/casa-santana/*.test.mjs` | Mover testes sem ajustar os três scripts causa ausência de testes | Preparar scripts novos sem perder cobertura; provar execução real |
| D02 | `tools/run-public-suite.mjs` | nomes permitidos apenas `security`, `weine`, `casa-santana`; `join(root,'tests',suite)`; arquivos `*.test.mjs` regulares, 1–40 | A CI pública pode falhar fechado após mudar pastas | Alterar resolução apenas na T4, mantendo allowlist fixa, limites e rejeição de symlink |
| D03 | `.github/workflows/ci.yml` | `node tools/run-public-suite.mjs security` e matriz `[weine,casa-santana]`; jobs `Gate de publicacao` e `Piloto <suite>` | Checks já exigidos e contagem de suítes | Preservar os três nomes, `contents: read`, Gate antes dos dois pilotos e gatilhos atuais |
| D04 | `contracts/public-demo.json` | `schema=local-integrity/v1`, `scope=public-demo`, caminho **`src/shared/centavos-demo.mjs`** e SHA-256 pinado | `check-local-contract`, testes `contrato-integridade`, comprovante sintético | **Não mover nem editar o arquivo v1 antes de backup**; se necessário novo contrato, versionar v2 sem silenciosamente substituir v1 |
| D05 | `tools/check-local-contract.mjs` | `safeDemoPath` exige prefixo `src/shared/`, caminho relativo sem traversal; usa `lstatSync` e SHA-256 | Um contrato de caminho `comum/src/` falhará na versão atual | Manter verificador v1 para bytes originais; adaptar somente com contrato versionado/testes negativos adicionais |
| D06 | `tools/prove-public-demo-run.mjs` | `SOURCE_PATH=src/shared/centavos-demo.mjs`; `TEST_PATH=tests/weine/piloto.test.mjs`; literal esperado de import `from '../../src/shared/centavos-demo.mjs'` | Provas nas duas suítes chamam essa função; alterar caminho ou grafia rompe declaração de origem e digest | Manter prova v1 durante transição; se criar prova v2, não substituir critérios antigos |
| D07 | `tests/weine/*.test.mjs` | imports relativos `../../src/shared/centavos-demo.mjs`, `../../src/shared/moeda-ptbr.mjs`, `../../tools/` e fixture `../../contracts/public-demo.json` | Cinco testes Weine precisam revisão individual e os do comprovante dependem dos literais D04–D06 | Migrar por grupos pequenos e verificar todas as cinco suites e contrato |
| D08 | `tests/casa-santana/*.test.mjs` | os mesmos caminhos relativos; `moeda-ptbr.test.mjs` contém `import()` dinâmico de `centavos-demo` | Revisão de imports estáticos **e dinâmicos** obrigatória | Mapear e atualizar ambos, mantendo fixture e atestação v1 |
| D09 | `tests/security/` | `../../tools/publication-guard-core.mjs` e `../../tools/public-ci-summary.mjs` | Mover segurança sem atualizar imports faz gate falhar; não pertence ao domínio exclusivo de nenhum projeto | **Manter inicialmente** `tests/security/` na raiz |
| D10 | `tools/check-publication.mjs`, `publication-guard-core.mjs` | `git ls-files -z`, rejeição de nomes, conteúdo, symlinks e escapes, tamanho até 1 MiB | O gate cobre árvore versionada atual, não histórico nem acesso privado | Não reduzir regras, nem mudar escopo em T3/T4; executar antes e depois da migração |
| D11 | `tools/public-ci-summary.mjs` e `run-public-suite.mjs` | parser TAP estrito, labels fixos, `GITHUB_STEP_SUMMARY`, falha fechada quando testes falham/ausentes | Mudar caminho não pode emitir PASS sem testes | Exigir mesmas contagens ou aumento justificado; zero skipped/fail/cancelled/todo para PASS |
| D12 | `.github/CODEOWNERS` | `* @...`, e caminhos explícitos `.github/`, `tools/`, `src/`, `tests/` | Novas áreas cairiam no wildcard, mas sem indicação explícita de governança | Adicionar caminhos `weine/`, `casa-santana/`, `comum/` após revisar política, sem alterar permissões silenciosamente |
| D13 | `README.md`, `docs/ADR-0002...`, `docs/E-COM-1...`, docs P4 | referências e exemplos de `src/shared/`, `tests/weine/`, `tests/casa-santana/`; links para scripts públicos | Links/exemplos podem envelhecer, documentação histórica deve manter integridade | Atualizar docs operacionais em T6; não reescrever evidência histórica ou hashes pinados |
| D14 | `SECURITY.md` / `.gitignore` | proíbe fontes privadas, credenciais, planilhas e exportações; CI leitura apenas | Pasta nova **não autoriza** copiar motores privados nem desativar gate | Reutilizar guardas existentes em todas as três áreas; preservar proteção do histórico e da produção |
| D15 | `src/shared/moeda-ptbr.mjs` | parser/formatador BRL puro, sem manifesto SHA v1 | Suítes de ambas as áreas importam o mesmo módulo | Candidato a `comum/src/moeda-ptbr.mjs`, com atualização explícita de imports e testes de round-trip |
| D16 | `examples/windows-sandbox-no-access.wsb` | material histórico do fluxo P4.1, sem integração operacional à CI | Não é parte da migração estrutural E-ARQ | Preservar como exemplo histórico, não executar sandbox/VM |

**Mapa de imports e contagem dos testes atuais:** Weine 5 arquivos contendo **18 casos** (5 de integridade, 6 de limites, 5 de moeda, 1 piloto, 1 prova), Casa Santana 5 arquivos contendo **17 casos** (5, 5, 5, 1, 1), segurança 2 arquivos contendo **20 casos** (10+10). CI mais recente do baseline T0: run `39069814621` **3/3 SUCCESS**, Gate público 20/20, Weine 18/18, Casa Santana 17/17 documentados em execuções anteriores. **Observação:** `npm test` executa as duas suítes de projeto; o gate de segurança é executado separadamente na CI, não por esse script.

## 3. Grafo conceitual antes e depois

```text
ATUAL
CI -> tools/run-public-suite -> tests/{security,weine,casa-santana}
tests/weine -> src/shared/{centavos-demo,moeda-ptbr}
tests/casa-santana -> src/shared/{centavos-demo,moeda-ptbr}
tests/{weine,casa-santana} -> tools/{check-local-contract,prove-public-demo-run}
tests/security -> tools/{publication-guard-core,public-ci-summary}
tools/prove-public-demo-run -> contracts/public-demo.json
    -> src/shared/centavos-demo.mjs + tests/weine/piloto.test.mjs [v1 pinado]

ALVO (T3/T4; NAO IMPLEMENTADO AINDA)
CI -> runner seguro -> {weine/tests,casa-santana/tests} + tests/security
weine/tests -> weine/src + comum/src (quando houver dependencia)
casa-santana/tests -> casa-santana/src + comum/src
comum/src <- apenas modulo reutilizavel aprovado
legado v1 -> mantido em local original ou substituido apenas por v2 aprovado,
             com provas publicas anteriores preservadas
```

O legado `centavos-demo` é fictício e compartilhado, mas preso à atestação v1. A área `comum/` pode usar a cópia/contrato v2 **após** T2, sem substituir a origem histórica pinada nem criar symlink. A arquitetura permite futuras funcionalidades exclusivas de Weine e Casa Santana sem precisar replicá-las em comum.

## 4. Plano de validação da migração e portão de T2

**Antes de mover qualquer arquivo:** T2 criará backup verificável da árvore/commit (Git SHA, ref de recuperação imutável se possível) e plano de rollback por PR reverso; verificará a recuperação da versão inicial e bytes/hash de `centavos-demo`, `contracts/public-demo.json` e `tests/weine/piloto.test.mjs`. Um backup apenas documental sem ponteiro verificável não habilita T3.

**Critérios mínimos para T3/T4:** (1) preservação de 20 testes de segurança, 18 Weine e 17 Casa Santana, ou mudança justificada sem reduzir cobertura; (2) 3 checks de CI existentes com SUCESSO no PR e main; (3) prova v1 com `LOCAL_BYTES_MATCH`, `PUBLIC_DEMO_TEST_PASS`, sem alegação L1/L2; (4) matriz de imports estáticos/dinâmicos e runner sem arquivos ausentes; (5) `SECURITY.md`, `.gitignore` e `CODEOWNERS` coerentes; (6) zero dado privado adicionado.

**NO-GO / limite factual:** não foram validados compatibilidade de sistemas privados, OAuth, Google Sheets, regras reais financeiras nem L1/L2; P4.1 segue bloqueada. Este documento não autoriza alteração de histórico Git, exclusão de refs antigas, força de push, alteração de planilha ou de credenciais.

## 5. Progresso e próxima etapa

**T0 validada anteriormente:** 0,75/5,00h. **T1 VALIDADA:** 0,50/0,50h (100% da T1). Fase E-ARQ **1,25/5,00h = 25,00% concluída | 75,00% restante**; projeto E-TEST+E-ARQ **9,75/14,50h = 67,24% concluído | 32,76% restante**. Nenhuma expansão além das 5h já autorizadas.

**Próxima subetapa:** **T2 — Backup e plano reversível (0,75h)**, somente após a T1 ser validada na main. O backup deve preceder todas as mudanças físicas T3/T4.

## Evidência final de validação T1

PR #34 merged na main em `af1e50e9ed28097ed769941b12d273596f2dcb8f`; CI do PR [39070166228](https://github.com/brunooss1987-a11y/financeiro-testes/actions/runs/39070166228) e CI pós-merge [39070209547](https://github.com/brunooss1987-a11y/financeiro-testes/actions/runs/39070209547) COMPLETED SUCCESS nos três checks; readback confirmou mapa, roadmap específico, ROADMAP e HANDOFF na main. O PR tinha somente quatro arquivos documentais, nenhum código, runner, contrato, workflow ou dado financeiro alterado.

## PROXIMA ACAO A EXECUTAR - SUJEITA A VERIFICACAO

Conferir na próxima retomada os commits e CIs acima antes de repetir trabalho. **Executar T2 — backup verificável e plano reversível (0,75h)**, validando HEAD, refs e hashes originais do contrato v1, do somador e do teste piloto; nenhum movimento estrutural autorizado até esse backup ser confirmado. P4.1 L1/L2 privada pendente e E-INFRA-L2 adiada.
