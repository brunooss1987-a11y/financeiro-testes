# P4.1 — Ensaio interno do Windows Sandbox: controles observados

**Data:** 14/10/2026. **Tipo:** ensaio estritamente sintético, sem dados ou fontes de Weine/Casa Santana.

## Contexto e método

Antes do ensaio, foi confirmado que nenhuma sessão WindowsSandboxRemoteSession estava ativa. O arquivo .wsb temporário tinha `Networking=Disable`, `ClipboardRedirection=Disable`, `vGPU=Disable`, áudio/vídeo/impressora desabilitados, `ProtectedClient=Enable`, **sem** `MappedFolders` ou `LogonCommand`. O XML foi relido e validado antes de abrir a instância.

Foi estabelecida observação visual do **conteúdo da janela remota** via API nativa `PrintWindow`, sem compartilhamento de pastas, rede ou clipboard. Para interagir, a janela foi trazida temporariamente ao primeiro plano e o foco foi conferido antes de enviar teclas; o foco anterior foi restaurado. Nenhum terminal da máquina principal foi conectado ao sistema de arquivos ou ao console da VM.

Dentro do guest foi aberto um CMD e executados apenas comandos do Windows de consulta ou uso de dados inventados.

## Evidências visuais observadas NO GUEST

| Controle | Ação feita no guest | Observação | Parecer do ensaio |
|---|---|---|---|
| Rede | `ipconfig` | Apresentou somente o cabeçalho de configuração IP, **sem adaptadores** listados | PASS no teste de adaptadores |
| Compartilhamentos de rede | `net use` | Informou que **não existem entradas** na lista | PASS no teste de mapeamentos de rede |
| Unidades visíveis | `Get-PSDrive -PSProvider FileSystem` | Retornou somente o volume local `C:` da Sandbox | PASS no teste de drives listados |
| Clipboard guest → host | Marcador artificial escrito no clipboard do guest e lido novamente ali via `Get-Clipboard` | Marcador confirmado **dentro** do guest; consulta no host indicou que ele **não** apareceu no clipboard principal | PASS nessa direção observada |

A consulta ao clipboard da máquina principal retornou **somente um booleano** de presença do marcador sintético. Nenhum conteúdo preexistente do usuário foi impresso, copiado para o guest ou registrado. O host não teve seu clipboard alterado.

**Limitações explícitas:**
- Não foi feita tentativa host → guest de colagem de marcador, para evitar modificar o clipboard do usuário ou inadvertidamente enviar conteúdo pessoal ao guest. O teste empírico de clipboard foi **unidirecional**.
- Ausência de adaptadores, drives e compartilhamentos nas verificações realizadas não equivale a auditoria de todas as interfaces ocultas ou a prova contra ataques de código hostil.
- A configuração .wsb restritiva e as observações são evidências práticas para este ensaio, não certificação completa do hipervisor.
- Não foram executados comandos de rede de saída, arquivos dos sistemas financeiros, scripts Node, testes reais, conectores Google nem qualquer credencial privada.

## Limpeza e resultado

A sessão WindowsSandboxRemoteSession foi encerrada e sua ausência foi comprovada em uma verificação posterior. O perfil temporário .wsb e as capturas locais do guest foram excluídos do host. Nenhuma captura ou transcrição contendo dados locais foi publicada neste repositório; este documento contém somente as observações sanitizadas.

**Gate B: verificação operacional básica COM EVIDÊNCIAS REAIS** de rede sem adaptadores, ausência de drives/compartilhamentos mapeados e bloqueio do clipboard guest → host. **Gate B integral permanece PARCIAL**, pois o sentido host → guest não foi aferido e não foi produzido atestado de isolamento adversarial. Não declarar aptidão irrestrita para executar código financeiro sem análise adicional.

**Gate C (runtime Node offline), Gate D (entrada privada mínima), Gate E (prova de saída) e Gate F (revisão da execução) permanecem PENDENTES. L1/L2 privados não realizados. P4.1 NÃO concluída.**

## Próxima ação executável

1. Verificar que os três jobs da CI e o merge deste relatório/ROADMAP/HANDOFF concluíram com sucesso e que os documentos Drive foram atualizados.
2. Planejar **somente em leitura** Gate C: como obter e verificar integridade de um Node portátil confiável em guest offline, com caminho de entrada e saída seguro que preserve `Networking=Disable`, `ClipboardRedirection=Disable` e ausência de `MappedFolders`; se não houver caminho seguro, registrar impedimento.
3. Projetar teste sintético adicional host → guest somente se for possível preservar integralmente o clipboard do host sem risco de exposição. Não comprometer dados pessoais para fechar artificialmente o Gate B.
4. Qualquer eventual teste privado futuro exige gates completos e atestado L1/L2 local verificável, não utilização da CI pública para código privado, nem reabertura do PR #4 bloqueado.

**Progresso ponderado inalterado:** E-TEST 5,00h/6,00h = 83,33% concluído | 16,67% restante; Weine histórica 92,11% concluída | 7,89% restante.
