# E-ARQ T2 — Backup verificável e plano reversível pré-migração

**Data:** 2026-10-17.
**Natureza:** etapa T2 do roadmap E-ARQ (0,75h JÁ PREVISTA nas 5h da expansão). Nenhuma expansão nova.
**Estado final:** T2 **VALIDADA na main**: backup real verificado em leitura, relatório publicado, PR/CI 3/3 e readback concluídos. Nenhum rollback operacional foi executado. Não houve migração de pastas ou alteração em código, CI e contratos.

## 1. Referências de origem e recuperação

| Campo | Evidência factual |
|---|---|
| Repositório | `brunooss1987-a11y/financeiro-testes` (público, apenas conteúdo autorizado) |
| HEAD da main ANTES de T2 | `53a4a6eba6ada83b4bcee1f28824257799bfa4b0` |
| Branch de recuperação criada por API | `backup/e-arq-t2-pre-migracao-20261017` |
| Commit resolvido pela branch após criação | `53a4a6eba6ada83b4bcee1f28824257799bfa4b0` |
| Quantidade de arquivos regulares da árvore de referência | **53**; leitura não truncada |
| Comparação independente de árvores | **53/53 blobs Git correspondentes aos mesmos caminhos da main**, zero divergências |
| Estado de CI da main que foi protegida | run `39070396999` **COMPLETED SUCCESS, 3/3 checks** |
| T1 | PR #34 e #35 incorporados, roadmap e handoff marcados T1 VALIDADA; sem mudanças estruturais |

**Importante:** a referência é uma **branch Git**, não uma cópia em armazenamento separado. Um SHA-1 de commit fixo identifica o snapshot mesmo quando a main avançar. Esta branch NÃO possui proteção de imutabilidade comprovada: tecnicamente pode ser movida/excluída por alguém com permissão. **Não afirmar backup imutável, offsite, cópia privada ou restauração integral de plataforma.** No gate T3, conferir novamente o HEAD dessa branch e a legibilidade dos blobs; qualquer divergência do SHA registrado é NO-GO. Não deletar, rebasear, mover ou reutilizar essa branch como branch de desenvolvimento.

## 2. Digests SHA-256 rechecados em leitura

Calculados sobre os **conteúdos públicos recuperados da branch de backup** com SHA-256 determinístico (rotina verificada contra vetor conhecido `sha256("abc")`), comparados com SHA-1 de blob retornados pelo GitHub. Esses dados não representam código privado.

| Arquivo protegido | SHA-256 recalculado | Blob Git da branch |
|---|---|---|
| `contracts/public-demo.json` | `6a6fadc8ed8f01b1badccab9fc9c7250e03baf6cb2e1a67211c00149d5902060` | `06f1eca7e69ad689d7ea4f153473ea7b3dad5813` |
| `src/shared/centavos-demo.mjs` | `f6c49908e50065dc489dfb1967203d232e664503195dbb96924ac62d03ea777f` | `734b5809e875d9d6cd9c5c4c2b4ecb8e9c984211` |
| `tests/weine/piloto.test.mjs` | `da4f399b3490ea147c147ba9d4d6fc9d35b9f0cd70db47bb93f87bbfc5536bb1` | `fbc7db8cee8eee658bf1b9a5dedbd1903108e46f` |
| `tools/prove-public-demo-run.mjs` | `3fefe78ba399ddbf4fcffebc267c0aa6cacef1e60037ebdd4b214b77b45f0d83` | `28a3fab72f7c9edb4584ec6093d697b702ff62c9` |
| `.github/workflows/ci.yml` | `2c823c4b802ff355564c6864204953de8a1c0809ec7633fb8f051a5a5767a0ee` | `cbf81ddc0ae9cbbcc8725c604b03a663e4564ef2` |

**Asserção mais crítica:** o SHA-256 de `centavos-demo.mjs` acima é **idêntico** ao SHA fixado em `contracts/public-demo.json`, cujo `schema` continua `local-integrity/v1` e cujo `files[0].path` continua `src/shared/centavos-demo.mjs`. O runner de prova conserva os literais `SOURCE_PATH`, `TEST_PATH` e o texto de importação esperado. A CI mantém os três checks originais e `contents: read`.

## 3. Ensaio de recuperação seguro (somente leitura)

Executado:
1. Criar a branch `backup/e-arq-t2-pre-migracao-20261017` apontada **diretamente** ao SHA verificado da main, sem alterar a main e sem force-push.
2. Resolver branch novamente por `branches?per_page=100`; confirmar **exatamente uma** branch com esse nome, mesmo SHA.
3. Ler a árvore pelo SHA do commit e a árvore da main: **53 paths/53 blobs iguais**.
4. Ler os cinco arquivos críticos **por ref de backup**, verificar os blob IDs, calcular SHA-256 dos conteúdos, conferir manifesto e literais.
5. Verificar CI original 3/3 SUCCESS.

**Limite explícito:** isso é um **ensaio não destrutivo de acesso e integridade do snapshot**, não uma restauração executada em nova branch/working tree, não um disaster recovery E2E e não prova de infra privada L1/L2. A restaurabilidade operacional completa só poderá ser comprovada quando um PR de reversão for necessário e executado.

## 4. Plano de rollback de T3/T4 — não executar antecipadamente

**Pré-condições:** qualquer PR futuro de migração deverá identificar seu commit, listar exatamente paths adicionados/removidos/modificados e preservar a ref de recuperação. Para desfazer uma migração ruim:
1. **Suspender novos merges de migração** e confirmar o HEAD atual, SHA do commit migratório e branch de backup pelo SHA fixo; conferir que a árvore de backup ainda é legível.
2. Criar uma **nova branch de correção a partir da main atual**. **Nunca** forçar a main para o SHA antigo, apagar histórico, nem atualizar a branch `backup/`.
3. Preferir um **PR de revert do commit/PR migratório**, por revisão de diff. Se houver conflitos ou alterações legítimas posteriores, **NÃO** descartar mudanças novas: preparar um PR de restauração **seletiva** dos arquivos afetados a partir do snapshot, conferir paths deletados/adicionados na migração e não reverter trabalho não relacionado.
4. Executar Gate de publicação, Piloto Weine e Piloto Casa Santana, mais a prova v1, no PR e na main após merge; exigir resultados reais e **zero falso PASS**.
5. Comparar nomes/SHAs de contratos e fontes pinados com esta tabela. Inspecionar scripts npm, allowlist do runner, `CODEOWNERS`, imports estáticos/dinâmicos e README. Se a validação não passar, manter rollback **EM ABERTO**, não alegar recuperação bem-sucedida.
6. Registrar incidentes e evidências no ROADMAP/HANDOFF, sem reescrever commits nem excluir refs. Não tocar PR #4 bloqueado.

**Exemplo apenas ilustrativo para ambiente local autorizado, NÃO EXECUTADO:**
```bash
git fetch origin main backup/e-arq-t2-pre-migracao-20261017
git show --format=fuller --no-patch 53a4a6eba6ada83b4bcee1f28824257799bfa4b0
git ls-tree -r --name-only 53a4a6eba6ada83b4bcee1f28824257799bfa4b0
# criar branch de restauracao a partir da main atual
# preparar revert/checkout SELETIVO de paths apenas, abrir PR, conferir CI
```

## 5. GO/NO-GO para T3

| Gate | Exigência | Estado em T2 |
|---|---|---|
| B1 — snapshot real | ref `backup/` resolve para SHA fixo e 53 arquivos legíveis | **VERIFICADO** |
| B2 — integridade | digests de arquivos críticos rechecados, SHA de fonte coincide com manifesto v1 | **VERIFICADO** |
| B3 — rollback | plano por PR, sem force-push, com passos de restauração seletiva e critérios de aceite | **DOCUMENTADO; execução NÃO realizada** |
| B4 — CI baseline | Gate, Weine, Casa Santana 3/3 sucesso na main de origem | **VERIFICADO** |
| B5 — publicação da T2 | PR documental, CI do PR e da main 3/3, readback dos docs | **VALIDADO** — PR #36 e CIs comprovadas |
| B6 — mudança de contexto | revalidar backup, ref, integridade e nova HEAD no início de T3 | **OBRIGATÓRIO EM T3** |

**NO-GO se:** a branch for alterada/removida, a árvore Git/arquivo crítico não estiver legível, o SHA-256 não bater, a CI falhar, aparecer dependência/risco não mapeado, ou surgir fonte privada/credencial. Não admitir PR estrutural até resolver.

## 6. Progresso

T2 tem peso **0,75h dentro das 5,00h E-ARQ já incorporadas**. Até validar o PR e a main, o último progresso validado é E-ARQ **1,25/5h = 25,00%**, E-TEST ampliado **9,75/14,50h = 67,24%**. **Após T2 validada:** T2 0,75/0,75h = 100%; E-ARQ **2,00/5,00h = 40,00% concluída | 60,00% restante**; E-TEST ampliado **10,50/14,50h = 72,41% concluído | 27,59% restante**. P4.1 1h ainda pendente, E-INFRA-L2 adiada, Weine histórica 92,11% inalterada. **Próxima: T3 — Criação e reorganização das áreas (1,25h)**, sujeita aos gates.

## 7. Evidências finais de aceite T2

PR #36 incorporado à main no commit público `39455fddd873caf8e78282fb8c740eb51e39005a`; CI do PR [39070913796](https://github.com/brunooss1987-a11y/financeiro-testes/actions/runs/39070913796) e CI pós-merge [39070966102](https://github.com/brunooss1987-a11y/financeiro-testes/actions/runs/39070966102), ambas COMPLETED/SUCCESS 3/3. Readback da main confirmou relatório, roadmap específico, ROADMAP e HANDOFF, e a branch de backup ainda apontava ao SHA original.

**PROGRESSO DO ROADMAP:** T2 **0,75/0,75h = 100% concluída | 0% restante**; E-ARQ **2,00/5,00h = 40,00% concluída | 60,00% restante**; E-TEST ampliado **10,50/14,50h = 72,41% concluído | 27,59% restante**. Baseline inalterado 14,50h, sem nova expansão.

## PROXIMA ACAO A EXECUTAR - SUJEITA A VERIFICACAO

Rever estado real da main e backup antes de T3. **T3 — criação e reorganização das três áreas (1,25h)** deve revalidar SHA da branch de recuperação, acesso aos objetos, integridade v1 e três checks. Se algum gate B1–B6 falhar, NO-GO para movimentos. Não repetir T2 validada ou forçar atualizações. P4.1 L1/L2 permanece pendente.
