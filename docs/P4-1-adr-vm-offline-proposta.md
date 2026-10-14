# P4.1 — Decisao tecnica proposta: VM privada offline para provas L1/L2

**Data:** 2026-10-14. **Estado:** AVALIADA, NAO APROVADA PARA IMPLANTACAO, NAO INCORPORADA AO BASELINE. Nao criar maquinas virtuais, nao habilitar Hyper-V e nao executar codigo financeiro a partir deste documento.

## 1. Fontes de verdade e precondicoes

- O estado financeiro privado e preservado. O repositório PUBLICO compartilha apenas suites demonstrativas; PR #4 com transferencia de fontes privadas esta ABERTO/BLOQUEADO e nao deve ser repetido.
- Gate B do Windows Sandbox: verificacoes internas sinteticas mostraram ausencia de adaptadores IP, conexoes mapeadas e drives alem de C:, e o marcador de clipboard nao transitou de guest para host. **Host -> guest e isolamento adversarial nao foram comprovados**.
- Gate C: Node verificado no HOST apenas; guest nao recebeu Node, e politica corrente proibe rede, clipboard, MappedFolders e comandos automaticos. A existencia de Windows Sandbox **nao estabelece** mecanismo aprovado de entrada/saida de arquivos e comprovantes.
- Inventario somente leitura anterior: recursos completos do Hyper-V e Virtual Machine Platform DESABILITADOS; comandos Get-VM/New-VM indisponiveis; nenhuma VM pronta provada; VirtualBox, VMware, QEMU, Docker e Podman nao detectados.
- Nova inspecao somente leitura: RAM e armazenamento secundario indicam **capacidade potencial** para UMA VM Linux pequena; a unidade do sistema tem folga limitada. Valores exatos e identificadores do equipamento devem permanecer PRIVADOS. Nao foi feita medicao de carga sob VM, viabilidade da virtualizacao de rede isolada nem teste de capacidade.

## 2. Opcao preferencial FUTURA (nao implementar neste ciclo)

**VM descartavel de segunda geracao Hyper-V com convidado Linux minimo**, sem adaptador de rede, sem compartilhamento de arquivos do host, sem clipboard ou modo de sessao aprimorada e sem credenciais do Google. Hospedar seus VHDX em unidade secundaria, nao na unidade do sistema de folga limitada. O Windows 11 Pro admite Hyper-V, porem habilita-lo no computador exigiria intervencao administrativa e possivel reinicio, um risco operacional NAO delegado a esta etapa. Validar suporte de Secure Boot e imagem do guest ANTES de iniciar.

**Entrada privada controlada (proposta):** montar um ISO de dados dedicado em unidade de DVD virtual, que fornece somente runtime Node Linux previamente verificado por SHA-256/manifesto autentico, um pequeno conjunto de testes revisados e seus modulos estritamente necessarios. O ISO e imutavel para o guest e fica somente no equipamento autorizado, NUNCA no hub publico. Este desenho exigira mecanismo confiavel de construir o ISO sem expor dados pessoais, tokens ou historia de repositorio. A VM nao possui rede, compartilhamentos de pasta ou clipboard.

**Execucao e provas (proposta):** conferir commits e hashes Git/SHA-256 ANTES da geracao do ISO e de novo no guest; executar APENAS testes offline revisados sob usuario de privilegio minimo, com timeout e ambiente de rede bloqueado. Ligar recibo privado a commit, bytes de teste e dependencias REALMENTE carregadas, comando/argumentos, versao do runtime, horario, exit code, hashes posteriores e modo de isolamento. Resultado FAIL/UNVERIFIED nao pode ser convertido em sucesso.

**Saida controlada (a validar):** um pequeno disco virtual de saida dedicado, desconectado apos desligar completamente o guest, e examinado no host inicialmente em modo somente leitura, com analise defensiva do formato e esquema estrito de evidencias. **VHDX de saida e um canal de transferencia deliberado e envolve riscos**; nao aciona-lo sem revisao de seguranca e protocolo de descarte. Capturas de janela, sozinhas, nao constituem atestado criptografico L2. Se nao houver canal de saida confiavel, L2 continua PENDENTE.

**Descarte:** restaurar/remover VM e discos temporarios somente apos verificacao de backup e preservacao de resultados PRIVADOS validos. Nao conectar ao Google Sheets, nao implantar Apps Script, nao acionar GitHub Actions privados nem copiar fonte ao hub publico.

Fontes tecnicas Microsoft Learn:
- https://learn.microsoft.com/pt-br/windows-server/virtualization/hyper-v/get-started/create-a-virtual-machine-in-hyper-v
- https://learn.microsoft.com/pt-br/windows-server/virtualization/hyper-v/plan/should-i-create-a-generation-1-or-2-virtual-machine-in-hyper-v
- https://learn.microsoft.com/pt-br/windows-server/virtualization/hyper-v/host-hardware-requirements
- https://learn.microsoft.com/en-us/windows/security/application-security/application-isolation/windows-sandbox/windows-sandbox-configure-using-wsb-file

## 3. Alternativas e parecer

| Alternativa | Vantagem | Impedimento presente | Parecer |
|---|---|---|---|
| Manter Windows Sandbox sem canais | Ja iniciado e com controles basicos observados | Sem entrada de runtime/arquivos e sem saida confiavel | Manter so para ensaios sinteticos |
| Sandbox com pasta de staging read-only | Mais simples tecnicamente | Altera a restricao explicita de SEM MappedFolders e expoe pasta host | NAO autorizar nem implementar |
| VM Hyper-V Linux descartavel + ISO | Entrada offline somente leitura, sem pasta do host, possivel recibo isolado | Hyper-V desabilitado; precisa planejamento, aprovacao, reboot potencial, validacao do guest e saida segura | MELHOR CANDIDATO FUTURO, nao pronto |
| Runner privado persistente ou VM em nuvem | Execucao automatizada | Custo, manutencao, fronteiras de risco e/ou dependencia financeira | NAO priorizar |
| Continuar hub publico sintetico | Ja comprovado, sem despesas novas | Nao verifica motores privados | CONTINUAR paralelamente |

## 4. Expansao de escopo e esforco — SOMENTE ESTIMATIVA

Proposta condicional **E-INFRA-L2 (NAO INCORPORADA)**:
- Revisao de impacto/backup, Hyper-V e permissao de reboot: **1 a 2 horas**;
- Aquisicao/verificacao de OS/Node e provisionamento Linux offline em VHDX isolado: **3 a 5 horas**;
- Pipeline seguro de ISO de entrada, saida descartavel e controles de seguranca: **3 a 5 horas**;
- Atestado privado L1/L2 minimo para um teste de cada sistema, conferencia de origem, execucao e auditoria: **3 a 4 horas**.

**Total condicionado: 10 a 16 horas**, nao incluindo aquisicao de hardware, licenca de SO comercial, incidentes ou custos externos imprevistos. Linux com distribuicao adequada pode evitar licencia adicional de Windows convidado; verificar termos e procedencia antes de escolher. Custo direto de software pode ser zero, **nao foi provado** e nao e compromisso financeiro.

Se esta expansao for realmente incorporada, exigira NOVO ROADMAP, baseline e percentuais calculados ANTES de iniciar implantacao. **Hoje E-TEST permanece 6,00 h, 5,00 h validadas = 83,33% concluido / 16,67% restante; Weine historica 92,11% inalterada.** Nao reduzir percentual silenciosamente; a analise arquitetural nao completa P4.1.

## 5. Decisao e proxima acao segura

**Decisao:** NAO implantar hipervisor/VM agora. Ha capacidade potencial de armazenamento fora da unidade do sistema, mas nao ha infraestrutura pronta, e as modificacoes seriam relevantes, sujeitas a preflight e autorizacoes administrativas. Manter politica atual do Sandbox e CI publica sintetica; P4.1 **EM EXECUCAO/BLOQUEADA para L1/L2**, Gates C-F pendentes.

**Proxima acao executavel:** definir um plano de preflight **sem codigo privado** para a VM proposta — requisitos minimos de imagem Linux confiavel, Node com manifesto autenticado, ISO exclusivamente sintetico, isolamento sem NIC e criterio de retorno da evidencia. Preparar checklist de reversibilidade e politica de backup; nao instalar/baixar/ativar/reiniciar nem recalcular baseline neste estagio. Qualquer decisao de incorporar a expansao exige checagem de impacto e autorizacao de alteracao relevante no computador.
