# E-SEC.1 — Testes negativos do gate de publicação pública

**Data:** 2026-10-14. **Escopo:** expansão independente da P4.1, estimada em **1,00h**, explicitamente acrescentada ao baseline E-TEST de 6,00h (**novo total 7,00h**) antes da implementação. **Status final:** VALIDADA como segurança do hub público, com CI pós-merge; não certifica motores privados.

## Motivo

O `tools/check-publication.mjs` verificava os arquivos versionados, recusando nomes e cadeias sensíveis, mas não possuía testes negativos específicos; também utilizava `statSync`, que pode seguir links simbólicos. A manutenção dessas regras sem regressão ainda não estava comprovada por CI.

## Mudanças estritamente públicas

- `tools/publication-guard-core.mjs`: as mesmas famílias de nome e conteúdo proibidos, com verificação do caminho relativo e `lstatSync` em todos os componentes, recusa de link simbólico e arquivo acima de 1 MiB.
- `tools/check-publication.mjs`: preserva a leitura de `git ls-files -z` e a mensagem `PUBLIC_GUARD=PASS`, mas usa o verificador modular.
- `tests/security/publication-gate.test.mjs`: dez cenários sintéticos e temporários, sem segredos reais.
- `.github/workflows/ci.yml`: adiciona a execução dos testes negativos dentro do job já obrigatório **Gate de publicacao**, antes de inspecionar os arquivos versionados. Os nomes e as permissões `contents: read` dos três jobs permanecem.

## Matriz de testes e aceitação

| Categoria | Resultado esperado |
|---|---|
| Arquivo público simples/nested | PASS |
| `.env`, credenciais e formatos de exportação/backup proibidos | Rejeição |
| Valores artificiais com formatos de OAuth, Google API, GitHub, chave privada, URL de planilha e CPF | Rejeição |
| Fragmento benigno de token incompleto | PASS (sem falso positivo) |
| Traversal, caminho absoluto, separadores suspeitos | Rejeição antes de leitura |
| Arquivo ausente e diretório como arquivo | Rejeição |
| Arquivo maior que 1 MiB | Rejeição |
| Link simbólico para arquivo dentro do próprio temporário | Rejeição |
| Link simbólico como diretório pai | Rejeição |
| Ausência de raiz de avaliação explícita | Rejeição |

As strings sensíveis completas são montadas apenas **em memória durante os testes**, a partir de fragmentos fictícios. Não são salvas no GitHub, não são credenciais reais e não contêm dados financeiros.

## Critérios de homologação

1. Diff de PR contém apenas scanner público, testes unitários, workflow e documentação; nenhum código financeiro privado.
2. CI do PR: **Gate de publicacao**, **Piloto weine**, **Piloto casa-santana**, todos SUCCESS; os dez testes negativos passam e a verificação da própria árvore dá PASS.
3. PR mesclado e CI na main 3/3 SUCCESS, com leitura dos arquivos finais.
4. Registros do ROADMAP/HANDOFF distinguem implementação, testes da branch, publicação na main e limite técnico. `E-SEC.1` só pode ser VALIDADA após esses checks.

## Limites

Este gate inspeciona **arquivos versionados atuais** (não repositórios privados, o histórico Git completo, secretos mascarados, dados externos nem o conteúdo de PRs futuros sem revisão). A checagem de symlink antes da leitura reduz uma exposição evidente, mas não constitui sandbox contra um atacante com controle simultâneo do filesystem. Nenhum teste L1/L2 privado ou E2E financeiro foi realizado.

**Baseline recalculado previamente:** E-TEST 6,00h + E-SEC.1 1,00h = **7,00h**. Antes da validação da expansão: 5,00/7,00h = **71,43% concluído**, 28,57% restante. Após validação E-SEC.1: 6,00/7,00h = **85,71% concluído**, 14,29% restante. Weine histórico 19h/92,11% inalterado. E-INFRA-L2 de 10–16h permanece adiada e fora desse cálculo.

## Evidencia final verificada (2026-10-14)

PR #18 incorporado à main no commit `617a8414f811ba0e88b769202890acf12366a90f`. CI do PR `38625300169` **SUCCESS 3/3**; CI pós-merge na main `38625424962` **SUCCESS 3/3**. Logs pós-merge: dez testes negativos **10/10 PASS**, guard `PUBLIC_GUARD=PASS`, Weine **13/13 PASS** e Casa Santana **12/12 PASS**. Scanner, testes e workflow relidos na main. E-SEC.1 **VALIDADA (1,00/1,00h)**; progresso total E-TEST **6,00/7,00h = 85,71%**; 14,29% restantes relativos a P4.1.

## PROXIMA ACAO A EXECUTAR - SUJEITA A VERIFICACAO

Verificar PR/diff e os três checks, corrigir testes com falha sem enfraquecer o gate; mesclar somente após aprovação e confirmar execução na main. Marcar a E-SEC.1 validada apenas com provas; manter a P4.1 de fontes privadas pendente, PR #4 bloqueado e planilhas/repos privados intactos.
