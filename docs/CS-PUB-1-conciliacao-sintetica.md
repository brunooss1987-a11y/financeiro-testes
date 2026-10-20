# CS-PUB.1 — Conciliação sintética de remuneração (escopo aprovado antes do código)

**Data:** 19/10/2026. **Situação inicial:** PLANEJADA; testes, PR e CI ainda não executados.
**Origem desta iniciativa:** continuação do módulo de profissionais do projeto Casa Santana, **sem copiar o Apps Script, os testes privados ou dados reais** para o repositório público.

## Escopo original e estimativa

Expandir o hub público por **1,50h de trabalho estimado, em trilha CS-PUB.1 separada**. Não incorporar este peso ao baseline histórico E-TEST+E-ARQ+E-RES.1 (15,50h), Weine e P4.1: a trilha é uma iniciativa da Casa Santana e não significa revalidar nem alterar progresso de Weine.

Criar módulo JS puro original sob `casa-santana/src/`, com testes inteiramente sintéticos acrescidos a **um dos cinco arquivos existentes** de `casa-santana/tests/`. Preservar os cinco nomes porque os contratos públicos T3/T5 verificam a lista exata de fixtures.

## Contrato e critérios de aceite

1. Entradas somente em memória, com IDs fictícios, competência no formato YYYY-MM, valores estritamente em **centavos inteiros**, obrigações, pagamentos e **alocações explícitas** entre um pagamento e uma obrigação.
2. Não vincular por valor, texto, identidade aproximada ou data. Bloquear IDs duplicados, inconsistências de pessoa, fontes ausentes, alocação acima da obrigação, pagamento dividido além do total e centavos não inteiros.
3. Distinguir quitação regular e adiantamento patrimonial alocável; um adiantamento classificado como despesa econômica é **pendência econômica**, nunca abatido automaticamente. Permitir várias alocações válidas para pagamentos parciais sem criar nova obrigação.
4. Resultado determinista, sem mutações de entrada, sem efeito colateral, sem importação privada, rede, filesystem, credenciais, Google Sheets, Apps Script, tokens, IDs reais, planilhas, CPF, nomes de clientes ou pagamentos verdadeiros. O módulo **não faz lançamento financeiro**.
5. Testar entradas normais, pagamentos no mês seguinte (representado por metadado de caixa, sem realocação implícita), adiantamento ainda não alocado, quitação completa, duplicidades, pagamento acima do saldo, pessoa divergente, centavo fracionário, ausência de vínculo, abuso de classificação e imutabilidade.
6. CI pública: exigir os três checks sem relaxar `tools/check-publication.mjs`, `contents: read`, sem checkout privado, segredos, deploy, Google OAuth nem substituição de validação privada. Não fazer merge antes da revisão do diff, dos checks e da aprovação de segurança.
7. Atestar unicamente o comportamento do contrato **sintético público**; a homologação do motor Casa Santana exige integração em ambiente privado, gateway de escrita ADV, backup e testes em cópia autorizada.

## Plano de execução

- **Planejado:** registrar expansão e controles (este documento e referência no ROADMAP) antes do código.
- **A executar:** criar o módulo original e testes sintéticos na branch `feature/casa-pagamentos-sinteticos-20261019`.
- **A validar:** PR isolado, gate, piloto Weine e piloto Casa Santana na CI, inspeção de arquivos publicados e limites de segurança.
- **Após validação:** atualizar ROADMAP/HANDOFF público e issue de Casa Santana com evidências concretas. Nenhuma fonte privada ou planilha sofrerá qualquer alteração por esta etapa.

## PROXIMA ACAO A EXECUTAR - SUJEITA A VERIFICACAO

Verificar HEAD da branch pública e se os controles históricos continuam presentes. Implementar apenas módulo e testes sintéticos desta etapa, sem alterar os testes de contratos históricos além dos cenários de Casa Santana no arquivo escolhido. Depois criar PR, verificar checks e rever segurança antes de merge.
