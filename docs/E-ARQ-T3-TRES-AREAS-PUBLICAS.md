# E-ARQ T3 — Implantação física inicial das três áreas públicas

**Data:** 2026-10-17. **Etapa:** T3, esforço **1,25h**, já previsto no roadmap E-ARQ de 5h. **Estado final:** T3 **IMPLEMENTADA E VALIDADA NA MAIN**; PR, CI e readback comprovados. **Não houve expansão adicional.**

## 1. Pré-condições GO confirmadas

- A `main` antes de T3 estava em `d739755f276423e4f342532d0d0c024d3f3d5fd8`, com CI `39071171700` COMPLETED/SUCCESS nos três checks e T2 VALIDADA no ROADMAP/HANDOFF.
- A branch `backup/e-arq-t2-pre-migracao-20261017` foi resolvida novamente em `53a4a6eba6ada83b4bcee1f28824257799bfa4b0`. A árvore de backup, anterior ao PR #36, não estava truncada, continha os **53 arquivos originais** e o arquivo protegido `src/shared/centavos-demo.mjs` mantinha o mesmo blob SHA-1 `734b5809e875d9d6cd9c5c4c2b4ecb8e9c984211`.
- `contracts/public-demo.json` continua no blob `06f1eca7e69ad689d7ea4f153473ea7b3dad5813`, com o SHA-256 fixo da fonte fictícia, já conferido na T2. Nenhum backup foi movido, apagado ou atualizado para a branch atual.
- A migração foi deliberadamente **aditiva**: se um teste ou import novo falhar, retirar somente os arquivos novos por PR, sem mexer nos caminhos v1.

## 2. Estrutura implantada (adição, não cópia de motores reais)

```text
weine/
  README.md
  src/index.mjs
  tests/{contrato-integridade,limites-sinteticos,moeda-ptbr,
         piloto,prova-publica-execucao}.test.mjs

casa-santana/
  README.md
  src/index.mjs
  tests/{contrato-integridade,limites-sinteticos,moeda-ptbr,
         piloto,prova-publica-execucao}.test.mjs

comum/
  README.md
  src/index.mjs
  tests/moeda-ptbr.test.mjs
```

**Domínios independentes:** `weine/src/index.mjs` e `casa-santana/src/index.mjs` são pontos de entrada **próprios** que podem ganhar funcionalidades exclusivas, sem obrigação de compartilhamento. Nesta T3 não foi inventada lógica financeira exclusiva só para preencher a árvore: os dois pontos de entrada apenas importam a função fictícia reutilizável. A área `comum/src/index.mjs` reexporta o parser/formatador BRL já validado pela E-COM.1, com a implementação original conservada em `src/shared/moeda-ptbr.mjs`. É um **adaptador temporário**, não uma segunda versão divergente.

**Migração preparatória de testes:** cinco arquivos públicos existentes de cada suíte foram copiados em `weine/tests/` e `casa-santana/tests/`. O teste de moeda em cada projeto foi redirecionado ao respectivo `../src/index.mjs` para comprovar a fronteira nova. Os outros **oito testes copiados mantêm os mesmos bytes/imports** que os originais, inclusive os testes que ainda referenciam a demonstração v1 protegida. Os cinco testes de cada suíte **continuam no caminho original** até T4 atualizar runner, npm e a política de descoberta.

**Comum:** `comum/tests/moeda-ptbr.test.mjs` verifica que o adaptador fornece as **mesmas funções** da implementação pública já aprovada e confirma um round-trip fictício. Nenhum dado real foi publicado.

**Prova transitória em CI:** `tests/security/areas-publicas.test.mjs` invoca apenas uma lista fixa de arquivos de teste das novas áreas, via `spawnSync` sem shell, com limite de tempo e buffer. Exige **37 testes PASS** (18 Weine, 17 Casa Santana, 2 Comum), 0 FAIL, sem alterar `tools/run-public-suite.mjs` ou `.github/workflows/ci.yml`. O gate de segurança original passa a ter 21 casos (20 originais + a prova de layout) se validado. Na T4, quando o runner executar diretamente as novas suítes, rever a necessidade desse teste transitório, **sem reduzir cobertura**.

## 3. Arquivos legados preservados

- `src/shared/centavos-demo.mjs`: conteúdo/sha do `local-integrity/v1` e caminho v1 intactos.
- `contracts/public-demo.json`, `tools/check-local-contract.mjs`, `tools/prove-public-demo-run.mjs`, `tests/weine/piloto.test.mjs`: exatamente os contratos/caminhos anteriores. O comprovante `public-demo-run/v1` não foi reescrito.
- `tests/weine/`, `tests/casa-santana/` e `tests/security/`: suites originais preservadas; apenas um teste de segurança adicional, sem desativar os antigos.
- `package.json`, `tools/run-public-suite.mjs`, `.github/workflows/ci.yml`, `.github/CODEOWNERS`: nenhum script, runner, permissão ou nome de check alterado na T3. Eles serão tratados na T4.
- `SECURITY.md`, `.gitignore` e toda infraestrutura privada: intactos.

## 4. Portões de aceite

1. O PR T3 deve afetar somente arquivos **adicionados** nas três áreas, a prova transitória de segurança e estes documentos de andamento; nenhuma exclusão de código/contratos/testes existentes.
2. Gate de publicação deve PASS, com **21/21** testes de segurança incluindo a execução real das novas suites (37/37); Weine **18/18** e Casa Santana **17/17** nos caminhos originais. Uma falha da prova transitória deve bloquear todo o PR.
3. Executar CI 3/3 no PR e na main após merge; fazer readback da árvore das três áreas e dos arquivos críticos, verificando que hashes/blobs v1 não mudaram.
4. Preservar branch de backup fixa. Não executar integração privada, autenticação OAuth, Apps Script ou mudança em planilhas, IDs, fórmulas e lançamentos.
5. Apenas depois dessa validação T3 poderá ser marcada **VALIDADA** no ROADMAP e HANDOFF e iniciada T4.

**Limite:** T3 criou áreas e cópias com imports adequados, mas a CI ainda usa os diretórios originais como suítes principais; a transição do runner e dos npm scripts pertence à **T4**.

## 5. Progresso ponderado (sem nova expansão)

- E-ARQ T0+T1+T2: **2,00/5,00h = 40%** VALIDADO antes desta etapa.
- E-ARQ T3: **1,25h**, IMPLEMENTADA na branch, não VALIDADA até o PR/CI/readback.
- **Após T3 VALIDADA**: fase E-ARQ **3,25/5,00h = 65,00% concluída | 35,00% restante**.
- Projeto E-TEST+E-ARQ, baseline 14,50h: **11,75/14,50h = 81,03% concluído | 18,97% restante**.
- Histórico Weine F0–F16 15h e histórico de 19h/92,11% INALTERADOS; P4.1 L1/L2 privada pendente, E-INFRA-L2 adiada.

## 6. Evidências finais de aceite (2026-10-17)

PR #38 incorporado à `main` no commit público `c650cb5c4b60ac7e29d6f6daeed7c25ec9f3d3c6`. CI inicial `39071904094` FALHOU no teste novo por herança do contexto Node; correção do isolamento de ambiente no próprio PR, sem enfraquecer o gate. CI corrigida do PR [39071966858](https://github.com/brunooss1987-a11y/financeiro-testes/actions/runs/39071966858) e CI pós-merge da `main` [39072023519](https://github.com/brunooss1987-a11y/financeiro-testes/actions/runs/39072023519): **COMPLETED/SUCCESS 3/3**. Gate com **21/21** testes, incluindo ponte de execução **37/37** nos novos diretórios, Weine original **18/18**, Casa Santana original **17/17**, `PUBLIC_GUARD=PASS`. Readback confirmou as três áreas (`weine/` 7 arquivos, `casa-santana/` 7, `comum/` 3), 73 arquivos públicos no total, e blob IDs originais de manifesto v1, fonte hashada, piloto, prova, runner e workflow, sem alteração. A referência `backup/e-arq-t2-pre-migracao-20261017` continua apontando ao SHA pré-migração.

**PROGRESSO VALIDADO:** T3 **1,25/1,25h = 100% concluída | 0% restante**; E-ARQ **3,25/5,00h = 65,00% concluída | 35,00% restante**; projeto E-TEST ampliado **11,75/14,50h = 81,03% concluído | 18,97% restante**. Sem expansão adicional nem mudança do baseline 14,50h. A T4 continua pendente, responsável por atualizar o runner e npm para executar as novas áreas diretamente.

## PROXIMA ACAO A EXECUTAR - SUJEITA A VERIFICACAO

Rever a main, PR #38, CI do PR e pós-merge, três áreas e backup, sem repetir T3. **Próxima T4 — runner/npm/CI/governança (0,75h)**, migrando a descoberta das duas suítes para os diretórios próprios e preservando o comprovante público v1 e três checks. Qualquer falha demanda correção antes de alegar T4 validada.
