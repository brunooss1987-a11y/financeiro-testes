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
| **T3 — Criação e reorganização das três áreas** | **1,25h** | `weine/`, `casa-santana/`, `comum/` com fontes/testes públicos; preservação temporária dos caminhos v1 necessários | Imports coerentes, nenhuma fonte privada, compatibilidade demonstrativa preservada | PENDENTE |
| **T4 — Atualização de runner, scripts e CI** | **0,75h** | `package.json`, runner e testes passam a aceitar os novos diretórios; jobs existentes mantidos | Gate de publicação e os mesmos 3 checks, sem permissões adicionais, sem download de privados | PENDENTE |
| **T5 — Homologação pública da estrutura** | **0,50h** | Testes regressivos e de isolamento das três áreas, readback pós-merge, comparação da suíte anterior | CI 3/3 antes e depois do merge; nenhum teste existente eliminado, suprimido ou convertido em falso PASS | PENDENTE |
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
