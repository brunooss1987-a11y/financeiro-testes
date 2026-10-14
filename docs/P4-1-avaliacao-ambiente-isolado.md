# P4.1 — Pré-validação de ambiente privado offline (sem executar fontes)

**Estado: AVALIAÇÃO EXECUTADA; ISOLAMENTO AINDA NÃO VALIDADO.** Este documento não é autorização para executar testes financeiros, transferir código, instalar software ou alterar políticas do computador. Nenhum ambiente privado foi iniciado nesta etapa.

## Resultado operacional da avaliação

A infraestrutura de testes do hub público já foi validada; sua execução demonstra somente o funcionamento das suítes sintéticas. Para as duas origens financeiras privadas, o protocolo de atestação L1/L2 em `docs/P4-1-protocolo-evidencia-privada.md` exige um executor privado capaz de comprovar isolamento e identidade dos arquivos.

Uma inspeção técnica **somente de leitura** do equipamento autorizado encontrou compatibilidade geral com virtualização e disponibilidade do executável Windows Sandbox. A primeira consulta do recurso exigiu elevação; uma verificação adicional pelo WMI `Win32_OptionalFeature` retornou `Containers-DisposableClientVM / InstallState=1` (**Enabled**, conforme Microsoft Learn), sem exigir elevação ou alterar o sistema. **O recurso está habilitado, mas nenhuma instância isolada foi aberta/testada**. Não há executor Docker/Podman ou Linux/WSL pronto comprovado neste diagnóstico.

Não publicar neste hub nomes, caminhos locais, identificadores, detalhes adicionais de hardware ou dados da estação de trabalho.

## Perfil inicial seguro, ainda NÃO executado

`examples/windows-sandbox-no-access.wsb` é um **modelo inativo** para um futuro teste de isolamento com **nenhum arquivo financeiro**:
- `Networking=Disable`: não disponibilizar conexão de rede ao guest;
- `ClipboardRedirection=Disable`: não compartilhar área de transferência;
- `vGPU=Disable`, `AudioInput=Disable`, `VideoInput=Disable`, `PrinterRedirection=Disable`: reduzir integrações com o host;
- `ProtectedClient=Enable`: solicitar mitigação adicional do cliente;
- **Sem `MappedFolders` nem `LogonCommand`**: sem acesso às pastas do computador e sem execução automática de comandos.

O perfil não instala Node, não configura autenticação, não contém código nem caminhos privados e **não foi aberto/validado num guest**. Um perfil seguro no papel não substitui a validação da instância real. Não usar o Sandbox padrão, que costuma habilitar rede e clipboard.

Documentação: https://learn.microsoft.com/en-us/windows/security/application-security/application-isolation/windows-sandbox/windows-sandbox-configure-using-wsb-file

## Gates verificáveis — antes de qualquer piloto L1/L2

**Gate A — Recurso (PARCIALMENTE VERIFICADO):** o status do recurso está confirmado como `Enabled (1)` por consulta WMI somente leitura. Ainda falta confirmar que a instância inicia com o perfil restritivo e sem modificar a configuração do host. Se iniciar depender de ativação adicional, reinício ou instalação, parar e tratar a mudança separadamente.

**Gate B — Confinamento:** iniciar somente o modelo de teste sem dados; verificar no guest que não houve acesso às pastas do host, que a rede permanece desativada, que o clipboard não está disponível e que o ambiente pode ser descartado. Registrar apenas resultado PASS/FAIL, sem informações pessoais.

**Gate C — Runtime:** determinar como disponibilizar um runtime Node **confiável e verificado** inteiramente offline, sem baixar nada no guest nem usar credenciais do host. A disponibilidade de Node no host não implica disponibilidade dentro de uma Sandbox nova.

**Gate D — Entradas privadas mínimas:** somente após A–C, desenhar um caminho aprovado e exclusivo para entregar ao guest as pequenas cópias privadas de UM teste revisado e das dependências exatas, sem `.env`, `.clasp`, tokens, IDs operacionais desnecessários, backups, histórico do repositório inteiro ou montagens com gravação habilitada. Qualquer futuro mapeamento deve ser isolado, justificado e, quando existir, somente leitura.

**Gate E — Saída confiável:** definir antes do teste como provar comando, hashes, saída mínima, exit code e ausência de modificação sem reabrir canal inseguro para o host. **Sem saída verificável não há atestado L2**. Não presumir que o arquivo pode sair do guest com rede/clipboard bloqueados; não ativar pasta compartilhada gravável só para facilitar a coleta de evidências.

**Gate F — Política/execução:** revisar o comando específico e suas dependências, proibir Google, `clasp`, rede e deploy. A simples execução sob `node:vm` não substitui isolamento de processo/sistema operacional. Validar pré/pós-hash somente num ambiente devidamente autorizado.

## Candidatos já selecionados, nenhum executado neste ciclo

- Weine E1.4: teste mínimo offline do guard de sobrescrita registrado em P2.1; a branch ainda exige commit fixo e correspondência exata.
- Casa Santana: teste mínimo offline do guard de recusas registrado em P3.1; verificar novamente commit e dependências reais no momento da execução.
- Em ambos, qualquer evidência de testes historicamente executados continua HISTÓRICA. Este ciclo apenas avaliou o ambiente.

## Decisão desta rodada

**Windows Sandbox está habilitado e é a melhor opção local preliminar, MAS NÃO ESTÁ APROVADO PARA TESTES FINANCEIROS.** Não executar scripts privados no host sem sandbox e não tentar ultrapassar recusas anteriores da plataforma. Sem Gate A/B comprovados, o trabalho deve permanecer em modo de planejamento.

Alternativas futuras (implantação sujeita a avaliação/esforço): VM descartável isolada, runner privado com credenciais ausentes, ou recuperação dos workflows privados quando o usuário optar por retomar o tema. Nenhuma foi configurada agora.

**Progresso inalterado:** P4.1 EM EXECUÇÃO; expansão E-TEST 5,00/6,00h = 83,33% concluída, 16,67% restante; Weine histórico 92,11% concluído.

**Próxima ação sujeita a verificação:** verificar que este perfil e o relatório foram publicados e passaram na CI. Depois, testar SOMENTE o início e os controles de uma instância sintética, sem arquivos compartilhados, sem scripts privados e sem mudar o Windows; registrar se o perfil restritivo realmente se aplica. Se falhar ou exigir mudança adicional do SO, registrar o impedimento em vez de ativar recursos automaticamente. Não marcar L1/L2 nem P4.1 como concluídos até existirem as provas necessárias.

## Evidencia posterior de verificacao somente leitura

Em 2026-10-14, `Get-CimInstance Win32_OptionalFeature` confirmou o recurso `Containers-DisposableClientVM` com `InstallState=1`. Fonte para interpretacao: https://learn.microsoft.com/en-us/windows/win32/cimwin32prov/win32-optionalfeature (Enabled = 1). A confirmacao de recurso habilitado **nao** comprova guest inicializado, isolamento observado nem adequacao para testes privados. O status dos gates B–F permanece pendente.

## Ensaio complementar: sessao remota confirmada; isolamento interno NAO aferido (2026-10-14)

Um perfil .wsb temporario, sintaticamente validado e sem rede, clipboard, MappedFolders ou LogonCommand foi iniciado. O launcher WindowsSandbox.exe encerrou enquanto os processos WindowsSandboxRemoteSession e WindowsSandboxServer, junto dos processos de VM, permaneceram ativos; a janela Windows Sandbox existia. Isso confirma disponibilizacao da sessao, NAO os controles dentro da VM. A ferramenta remota disponivel nao possibilitou coletar observacao auditavel de rede, clipboard e pastas diretamente no guest. Nenhum comando foi executado dentro do guest e nenhum arquivo privado foi usado. A sessao remota foi encerrada e os arquivos temporarios eliminados, com ausencia do processo de sessao confirmada.

DECISAO: Gate B **PARCIAL / NAO APROVADO**. Manter Gates C–F, L1/L2 e P4.1 pendentes. Proximo passo seguro: verificar mecanismo de interacao visual autorizado, capaz de observar controles efetivos no guest sem utilizar nenhum canal atualmente proibido. Caso isso nao exista, tratar como bloqueio tecnico e considerar ambiente isolado alternativo; nao validar isolamento apenas pelo XML de configuracao ou pela existencia de janela. Progresso E-TEST 83,33% e Weine 92,11% nao mudam.

## Novo ensaio: rede, mapeamentos e clipboard observados dentro do guest (14/10/2026)

O limite anterior de observabilidade foi superado com captura direcionada à janela WindowsSandboxRemoteSession (PrintWindow) e entrada por teclado com foco da janela validado, sem alterar nenhum parâmetro de isolamento. Foram realizados comandos nativos sem dados reais no CMD do guest. `ipconfig` não mostrou adaptadores, `net use` não mostrou conexões e `Get-PSDrive -PSProvider FileSystem` listou somente a unidade C: interna do guest. Um marcador sintético de clipboard escrito e lido no guest não apareceu no clipboard do host quando este foi consultado apenas por um booleano. Não houve transferência de dados reais ou modificação do clipboard do host. O sentido inverso host->guest não foi exercitado, assim como não foi feito ataque adversarial para procurar canais ocultos.

A sessão remota foi encerrada e sua ausência foi confirmada após o encerramento; arquivos de teste e imagens temporárias foram removidos. Gate B: **controles operacionais testados PASS**, mas **escopo bidirecional e adversarial não integralmente homologado**. Os Gates C–F e evidências privadas L1/L2 ainda dependem de implementação/autorização. Relatório sanitizado: `docs/P4-1-ensaio-interno-sandbox.md`. Próxima tarefa: viabilidade do Node offline e de um canal seguro de entrada/saída, sem executar código dos sistemas financeiros.
