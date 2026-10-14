# P4.1 — Plano de contenção segura para referências públicas obsoletas

**Data:** 2026-10-14. **Status:** VALIDADO DOCUMENTALMENTE na `main`, sem executar contenção de refs. **Natureza:** decisão técnica DOCUMENTAL, nenhuma ref apagada ou movida. **Evidência de origem:** [PR #27](https://github.com/brunooss1987-a11y/financeiro-testes/pull/27) incorporado à `main` no commit público `f3c429226928a6725d5821c5f9e105a591e20518`, com CI do PR `38635730514` e CI pós-merge `38635821017`, ambas **3/3 SUCCESS**. O relatório `docs/P4-1-auditoria-refs-publicas.md` foi relido na `main`.

## 1. Risco factual e alcance

Na fotografia original da auditoria (antes da abertura das novas branches documentais), havia **28 branches incluindo a main**, das quais **21 das 27 extras** referenciavam ao menos um dos dois inventários públicos anteriores ao PR #22; cinco continham ambos saneados e uma não continha inventários. Uma das duas refs internas `pull` também referenciava ambos os inventários antigos. Nenhuma tag foi retornada. **Esses números não devem ser reutilizados como contagem atual** sem nova leitura: branches de documentação continuam sendo criadas durante o registro das evidências.

A exposição comprovada se refere a **metadados Git e de CI de repositórios privados**, não a credenciais validadas. O HEAD da `main` já não contém os sete identificadores específicos examinados. Qualquer alteração de uma referência muda apenas qual commit é a ponta daquela ref; **não apaga commits anteriores, cópias/clones/forks, caches ou outras refs**.

## 2. Classes de referências e decisão

| Classe | Situação | Decisão operacional |
|---|---|---|
| `main` | Saneada nos quatro documentos auditados; PRs #22–#27 e CIs validados | **Preservar**; não reeditar resultados já aceitos sem evidência nova |
| Branches de PRs mesclados | Parte ainda aponta para versões antigas; histórico auditável de entregas anteriores | **Sem exclusão automática**; só propor limpeza após inventário de dependências, revisão de permissões e plano de recuperação |
| Branch do **PR #4 aberto** | Vinculada a proposta ainda bloqueada, com inventários antigos | **Preservar intacta**; não atualizar à força, apagar ou mesclar para tentar sanar o problema |
| Branch adicional sem PR associado | Finalidade ainda não comprovada como dispensável | **Não apagar** sem conhecer responsáveis/consumidores |
| Refs internas `refs/pull/*` | Criadas/gerenciadas pelo GitHub, uma ainda alcança inventários antigos | **Não tentar modificar** nem assumir que exclusão de branch apaga essas refs |
| Tags | Nenhuma identificada na consulta `git/matching-refs/tags` | Nenhuma ação de alteração |
| Commits históricos, forks, clones e caches | Persistência potencial apesar do PR #22 | Não declarar remediação integral sem processo especializado |

## 3. Gates para qualquer contenção futura

- **C0 — Objetivo e autorização:** descrever se a meta é evitar novas consultas a HEADs obsoletos ou tentar retirar conteúdo do histórico público. Esses objetivos exigem estratégias diferentes; não aceitar o primeiro como solução do segundo.
- **C1 — Inventário corrente:** atualizar lista de branches, tags e refs por API, identificar owner, PR associado, estado do PR, automações/dependências e qualquer consumo externo conhecido. Não confiar em números desta fotografia como se fossem atuais.
- **C2 — Integridade e recuperação:** registrar de forma **privada e autorizada** os ponteiros necessários para restauração, políticas de retenção e meios de recriar refs; confirmar proteção e permissões GitHub. A integração anterior recebeu HTTP 403 ao consultar proteção da `main` — não inferir ausência de controles.
- **C3 — Exclusões pontuais, se aprovadas:** começar somente por branches comprovadamente não utilizadas e já incorporadas; verificar impacto nos PRs, links e automações antes/depois. **Nenhuma exclusão está autorizada por este plano.** Jamais incluir a branch do PR #4 aberto.
- **C4 — Reescrita histórica:** tratar como procedimento separado de segurança com avaliação jurídica/operacional, backup apropriado e autorização específica; um `force-push` pode afetar clones, verificações e rastreabilidade e não garante remoção em forks/caches. **NO-GO neste ciclo.**
- **C5 — Segredos, se identificados posteriormente:** contenção, revogação/rotação na origem, investigação e comunicação conforme `SECURITY.md`, em vez de mera exclusão de arquivo ou branch. Não há evidência atual para rodar credenciais arbitrariamente.
- **C6 — Confirmação:** se uma contenção vier a ser autorizada, realizar leitura pós-ação de refs e logs, comparar com evidência prévia e distinguir redução de refs antigas de saneamento efetivo do histórico.

## 4. Curso seguro escolhido

**Manter todas as refs intocadas.** Conservar a `main` atual saneada, não reabrir PRs concluídos, manter o PR #4 bloqueado e preservar evidência de risco residual. Conter futuros erros pela política já existente de PR/revisão/gate para novos commits; **não** alegar que o gate cobre commits antigos ou outras branches. Preparar uma expansão automatizada somente se houver lacuna nova, estimativa documentada e novo baseline declarado antes de código.

Este plano não depende de OAuth, Google Sheets, faturamento privado, VM, autorização de hardware ou manipulação de dados reais. Nenhum sistema financeiro foi modificado.

## 5. Situação ponderada

Plano corretivo de confidencialidade **sem nova funcionalidade**, portanto sem alterar pesos: E-TEST **7/8h = 87,50% concluído | 12,50% restante**. P4.1 segue EM EXECUÇÃO por falta de L1/L2 privados; E-INFRA-L2 10–16h continua ADIADA/não incorporada. Histórico Weine 92,11% preservado.

## Validação final do plano

PR #28 merged em `50744489cd38be469577f446b8397a2bb12dfc69`; CI do PR `38636195358` e CI pos-merge da `main` `38636282758` COMPLETED/SUCCESS nos tres checks. Leitura posterior confirmou o plano, ROADMAP e HANDOFF publicados na `main`. Os critérios C0–C6 são apenas pré-condições futuras: nenhum gate operacional de exclusão foi executado ou aprovado.

## PROXIMA ACAO A EXECUTAR - SUJEITA A VERIFICACAO

A frente autônoma de auditoria/planejamento de refs está **CONCLUÍDA DOCUMENTALMENTE**, com risco residual preservado. Em futura solicitação, verificar primeiro se existe evidência nova e autoridade específica para intervir; somente então atualizar inventário, dependências e critérios de recuperação. Não executar exclusões, force-push ou reescrita por efeito deste plano. P4.1 privada permanece pendente de L1/L2 e não está concluída.
