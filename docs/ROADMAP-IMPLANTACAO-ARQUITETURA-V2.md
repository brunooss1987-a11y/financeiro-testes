# ROADMAP E-ARQ — Implantação do monorepositório em três áreas

**Data de aprovação do planejamento:** 2026-10-17.
**Repositório alvo:** `brunooss1987-a11y/financeiro-testes` (público; conteúdo somente publicável).
**Decisão de arquitetura:** **Weine / Casa Santana / Comum**, cada projeto com autonomia, a área comum apenas para módulos realmente reutilizáveis.
**Estado:** **T0 VALIDADA / 100% concluída**, implantação física T1–T6 PENDENTE. **Nenhuma migração de código ocorreu neste ciclo.**

## 1. Resultado esperado

O repositório não será uma biblioteca composta somente por funções compartilhadas: terá **áreas distintas para dois projetos** e uma terceira área de **componentes comuns**, mais infraestrutura de segurança na raiz. Cada projeto pode criar e testar funcionalidades exclusivas. Não há exigência de compartilhamento para justificar uma funcionalidade.

```text
financeiro-testes/
  weine/
    src/           # funcionalidades publicáveis específicas da Weine
    tests/         # testes públicos da Weine
    contracts/     # contratos públicos específicos, quando necessários
    docs/          # documentação específica, quando necessária
  casa-santana/
    src/           # funcionalidades publicáveis específicas da Casa Santana
    tests/         # testes públicos da Casa Santana
    contracts/
    docs/
  comum/
    src/           # componentes reutilizáveis comprovadamente comuns
    tests/         # testes dos contratos comuns, quando necessários
    contracts/
  .github/         # CI e governança comum
  tools/           # ferramentas de segurança e runners compartilhados
  tests/security/  # testes de segurança (legado; migração controlada ou manutenção explícita)
  docs/            # ADRs, histórico, evidências, ROADMAP/HANDOFF
  ROADMAP.md
  HANDOFF.md
  SECURITY.md
```

**Distinção essencial:** essas três áreas existem dentro de **um hub público de testes e código genérico autorizado**. Os motores financeiros operacionais, arquivos de planilha, credenciais, rotinas privadas e dados reais **continuam nos repositórios privados** de cada projeto. Essa organização NÃO autoriza transferi-los, implantar apps nem alegar que a CI pública valida finanças reais.

## 2. Diagnóstico de dependências reais (base: main de 2026-10-17)

A `main` já tem `tests/weine/*.test.mjs`, `tests/casa-santana/*.test.mjs`, `src/shared/centavos-demo.mjs`, `src/shared/moeda-ptbr.mjs`, `contracts/public-demo.json`, `tools/run-public-suite.mjs`, `tools/check-local-contract.mjs` e `tools/prove-public-demo-run.mjs`.

**Riscos de mudança detectados:**
- `run-public-suite.mjs` localiza estritamente `tests/<suite>/*.test.mjs`; `.github/workflows/ci.yml` mantém os nomes **Gate de publicacao**, **Piloto weine**, **Piloto casa-santana**. Mover apenas as pastas, sem mudar runner, causaria falha.
- O contrato `local-integrity/v1` fixa `src/shared/centavos-demo.mjs` e SHA-256 do conteúdo. `check-local-contract.mjs` aceita apenas caminhos prefixados por `src/shared/`. Uma mudança de caminho não é transparente.
- `prove-public-demo-run.mjs` verifica texto de importação **exato**, caminho do teste e digests antes/depois, e os testes nas duas suítes usam caminhos relativos existentes.
- `package.json` usa glob `tests/weine`/`tests/casa-santana`; `README.md`, documentos e contratos de integridade apresentam esses caminhos.
- `src/shared/moeda-ptbr.mjs` (E-COM.1) foi validado como utilitário público, **não** está integrado aos motores privados; é candidato à área `comum/`, não à área de um projeto exclusivo.

**Regra técnica:** não movimentar o arquivo v1 hashado por edição silenciosa nem substituir o manifesto original no início da migração. Planejar compatibilidade temporária e, se um contrato v2 for necessário, criar versão nova com hashes, caminhos e testes independentes. Não usar symlinks, não relaxar guardas de segurança e não quebrar o recibo demonstrativo público.

## 3. Plano de execução, pesos, critérios e próxima etapa

| Subetapa | Esforço | Entrega obrigatória | Validação/aceite | Situação |
|---|---:|---|---|---|
| **T0 — Arquitetura, escopo e roadmap** | **0,75h** | Este roadmap, ADR-0002, referência no ROADMAP/HANDOFF principal | Diff só documental; CI 3/3 em PR e na main; readback | **VALIDADA** — PR #32 / CI 39069584418 e 39069630708 |
| **T1 — Inventário e mapa de dependências** | **0,50h** | `docs/E-ARQ-T1-INVENTARIO-DEPENDENCIAS.md`: 52 arquivos e D01–D16 | PR #34, CI PR/main 3/3 e readback | **VALIDADA — 100%** |
| **T2 — Backup e plano de migração reversível** | **0,75h** | Ref real `backup/e-arq-t2-pre-migracao-20261017`; 53 blobs, digests e rollback em `docs/E-ARQ-T2-BACKUP-ROLLBACK.md` | PR #36, CI PR/main 3/3, readback e branch confirmada | **VALIDADA — 100%** |
| **T3 — Criação e reorganização das três áreas** | **1,25h** | Três diretórios com entradas próprias, 10 testes copiados e contrato comum, mais prova transitória de 37 casos | PR #38, CI PR/main 3/3, v1 e backup inalterados, readback | **VALIDADA — 100%** |
| **T4 — Atualização de runner, scripts e CI** | **0,75h** | Runner das novas áreas; npm e legado; CI Comum; CODEOWNERS | PR #40, CI PR/main 3/3, readback e cobertura integral | **VALIDADA — 100%** |
| **T5 — Homologação pública da estrutura** | **0,50h** | Cinco testes T5 e relatório público de homologação | PR #42, CI PR/main 3/3; gate 26/26, legado 35/35, Comum 2/2, pilotos 18/17 | **VALIDADA — 100%** |
| **T6 — Documentação e transição de manutenção** | **0,50h** | README, mapa de contribuição por área, ROADMAP/HANDOFF e evidência da arquitetura implantada | Histórico e estados atualizados; handoff termina na próxima ação sujeita à verificação | PENDENTE |
| **TOTAL** | **5,00h** | | | |

Dependências: **T0 → T1 → T2 → T3 → T4 → T5 → T6**. Não pular etapas nem repetir as já aprovadas. Caso T1/T2 identifique risco que exija outro esforço, tratá-lo como **expansão adicional declarada antes da execução**; não reduzir percentuais silenciosamente. **Após T2, qualquer operação estrutural começa por verificar novamente backup e estado da main.**

## 4. Progressos ponderados e baselines

- **E-TEST original anterior à arquitetura:** baseline **9,50h** = 8,50h validadas + P4.1 1,00h ainda pendente. Progresso histórico **89,47% concluído | 10,53% restante**, preservado como fotografia ANTERIOR à expansão.
- **Expansão nova E-ARQ:** **5,00h**, registrada **antes de qualquer mudança estrutural**; T0 vale 0,75h e as etapas T1–T6 somam 4,25h.
- **Novo baseline E-TEST + E-ARQ:** **14,50h** (9,50 + 5,00). Enquanto T0 não for validada: **8,50/14,50h = 58,62% concluído | 41,38% restante**.
- **Após T0 realmente validada:** **9,25/14,50h = 63,79% concluído | 36,21% restante**. Fase E-ARQ: **0,75/5,00h = 15,00% concluída | 85,00% restante**.
- **Ao concluir toda E-ARQ:** **13,50/14,50h = 93,10% concluído | 6,90% restante** (somente P4.1, 1h).
- **Weine histórica:** F0–F16 baseline 15h (100%); F0–F16+E1 baseline 19h (92,11%) INALTERADOS. **Casa Santana:** nenhum baseline de seu motor foi alterado.
- **E-INFRA-L2:** proposta de 10–16h permanece **ADIADA E FORA DO BASELINE**. P4.1 não fica validada pela migração, que não oferece L1/L2 privados.

O novo percentual menor decorre exclusivamente da **expansão explícita de escopo**. Não significa perda das 8,50h anteriormente validadas.

## 5. Portões de segurança, governança e rollback

- **GO/NO-GO estrutural:** backup/ref recuperável conferido antes de mover arquivos, diff legível, CI sem falhas, manifestos/pins v1 intactos ou migração v2 explicitamente aprovada/testada, revisão de segurança para qualquer novo código.
- **NO-GO:** qualquer cópia de fonte privada, IDs/URLs operacionais, CSV/planilha real, OAuth, segredos, deploy, acesso à rede, atualização de branch do PR #4, reescrita de histórico ou alteração financeira.
- **Preservar:** nomes dos 3 checks, `contents: read`, testes de segurança, testes de isolamento das duas suítes, comprovante público sintético, hashes originais e rastro por PR.
- **Rollback:** reverter o PR estrutural mediante PR reverso, utilizando o HEAD e backup previamente conferidos; nunca tentar correção por force-push. Validar novamente os três checks e readback.
- **Avaliação da experiência:** coerência da árvore, previsibilidade da localização de arquivos, independência dos módulos, segurança, consistência com contratos anteriores e facilidade de manutenção. Se reprovada, corrigir a mesma etapa autonomamente antes de avançar.

## 6. Evidências de validação de T0 (2026-10-17)

- [PR #32](https://github.com/brunooss1987-a11y/financeiro-testes/pull/32) **MERGED** na main; commit público `8bd69685224c065b9f6bcda5c24dc7a42dc769c1`.
- CI do PR [39069584418](https://github.com/brunooss1987-a11y/financeiro-testes/actions/runs/39069584418) e CI pós-merge [39069630708](https://github.com/brunooss1987-a11y/financeiro-testes/actions/runs/39069630708): **COMPLETED SUCCESS 3/3** (Gate de publicacao, Piloto weine, Piloto casa-santana).
- Revisão do diff: **cinco arquivos apenas documentais**, nenhuma fonte, teste, workflow, contrato, formula ou credencial modificados. Readback da main confirmou este roadmap, ADR-0002, README, ROADMAP e HANDOFF.
- **T0 validada = 0,75/0,75h (100%)**. E-ARQ = **0,75/5,00h = 15% concluída, 85% restante**. E-TEST ampliado = **9,25/14,50h = 63,79% concluído, 36,21% restante**. **Proxima: T1 — Inventário e mapa de dependências (0,50h)**, antes de qualquer migração.
- O espelho dos documentos no Google Drive não foi sincronizado (bloqueio de gravação previamente observado). GitHub `main` é a evidência versionada verificada.

## 7. Próximas ações

Após a publicação e validação de **T0**, iniciar **T1 — inventário e mapa de dependências** em leitura, começando pela HEAD real; não mover diretórios antes de **T2 — backup e rollback**. Documentar sempre o concluído, a fase, o projeto total, o restante e a próxima subetapa. Handoff do projeto termina obrigatoriamente com `PROXIMA ACAO A EXECUTAR - SUJEITA A VERIFICACAO`.

**PROXIMA ACAO A EXECUTAR - SUJEITA A VERIFICACAO:** verificar PR e CI de T0 e o estado real da `main`; se validado, atualizar status e executar T1 sem repetir T0. Se algum check falhar, corrigir T0, sem executar alterações estruturais antecipadas.


## E-ARQ T1 — Inventário VALIDADO (2026-10-17)

Em leitura da `main` `fb849ef2547615ba042222fe1d2b829c55d90254`, a árvore Git foi verificada sem truncamento: **52 arquivos**, sendo 5 testes Weine, 5 Casa Santana, 2 segurança, 2 fontes compartilhadas, 6 ferramentas, 22 docs, 2 arquivos GitHub e 8 outros arquivos de raiz. O inventário detalhado e a matriz de 16 dependências constam de `docs/E-ARQ-T1-INVENTARIO-DEPENDENCIAS.md`. **Nenhuma migração, backup ou alteração de código executada nesta etapa.**

**Estado:** T1 **VALIDADA 0,50/0,50h = 100%**. PR #34 merged na main em `af1e50e9ed28097ed769941b12d273596f2dcb8f`; CI do PR [39070166228](https://github.com/brunooss1987-a11y/financeiro-testes/actions/runs/39070166228) e CI pós-merge [39070209547](https://github.com/brunooss1987-a11y/financeiro-testes/actions/runs/39070209547) COMPLETED SUCCESS nos três checks; readback confirmou mapa, roadmap específico, ROADMAP e HANDOFF na main. O PR tinha somente quatro arquivos documentais, nenhum código, runner, contrato, workflow ou dado financeiro alterado. **E-ARQ 1,25/5,00h = 25,00% concluída | 75,00% restante**. **E-TEST ampliado 9,75/14,50h = 67,24% concluído | 32,76% restante**. **Próxima etapa: T2 — backup e plano reversível (0,75h)**, antes de quaisquer mudanças físicas T3/T4.


## E-ARQ T2 — Backup real e plano reversível VALIDADOS (2026-10-17)

**Evidência concreta pré-migração:** branch `backup/e-arq-t2-pre-migracao-20261017` criada a partir da `main` `53a4a6eba6ada83b4bcee1f28824257799bfa4b0`; readback da referência confirmou o commit fixo e **53/53 arquivos e blob IDs idênticos** à árvore original. SHA-256 recalculado de `centavos-demo.mjs` coincide com o hash v1; SHA-256 recalculados de contrato, teste piloto, runner de prova e CI documentados. Plano de PR reverso/recuperação seletiva, testes de rollback, riscos e critérios B1–B6 em `docs/E-ARQ-T2-BACKUP-ROLLBACK.md`.

**ESTADO:** T2 **VALIDADA 0,75/0,75h = 100%**. PR #36 incorporado à main no commit público `39455fddd873caf8e78282fb8c740eb51e39005a`; CI do PR [39070913796](https://github.com/brunooss1987-a11y/financeiro-testes/actions/runs/39070913796) e CI pós-merge [39070966102](https://github.com/brunooss1987-a11y/financeiro-testes/actions/runs/39070966102), ambas COMPLETED/SUCCESS 3/3. Readback da main confirmou relatório, roadmap específico, ROADMAP e HANDOFF, e a branch de backup ainda apontava ao SHA original. Nenhum código/contrato/workflow alterado; nenhum rollback operacional executado. A branch não está protegida como imutável: T3 deve verificar SHA e disponibilidade antes de qualquer mudança.

**Progresso validado:** E-ARQ **2,00/5,00h = 40,00% concluída | 60,00% restante**; E-TEST ampliado **10,50/14,50h = 72,41% concluído | 27,59% restante**. Próxima T3 — criar/reorganizar as três áreas (1,25h), **somente após reconferir o backup e os gates B1–B6**.


## E-ARQ T3 — Estrutura física aditiva VALIDADA (2026-10-17)

**Portão de backup conferido:** `main` em `d739755f276423e4f342532d0d0c024d3f3d5fd8`, CI `39071171700` SUCCESS 3/3. A ref `backup/e-arq-t2-pre-migracao-20261017` conservava `53a4a6eba6ada83b4bcee1f28824257799bfa4b0`, e blobs SHA originais de `centavos-demo.mjs` e manifesto v1 eram idênticos aos da referência protegida.

**T3 IMPLEMENTADA ADITIVAMENTE, NÃO VALIDADA:** criadas as áreas `weine/`, `casa-santana/` e `comum/`, com READMEs, entradas `src/index.mjs` públicas, cinco testes de cada projeto copiados para seus diretórios, novo teste da área comum e uma prova na suíte de segurança que executa **37 casos** dos novos caminhos em CI, enquanto as 3 suites originais permanecem inalteradas. `comum/src/index.mjs` reexporta a biblioteca pública E-COM.1 do caminho legado; nenhuma rotina financeira exclusiva ou privada foi inventada/publicada. Contrato e prova `local-integrity/v1` continuam nos caminhos anteriores. `tools/run-public-suite.mjs`, `package.json` e `.github/workflows/ci.yml` **não foram alterados**: migração do runner é responsabilidade de T4. Detalhes em `docs/E-ARQ-T3-TRES-AREAS-PUBLICAS.md`.

**Status T3 VALIDADA:** PR #38 incorporado à `main` no commit público `c650cb5c4b60ac7e29d6f6daeed7c25ec9f3d3c6`. CI inicial `39071904094` FALHOU no teste novo por herança do contexto Node; correção do isolamento de ambiente no próprio PR, sem enfraquecer o gate. CI corrigida do PR [39071966858](https://github.com/brunooss1987-a11y/financeiro-testes/actions/runs/39071966858) e CI pós-merge da `main` [39072023519](https://github.com/brunooss1987-a11y/financeiro-testes/actions/runs/39072023519): **COMPLETED/SUCCESS 3/3**. Gate com **21/21** testes, incluindo ponte de execução **37/37** nos novos diretórios, Weine original **18/18**, Casa Santana original **17/17**, `PUBLIC_GUARD=PASS`. Readback confirmou as três áreas (`weine/` 7 arquivos, `casa-santana/` 7, `comum/` 3), 73 arquivos públicos no total, e blob IDs originais de manifesto v1, fonte hashada, piloto, prova, runner e workflow, sem alteração. A referência `backup/e-arq-t2-pre-migracao-20261017` continua apontando ao SHA pré-migração.

**Progresso:** T3 **1,25/1,25h = 100%**, E-ARQ **3,25/5,00h = 65,00% concluída | 35,00% restante**, E-TEST ampliado **11,75/14,50h = 81,03% concluído | 18,97% restante**. Próxima **T4 — atualizar runner/npm/CI e governança (0,75h)** sem perder v1 ou cobertura.


## E-ARQ T4 — Migração da execução VALIDADA (2026-10-17)

Runner de suites `weine` e `casa-santana` passa a apontar para os diretórios próprios com allowlist estática; `security` mantém os testes de segurança. `package.json` expõe comandos por área e legado v1; o gate de publicação acrescenta regressão de 35 testes originais e dois testes comuns, mantendo os três checks. `CODEOWNERS` nomeia as três áreas. Relatório técnico: `docs/E-ARQ-T4-RUNNER-CI-MIGRACAO.md`.

**Estado VALIDADA:** PR #40 incorporado à main no commit público `aa85aac7374c0c61f111fd0a8af7b5eb76688c29`. CI do PR [39072699368](https://github.com/brunooss1987-a11y/financeiro-testes/actions/runs/39072699368) e CI pós-merge [39072770519](https://github.com/brunooss1987-a11y/financeiro-testes/actions/runs/39072770519), **COMPLETED SUCCESS 3/3**. Logs do gate: 21/21 segurança com prova de 37/37 nas novas áreas, 35/35 legado, 2/2 Comum, `PUBLIC_GUARD=PASS`; pilotos nos diretórios novos Weine 18/18 e Casa Santana 17/17. Readback da main confirmou runner, npm, CI, ROADMAP/HANDOFF, contrato `local-integrity/v1` e fonte hashada originais, e backup no SHA fixo. Progresso T4 **100%/0%**; E-ARQ **80,00% concluída | 20,00% restante**; E-TEST ampliado **86,21% concluído | 13,79% restante**. Sem expansão adicional ou alteração do baseline 14,50h. Próxima T5 (0,50h).


## E-ARQ T5 — Homologação pública VALIDADA (2026-10-17)

Cinco testes de aceite acrescentados à suite de segurança sem apagar nenhum teste anterior: diretórios/ausência de symlinks; API comum com entradas exclusivas Weine e Casa Santana; runner com allowlist e entradas negativas; manifesto de SHA-256 e comprovante v1; CI com gate, permissões e CODEOWNERS preservados. Documento: `docs/E-ARQ-T5-HOMOLOGACAO-PUBLICA.md`. **Estado VALIDADA:** PR #42 incorporado à `main` no commit público `27383adaa750c942c9c03eafcea68eefdef4c690`. CI do PR [39073599636](https://github.com/brunooss1987-a11y/financeiro-testes/actions/runs/39073599636) e CI pós-merge [39073659211](https://github.com/brunooss1987-a11y/financeiro-testes/actions/runs/39073659211) **COMPLETED SUCCESS 3/3**. Gate **26/26** (21 originais + cinco testes T5; prova T3 37/37 incluída), legado **35/35**, Comum **2/2**, pilotos Weine **18/18** e Casa Santana **17/17**, scanner `PUBLIC_GUARD=PASS`. Readback da `main` confirmou arquivo T5, manifesto, somador fictício, piloto e comprovante v1 intactos; branch de backup ainda no SHA `53a4a6eba6ada83b4bcee1f28824257799bfa4b0`. Progresso T5 **100,00% concluída | 0% restante**; fase E-ARQ **90,00% concluída | 10,00% restante**, projeto E-TEST ampliado **89,66% concluído | 10,34% restante**. Não há expansão nem alteração do baseline 14,50h. Próxima T6 — documentação e transição (0,50h).
