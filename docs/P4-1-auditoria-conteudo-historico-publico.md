# P4.1 — Auditoria focal do conteúdo histórico de documentos públicos

**Data:** 2026-10-14. **Natureza:** auditoria CORRETIVA e somente leitura, sem nova funcionalidade, sem acessar fonte privada e sem alterar baseline. **Referência de início:** `main` no commit público `f23bc46e63835291ba44974496fee5747e546302` (PR #24 e CI #38629273488 com 3/3 SUCCESS).

## Objeto da investigação

Verificar **os conteúdos das versões Git alcançáveis pela `main`** dos quatro arquivos do hub público abaixo, cujo saneamento da versão corrente ocorreu no PR #22:
- `docs/P2-1-inventario-weine.md` — **2 versões** (criação e saneamento).
- `docs/P3-1-inventario-casa-santana.md` — **2 versões** (criação e saneamento).
- `ROADMAP.md` — **24 versões** com modificação do arquivo até a referência inicial.
- `HANDOFF.md` — **24 versões** com modificação do arquivo até a referência inicial.

**Total: 52 versões de arquivo verificadas** (não 52 commits distintos). A lista foi obtida por `GET /repos/{owner}/{repo}/commits?path=<arquivo>`; cada versão foi lida pelo SHA de commit da própria cadeia. O auditado é o histórico acessível pela **main**; branches excluídas, tags, forks, clones, caches, logs não vinculados e demais documentos não são cobertos.

## Resultados confirmados, sem reprodução de identificadores

| Categoria | Resultado da auditoria focal | Interpretação |
|---|---|---|
| Identificadores Git de origem privada | **7 valores distintos** de 40 caracteres, presentes nos inventários antigos, repetidos em versões do ROADMAP/HANDOFF até o PR #22 | **Divulgação histórica de metadados técnicos**; não são, por sua natureza, senhas ou tokens |
| Referência direta de CI privada | Presente em versões antigas do inventário Casa Santana e HANDOFF, acompanhada de metadados de job e commit | Facilita correlação de versões e pipeline privado; não constitui acesso autenticado |
| Identificadores e caminhos de PRs/arquivos privados | Descritos nos registros históricos de seleção de candidatos | Informação de proveniência/estrutura, não publicação do código-fonte completo |
| Outros valores Git SHA-40 não classificados | **0**: além dos sete identificadores citados, os reconhecidos foram referências a commits do hub público ou à dependência pública de checkout fixada | Classificação específica para o padrão SHA-40, não análise de todas as strings possíveis |
| Padrões literais de credenciais ou dados pessoais | **0 correspondências** para padrões conhecidos testados: tokens OAuth Google, chaves Google API, tokens GitHub típicos, cabeçalhos de chave privada, URL de planilha com ID e CPF formatado | **Não** equivale a varredura completa de segredos, ausência de credenciais em formatos diferentes ou inocuidade de todos os textos |
| Quatro arquivos na versão corrente da `main` | **0 ocorrências dos sete identificadores privados** e 0 links de execução privada detectados | Correção da versão HEAD confirmada; não elimina as versões antigas |

Os valores reais de hashes, IDs, URLs de origem e outras informações de proveniência **não são reproduzidos neste documento**, em títulos de commit, diffs de PR ou mensagens de continuidade.

## Risco residual e decisão

**Risco residual comprovado:** versões antigas continuam alcançáveis no histórico Git público, mesmo após saneamento da HEAD por PR #22. Usuários que já clonaram ou indexaram o repositório podem ter cópias. Um identificador SHA ou um link de execução **não é, isoladamente, uma credencial**, mas pode expor estrutura, proveniência e associação entre projetos. **Não foi observada, nos quatro arquivos e padrões examinados, correspondência literal para os formatos de credenciais testados.** Isso não prova que inexistam outros segredos na história do repositório.

**Medidas executadas:** leitura e contagem focal; correção anterior da HEAD pelo PR #22, validada pelo PR #23; registro do alcance histórico e das limitações. **Não executadas:** force-push, `filter-repo`, rebase de branches protegidas, exclusão de refs, revogação ou rotação de credenciais sem evidência, acesso a repositórios privados, coleta de logs privados, alterações no sistema financeiro, VM/Windows ou Google Drive.

**Decisão vigente:** manter o histórico intocado neste ciclo. Uma eventual higienização de commits é processo diferente, potencialmente disruptivo e não comprova remoção de forks/caches; requer análise separada de alcance/efeitos e autoridade adequada antes de execução. Como não se identificou formato concreto de credencial exposta nesta auditoria focal, **não há fundamento suficiente aqui para solicitar rotação específica de chave**. Se surgir evidência nova de credencial real, aplicar o procedimento de resposta a incidente de `SECURITY.md`.

## Estado do projeto, sem expansão

Esta auditoria trata uma fragilidade pré-existente. **Nenhum novo esforço foi incorporado.** E-TEST permanece **7,00/8,00h = 87,50% concluído | 12,50% restante**, com P4.1 (L1/L2 privados) em execução e bloqueada. Weine Financeiro histórica: 92,11% concluído. E-INFRA-L2 (10–16h): ADIADA, fora do baseline; PR #4 continua aberto e não mesclado.

## PROXIMA ACAO A EXECUTAR - SUJEITA A VERIFICACAO

1. Verificar primeiro o HEAD atual, os PRs #22–#24, CI e a versão corrente dos quatro arquivos; **não repetir** a coleta das 52 versões já examinadas.
2. Examinar **somente metadados públicos** de refs/tags/branches relevantes do próprio hub para encontrar eventuais versões correntes divergentes, que possam reintroduzir os identificadores já saneados; não recuperar/republicar identificadores reais nem usar force-push.
3. Se não houver evidência nova, registrar risco residual e **não abrir expansões artificiais**. Qualquer ferramenta de bloqueio adicional seria escopo novo, com estimativa e baseline revisto antes da implementação.
4. Preservar sistemas financeiros, OAuth, Google Sheets, fontes privadas, PR #4 bloqueado, E-INFRA-L2 adiada. O espelho documental no Drive permanece pendente por bloqueio de segurança conhecido; não contornar.

