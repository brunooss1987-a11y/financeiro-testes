# P4.1 — Auditoria das referências públicas ativas (somente leitura)

**Data da verificação:** 2026-10-14. **Marco anterior:** `main` em `aa1bcb0c12d09d66107e972a9669ffd4b7b91fcf`, PRs #25/#26 incorporados, CI pós-merge `38632134166` SUCCESS (3/3). **Estado:** auditoria factual concluída em leitura; publicação deste registro sujeita a PR, CI e readback. Nenhuma referência Git existente foi alterada.

## Procedimento e limites

1. Ler `branches?per_page=100` e `git/matching-refs/heads` e conferir seus resultados: **28 branches** no instante da consulta, inclusive `main`; 27 além da principal. Nenhum truncamento foi indicado.
2. Ler `git/matching-refs/tags`: **zero tags** expostas pelo endpoint disponível. A rota alternativa `tags?per_page=100` foi rejeitada pela integração; não declarar que ela foi utilizada com sucesso.
3. Ler `git/refs`: **30 referências** retornadas, sendo 28 `heads` e **2 refs `pull`**. Não foram retornadas outras categorias nesse escopo.
4. Ler a árvore Git de **cada uma das 27 branches adicionais** e das **2 refs `pull`** pelo commit da referência (sem baixar fontes privadas). Comparar **somente o blob ID** dos dois inventários públicos de P2.1 e P3.1 com o blob anterior ao PR #22 e o blob corrigido da `main`. Para ROADMAP/HANDOFF, confirmar presença dos arquivos e reconhecer que versões antigas podem conter as mesmas referências já identificadas pela auditoria das 52 versões; a classificação quantitativa abaixo baseia-se **nos dois inventários**, não em leitura textual de cada arquivo nessas refs.
5. Consultar PRs: **26 pull requests** conhecidos (25 mesclados, **#4 aberto**). Das 27 branches adicionais, 25 estão associadas a PRs incorporados, uma ao PR #4 aberto e uma não foi associada a PR pela consulta.

## Resultado da classificação de refs

| Tipo de ref | Quantidade | Resultado por identidade de blob |
|---|---:|---|
| Branches adicionais com pelo menos um inventário **anterior ao saneamento** | **21** | 21 com P2.1 antigo; dentre elas, 20 com P3.1 antigo e uma anterior à criação de P3.1 |
| Branches adicionais com **ambos inventários saneados** | **5** | Blobs idênticos aos inventários da `main` corrigida |
| Branch adicional **anterior aos dois inventários** | **1** | Arquivos ausentes na respectiva árvore |
| Refs `pull` adicionais com os inventários antigos | **1 de 2** | Uma ref aponta para blobs antigos de ambos os inventários; outra não contém os dois arquivos |
| Tags disponíveis | **0** | Nenhuma ref da categoria `tags` retornada |
| `main` | **1** | Inventários saneados, conformidade específica já validada nos PRs #22–#26 |

**Importante:** as 21 branches e a ref `pull` não representam necessariamente 22 cópias únicas; algumas refs podem apontar aos mesmos objetos. A abertura de uma branch exclusivamente documental para registrar esta auditoria altera a contagem posterior de branches; as quantidades acima são uma **fotografia anterior a essa escrita**.

O **PR #4 continua aberto e bloqueado**, e sua branch está entre as que contêm os inventários antigos. As branches associadas a PRs já incorporados também mantiveram seus HEADs antigos, sem atualização automática.

## Avaliação de risco e decisão

**Achado novo e real:** o saneamento da `main` pelo PR #22 corrigiu seus arquivos atuais, mas **não corrigiu os HEADs das branches antigas nem a ref `pull` obsoleta**. Esses HEADs continuam a expor metadados antigos (identificadores Git de origem privada e referência de execução) já caracterizados na auditoria documental anterior.

**Não há nesta investigação evidência de token, senha ou chave vazada.** A auditoria de conteúdo anterior detectou zero correspondências nos padrões literais examinados, o que **não comprova ausência universal de segredos**. O risco de rastreabilidade indevida e de cópias históricas é confirmado. O histórico Git permanece acessível mesmo que uma branch seja excluída.

**Decisão segura neste ciclo:** não apagar, renomear, forçar atualização nem reescrever as branches/ref `pull`, sobretudo a branch do PR #4 ainda aberto. Não tentar modificar refs administradas pelo GitHub. Também não operar forks, caches, clones, repositórios financeiros, credenciais, Google Sheets ou Windows.

## Alternativas de mitigação — apenas análise, sem execução

- **Branches de PRs já mesclados:** avaliar a necessidade de mantê-las antes de qualquer proposta de exclusão, inventariar dependências/referências e plano de recuperação dos ponteiros. A exclusão de branch pode quebrar fluxos e **não expurga commits históricos**; portanto, não equivale a remediação integral.
- **Branch do PR #4:** preservar até a resolução de seu bloqueio; não integrá-la, atualizar à força ou excluí-la para tentar obter conformidade.
- **Refs internas `pull`:** consideradas gerenciadas pelo GitHub; não tentar remoção via força nem presumir capacidade de exclusão.
- **Conteúdo histórico e clones/caches:** qualquer higienização profunda dependeria de avaliação de impacto, procedimento específico de resposta a incidente e autorizações pertinentes. Não há base nesta verificação para uma rotação específica de credenciais.
- **Prevenção futura:** antes de novas funcionalidades de publicação, estimar esforço e declarar expansão de escopo/baseline; o gate atual só inspeciona a árvore vigente da branch executada, não todo histórico nem outras refs.

## Progresso

Auditoria de exposição preexistente, sem nova funcionalidade: **E-TEST 7,00/8,00h = 87,50% concluído e 12,50% restante**. P4.1 ainda EM EXECUÇÃO, L1/L2 privados NÃO atestados; E-INFRA-L2 (10–16h) ADIADA, fora do baseline. Weine histórico 92,11% permanece igual. PR #4 segue aberto e bloqueado. Dados financeiros, fórmulas, abas técnicas, repositórios privados e infraestrutura não foram alterados.

## PROXIMA ACAO A EXECUTAR - SUJEITA A VERIFICACAO

1. Conferir HEAD da `main`, revisão deste relatório, ROADMAP e HANDOFF, PR e CI antes de declarar a documentação incorporada.
2. Preparar **plano documental de tratamento de refs obsoletas**, discriminando PRs mesclados, PR #4 aberto e refs administradas pelo GitHub, com impacto, pré-condições e reversibilidade. Não executar exclusões, force-push ou reescrita.
3. Evitar expansão artificial de testes sintéticos; se não houver medida útil e segura autorizada, manter o risco residual documentado e concluir esta frente de auditoria sem alegar saneamento histórico.
