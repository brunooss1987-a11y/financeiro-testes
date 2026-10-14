# P4.1 — Alternativas de evidência L1/L2 sem instalar infraestrutura

**Data:** 2026-10-14. **Decisão de escopo:** adiar E-INFRA-L2; sem ativação de Hyper-V, nova VM, download de Node/Linux, reinício ou expansão do baseline. **Tipo:** avaliação e piloto EXCLUSIVAMENTE público/sintético. **P4.1 permanece EM EXECUÇÃO.**

## 1. Requisitos que não podem ser reduzidos
O protocolo `docs/P4-1-protocolo-evidencia-privada.md` distingue:
- **L0** — código de demonstração pública e CI sintética;
- **L1** — bytes privados no checkout limpo ligados a um commit exato, Git blob e SHA-256 local;
- **L2** — L1 + teste privado executado no conjunto de fontes efetivamente carregadas, com ambiente, comando, exit code e verificações antes/depois;
- **L3/L4** — runtime remoto e homologação financeira, independentes.

O sucesso de CI privada histórica não substitui a cadeia exigida por L2; também não comprova que o motor atual e o implantado sejam idênticos. Não executar fontes privadas no host sem isolamento aprovado, nem publicá-las no hub para contornar limitações.

## 2. Alternativas avaliadas (sem nova infraestrutura)

| Caminho | Evidência observável/possível | Decisão sob restrições atuais |
|---|---|---|
| **A. GitHub autenticado somente leitura** | Revisar commit, árvore e Git blob de fonte privada sem mover arquivos para o hub; fornece metadados de proveniência | **PARCIAL / pré-L1**. Não demonstra checkout local limpo ou SHA-256 local; não promover a L1/L2 |
| **B. Reutilizar CI privada histórica** | Há execução anterior com sucesso e commit confirmado nos metadados de um piloto; logs anteriores registram cenários sintéticos | **EVIDÊNCIA HISTÓRICA LIMITADA**. Não contém, sob o protocolo novo, manifesto de todos os bytes realmente carregados nem verificação antes/depois; não promover a L2 |
| **C. Node já existente no host** | Executaria tecnicamente os testes offline | **NO-GO para fonte privada** sem fronteira de isolamento aprovada; não executar só porque runtime existe |
| **D. Windows Sandbox com controles atuais** | Boot e controles básicos observados | **B/C incompletos**: entrada/saída de Node e atestado sem rede/clipboard/pastas ainda não aprovadas; não enfraquecer política |
| **E. GitHub Actions público** | CI com `contents:read`, testes falsos e contrato SHA-256 do demo | **GO somente L0**, sem checkout privado, segredos, atestados privados ou homologação |
| **F. GitHub Actions privado preexistente** | Alguns testes históricos já executados | **Não reiniciar nem contornar bloqueio de billing**; sem nova execução ou runner |
| **G. VM offline Hyper-V proposta** | Possibilidade de cadeia separada de entrada, execução e saída | **ADIADA** pelo Conselho. G0 não autorizou implementação; G1–G9 operacionais NOT_TESTED; E-INFRA-L2 10–16h NÃO incorporada |

**Conclusão:** a evidência existente pode apoiar a auditoria de proveniência, mas **nenhum caminho atualmente autorizado satisfaz integralmente L1 + L2 novos** sem conferir e executar as fontes no ambiente privado adequado. Não inventar um `PASS`.

## 3. Nova experiência segura, delimitada a L0

Foi acrescentado `tools/prove-public-demo-run.mjs` para o **único** exemplo já público:
1. Confere o contrato SHA-256 fixado de `src/shared/centavos-demo.mjs` via verificador existente.
2. Verifica que `tests/weine/piloto.test.mjs` é arquivo local regular e declara a importação do demo; calcula seu digest.
3. Executa apenas esse teste público fixo com `node --test`, sem shell, argumentos fornecidos pelo usuário, dependências externas ou uso de material financeiro; restringe ambiente, duração e tamanho de buffers.
4. Reconfere hashes de fonte, teste e manifesto depois; falha fechado em mudanças ou execução não verificável.
5. Entrega recibo sintético com digests públicos, status e exit code. Todos os sinalizadores de **L1/L2 privado, dependências efetivamente vinculadas, guest isolado, remoto e E2E** são explicitamente `false`.

Este recibo **não é criptograficamente assinado, não prova árvore dinâmica de imports, não estabelece isolamento adversarial nem atesta código privado**. A importação declarada por texto não é evidência suficiente de dependência realmente carregada. O código é deliberadamente **incapaz de receber caminhos ou comandos privados**; não deve ser adaptado para executá-los sem nova revisão de ameaça.

Os testes adicionais das duas suites públicas verificam o recibo e que todas as alegações privadas continuam `false`. Executá-los pela CI normal **não equivale** a repetir uma etapa do roadmap: testa a funcionalidade nova de vincular integridade antes/depois ao exit code exclusivamente demonstrativo.

## 4. Gates e estado após a avaliação
- **EXECUTADO:** seleção fundamentada das alternativas; módulo e testes sintéticos criados em branch documental, sujeitos a PR, CI e readback da main.
- **VALIDAÇÃO PENDENTE neste ponto:** três checks obrigatórios do PR, diff de publicação, merge e CI pós-merge.
- **NÃO EXECUTADO:** qualquer teste privado novo, movimentação de arquivos privados, ativação de hipervisor, alteração de SO, planilha ou Apps Script.
- **P4.1:** EM EXECUÇÃO (não concluída); L0 público existente, extensão do demonstrador ainda sujeita à CI; L1/L2 privados PENDENTES.
- **Progresso:** E-TEST **5,00/6,00 h = 83,33% concluído / 16,67% restante**; histórico Weine **92,11% / 7,89%**. E-INFRA-L2 **10–16h adiadas, não incorporadas**.

## 5. Próxima ação — sujeita à verificação
1. Validar o PR e os três checks, revisar completamente os diffs para excluir qualquer exposição ou execução privada; somente depois incorporar e verificar CI da `main`.
2. Confirmar no código/CI que o recibo permanece limitado a `public-demo` e nunca promove L1/L2; caso contrário corrigir ou reverter antes de avançar.
3. Auditar somente **metadados** dos comprovantes históricos existentes para identificar se já há um manifesto completo de dependências executadas, sem reexecutar, baixar ou republicar fontes. Se não existir, manter L1/L2 bloqueados e registrar o limite factual, sem ciclo infinito de testes sintéticos.
4. Não mexer em E-INFRA-L2, Windows, billing, PR #4 bloqueado, fontes privadas ou dados financeiros.
