# Financeiro-Testes — hub público Weine / Casa Santana / Comum

Este repositório reúne **exclusivamente código genérico publicável e testes sintéticos**. Os sistemas financeiros reais da Weine e da Casa Santana permanecem em **repositórios privados**. O sucesso da CI pública **não comprova** saldos, parcelas, pagamentos, Apps Script, Sheets nem homologação L1/L2 privada.

## Três áreas autônomas implantadas

| Área | Uso | Execução |
| --- | --- | --- |
| [`weine/`](weine/README.md) | Funções e testes **específicos** da Weine, quando publicáveis | `npm run test:weine` |
| [`casa-santana/`](casa-santana/README.md) | Funções e testes **específicos** da Casa Santana, quando publicáveis | `npm run test:casa` |
| [`comum/`](comum/README.md) | Utilitários realmente reutilizáveis pelos dois projetos | `npm run test:comum` |

**Regra de autoria:** uma funcionalidade exclusiva pertence ao seu projeto; não precisa servir aos dois. Apenas contratos/funções que realmente se repetem devem ser propostos em `comum/`. Essa área **complementa**, não substitui, as demais.

`weine/src/index.mjs` e `casa-santana/src/index.mjs` são fronteiras públicas próprias e, atualmente, reexportam as funções de moeda da área Comum. A biblioteca E-COM.1 é implementada em `src/shared/moeda-ptbr.mjs` e reexportada por `comum/src/index.mjs`; sua migração física **não ocorreu** para evitar novas mudanças fora do escopo. Consulte [o contrato monetário E-COM.1](docs/E-COM-1-conversao-moeda-ptbr.md).

## Como testar

Requer Node.js instalado; os testes atuais não dependem de pacotes externos e não solicitam autenticação.

| Comando | Escopo |
| --- | --- |
| `npm test` | Testes atuais de Weine (18), Casa Santana (17) e Comum (2): 37 casos |
| `npm run test:weine` | Cinco arquivos em `weine/tests/`, 18 casos |
| `npm run test:casa` | Cinco arquivos em `casa-santana/tests/`, 17 casos |
| `npm run test:comum` | `comum/tests/`, 2 casos |
| `npm run test:legacy` | Testes históricos `tests/weine/` e `tests/casa-santana/`, 35 casos |
| `npm run guard` | Rejeição de conteúdos proibidos nos arquivos públicos versionados |

Na [CI](.github/workflows/ci.yml) existem **três checks**: Gate de publicação, Piloto weine e Piloto casa-santana. O gate executa **26 testes de segurança** (incluindo cinco testes T5 e a ponte T3 que executa 37 casos das novas áreas), mais a regressão legada, a área Comum e o guard. Os pilotos executam diretamente as áreas novas e só são liberados após o gate. A CI mantém `contents: read`; não faz checkout privado, deploy ou upload de dados.

## Compatibilidade histórica deliberada

Os arquivos `src/shared/centavos-demo.mjs`, `contracts/public-demo.json`, `tools/check-local-contract.mjs`, `tools/prove-public-demo-run.mjs` e `tests/weine/piloto.test.mjs` permanecem nos caminhos antigos porque o contrato **`local-integrity/v1`** e a prova pública **`public-demo-run/v1`** dependem de caminho, hash e importação exatos. **Não mover, renomear, editar o hash, criar symlink ou apagar o legado silenciosamente.** Uma migração posterior exige versão de contrato e validação próprias.

Antes de qualquer mudança estrutural, conferir a referência `backup/e-arq-t2-pre-migracao-20261017` e seu SHA registrado no [plano de backup e rollback](docs/E-ARQ-T2-BACKUP-ROLLBACK.md). É uma branch Git de recuperação **não protegida como imutável**, não um backup externo.

## Manutenção e referências

Leia o [guia de manutenção e contribuição](docs/E-ARQ-GUIA-MANUTENCAO.md), a [decisão arquitetural ADR-0002](docs/ADR-0002-tres-areas-monorepo.md), o [roadmap E-ARQ](docs/ROADMAP-IMPLANTACAO-ARQUITETURA-V2.md), o [ROADMAP geral](ROADMAP.md), o [HANDOFF](HANDOFF.md) e a [política de segurança](SECURITY.md).

Publicações devem ser revisadas individualmente. Não transferir arquivos de repositórios privados, dados financeiros reais, IDs/URLs operacionais de planilhas, credenciais ou código Apps Script. O PR #4 e a P4.1 de evidência L1/L2 privada permanecem bloqueados; a E-INFRA-L2 foi adiada.
