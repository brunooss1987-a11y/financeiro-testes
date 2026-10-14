# P4.1 — Protocolo proposto de comprovacao privada de fonte e teste

**Estado: PROJETO TECNICO REVISTO EM SOMENTE LEITURA. NAO IMPLEMENTADO NEM HOMOLOGADO NOS SISTEMAS PRIVADOS.**

Data da avaliacao: 2026-10-14. Esta especificacao e publica, mas **nenhum arquivo, hash, ID operacional, log, credencial ou codigo dos sistemas privados e publicado aqui**. O faturamento de Actions privado fica fora do caminho critico.

## 1. Evidencias da auditoria somente leitura

| Sistema | Mecanismos existentes confirmados no repositorio privado | Consequencia para o protocolo |
|---|---|---|
| Weine — ramo principal | Validacao de manifesto, estrutura e sintaxe via Node/VM; outros testes invocam Apps Script remoto por `clasp` | Validacao sintatica NAO prova comportamento; teste remoto NAO se torna offline por usar o mesmo nome |
| Weine — laboratorios ainda em PRs draft | Suites Node carregam codigo de laboratorio e casos de execucao em `vm`, com simulacoes; outra suite verifica comportamento estatico e codigo de regressoes em `vm` | Fixar o **commit da propria branch**, nao tratar ramos draft como codigo incorporado nem como producao |
| Casa Santana — ramo principal | Workflow executa validacao do repositorio e varios testes Node; existem casos com import direto de modulo offline e outros que leem arquivos Apps Script e executam seu texto em `vm` | Registrar o **arquivo de fonte realmente carregado por cada teste**, e nao somente a existencia da funcao no repositorio |
| Ambos | CI remota e testes offline sao mecanismos diferentes | Provas do codigo no checkout, do teste offline, da versao implantada e do fluxo financeiro E2E devem ter estados distintos |

A inspecao consultou o codigo dos validadores, os runners de laboratorio e os respectivos workflows em leitura. Nao executou novos testes privados nem comprovou qual versao esta implantada nos projetos Google.

## 2. Niveis de evidencia que nao devem ser confundidos

| Nivel | Afirmacao permitida | Evidencia exigida | O que NAO comprova |
|---|---|---|---|
| L0 — Demonstracao publica | Arquivo demonstrativo corresponde a hash fixado; testes sinteticos passaram | Contrato publico ja existente, CI publica | Identidade ou comportamento de qualquer motor privado |
| L1 — Fonte privada conferida | Bytes do arquivo privado no checkout correspondem ao commit auditado | Commit exato, checkout limpo, caminho autorizado, Git blob + SHA-256 calculado localmente | Que o processo de teste realmente carregou e executou esses bytes |
| L2 — Teste privado executado | Um teste offline identificado rodou sobre os arquivos verificados e teve resultado documentado | L1 + mapeamento das dependencias carregadas + comando e exit code + digest do teste e ambiente + conferencia antes e depois | Codigo implantado no Apps Script, planilha real, autenticacao ou pagamentos |
| L3 — Runtime/remoto conferido | Fonte consultada por API autorizada corresponde a artefato esperado | Comparacao por leitura remota autenticada e identidade de projeto/deployment, sem escrita | Homologacao financeira E2E |
| L4 — E2E financeiro homologado | Transacao controlada em LAB obedeceu precondicoes, poscondicoes e reconciliacao | Autorizacao, backup, dados ficticios, operacao LAB limitada, dupla leitura e evidencias privadas | Seguranca automatica de operacoes futuras |

**Situacao atual da P4.1: apenas L0 do hub esta validado.** Evidencias historicas privadas de alguns testes existem, mas ainda nao compoem um atestado reproduzivel L2 do protocolo aqui proposto. L3/L4 nao foram executados nesta frente.

## 3. Procedimento privado e offline — a IMPLEMENTAR quando houver ambiente autorizado

**Preflight (falhar fechado):** trabalhar numa copia isolada, confiavel e dedicada de UM repositorio privado por vez. Registrar `git rev-parse HEAD` e exigir `git status --porcelain --untracked-files=all` limpo. Nunca usar apenas o nome da branch como identidade. Conferir permissao de leitura e ausencia de links simbolicos ou travessia fora da raiz. Nao operar sobre planilhas nem Apps Script.

**Manifesto de dependencias (privado):** lista explicita do runner, arquivos-fonte efetivamente importados ou lidos pelo teste, seus caminhos resolvidos, Git blob ID e SHA-256 de **bytes reais**; arquivos de configuracao e lockfile apenas se empregados. Para testes por `vm`, incluir o arquivo lido com `readFileSync`; para imports Node, conferir a arvore de imports permitidos. Se o mapeamento nao puder ser demonstrado, registrar `SOURCE_BINDING_UNVERIFIED` e NAO aprovar.

**Execucao controlada (posterior a revisao do teste):** comando Node concreto, sem `shell=true`, com lista de argumentos fixa, ambiente minimo, timeout, diretorio de trabalho especifico e isolamento de rede comprovado pelo ambiente (nao apenas pela ausencia de `fetch` no codigo). No primeiro piloto, executar somente **um par ja revisado de modulo offline e seu teste** de cada sistema; nao acionar validadores abrangentes, deploy, `clasp`, gatilhos remotos ou scripts cujo efeito colateral nao tenha sido auditado.

**Posflight:** antes e depois do teste, recalcular hashes dos arquivos-mapeados, verificar que `HEAD` e a arvore limpa nao mudaram e que o processo finalizou dentro do limite. Qualquer diferenca produz `SOURCE_CHANGED`; exit code diferente de zero produz `TEST_FAILED`; fonte nao conferida produz `UNVERIFIED`. Nunca converter erro ou timeout em sucesso.

**Registro exclusivamente PRIVADO:** guardar um JSON minimo contendo versao do esquema, ID do projeto abstrato, commit, sinalizador de working tree limpa, lista interna de dependencias/hashes, versao Node/SO, argv autorizada, horario, duracao, exit code e resultado. Tratar stdout/stderr e logs como dados sensiveis; nao os enviar brutos a Actions/publico. Um arquivo JSON comum pode ser modificado: assinatura/atestado verificavel adicional e exigido para garantia de proveniencia contra agente malicioso. A prova L2 so deve ser marcada `verified` apos revisar todas essas ligacoes.

**Separacao de estado:** campos independentes para `privateSourceBytesMatched`, `actualDependenciesBound`, `offlineTestPassed`, `remoteRuntimeVerified` e `financialE2EVerified`. Os ultimos dois serao `false` nesta proposta.

## 4. Pilotos privados de baixo risco

**Weine:** selecionar a menor suite offline ja inspecionada do laboratorio, fixando o commit do PR draft. Verificar o modulo e o teste correspondente, sem qualquer comando remoto. A suite de simulacao que carrega codigo de laboratorio podera ser considerada em etapa posterior, depois da revisao de dependencias e efeitos colaterais. Os testes WAC/implantacao ficam EXCLUIDOS.

**Casa Santana:** selecionar o teste do modulo offline de classificacao de recusa, cujas dependencias sao exclusivamente Node e o modulo local. O runner geral chama muitas suites e nao deve ser executado automaticamente num ambiente privado sem revisao de todos os efeitos; testes que avaliam `.gs` em `vm` exigem vincular o SHA-256 do arquivo realmente lido.

Se um executor local privado seguro nao estiver disponivel, **nao substituir por publicacao no hub**. Registrar plano PENDENTE e continuar apenas a revisao documental.

## 5. Controles e limites operacionais

- Nao armazenar nem transferir ao hub nenhum hash, fonte, nome de usuario, dado financeiro, ID de planilha ou recibo de execucao **privado**. O contrato publico demonstrativo permanece independente.
- Nao instalar runner persistente na maquina pessoal, nao autenticar Google para o teste offline, nao usar ambientes com credenciais de producao, nao puxar fontes privadas em jobs publicos.
- Nao assumir que `vm.Script` do Node produz isolamento de seguranca contra codigo hostil. O isolamento confiavel e responsabilidade do sistema operacional e do ambiente de execucao.
- Nao usar a sucesso de um teste historico como prova de que o codigo corrente e a versao implantada continuam iguais; confrontar commit e hashes antes de reutilizar qualquer evidencia.
- Na ausencia de aprovacao de ambiente ou diante de bloqueio de seguranca da plataforma, nao tentar outro conector ou metodo para contornar a recusa; registrar impedimento.

## 6. Criterios para avancar a P4.1

1. Protocolo e niveis aprovados como especificacao, sem alterar nenhum repositorio privado.
2. Implementacao futura do piloto privado revisada e executada somente em ambiente devidamente autorizado.
3. Atestado L2 verificavel para uma pequena suite REAL por sistema, em seus respectivos repositorios privados, comprovando identidade do modulo/teste executados e resultado; nao e necessario publicar qualquer fonte no hub.
4. Documento de integracao demonstrando o papel complementar das suites publicas e privadas, com LIMITACOES CLARAS. L3/L4 ficam independentes e nao devem ser reclamados.
5. PRs e controles de seguranca verificados, ROADMAP e HANDOFF atualizados somente com evidencias realmente observadas.

**Esforco de implementacao adicional:** estimativa preliminar de 2 a 4 horas para adaptar e homologar os dois pilotos privados com atestados locais, caso o tempo restante da P4.1 nao seja suficiente. Tratar diferenca como **possivel expansao de escopo futura**, nunca incorporada automaticamente ao baseline E-TEST de 6 horas.

**Proxima acao sujeita a verificacao:** conferir que esta especificacao e os documentos da P4.1 passaram nos tres checks do hub; depois avaliar, somente em leitura, qual ambiente privado ja autorizado pode produzir as provas L1/L2 sem risco nem dependencia de GitHub Actions privado.
