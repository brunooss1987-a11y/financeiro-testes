# P4.1 — Matriz de decisão GO/NO-GO da VM privada offline

**Data:** 2026-10-14. **Tipo:** parecer DOCUMENTAL, não uma autorização de execução. **Decisão atual:** **NO-GO PARA IMPLANTAÇÃO**.

## Fontes e escopo
Baseada em `ROADMAP.md`, `HANDOFF.md`, `docs/P4-1-adr-vm-offline-proposta.md` e `docs/P4-1-checklist-preflight-reversibilidade-vm.md`, revistos na main após PR #15 e CI 38601176719 (3/3 success). A proposta E-INFRA-L2 (10–16h) não foi aprovada nem incorporada. A matriz não executa nenhum gate e não atesta segurança, isolamento ou L1/L2 privados.

## Responsabilidades por função
**Autorizador:** proprietário do computador e do projeto; aceita escopo, custos, manutenção/reinício e riscos. **Executor técnico:** operador futuro formalmente autorizado, responsável por alterações reversíveis. **Revisor de segurança:** verifica evidências, isolamento, cadeia de suprimento e fluxo de entrada/saída; independência a definir antes de GO. **Custodiante de backup/evidências:** verifica recuperação, retenção e descarte em armazenamento privado. Papéis não representam pessoas nomeadas ou autorizações já concedidas.

## Matriz de gates operacionais
| Gate | Situação atual | Bloqueio/veto | Responsável por função | Prova necessária para PASS | Reversão/contingência |
|---|---|---|---|---|---|
| G0 Escopo | NOT_TESTED / NÃO AUTORIZADO | Expansão e impacto ainda sem decisão | Autorizador | Aprovação explícita de E-INFRA-L2, janela, riscos, orçamento e baseline revisado ANTES de mudanças | Não iniciar; retirar proposta sem mudar host |
| G1 Backup do host | NOT_TESTED | Sem prova atual de backup restaurável e plano de rollback aprovado | Custodiante + autorizador | Cópia independente identificada privadamente, integridade, teste de restauração apropriado, plano de retorno | Abortar antes da ativação; se já alterado, restaurar somente pelo procedimento previamente testado |
| G2 Recursos | NOT_TESTED | Capacidade apenas potencial; margem sob carga e no volume do sistema não aprovada | Executor + autorizador | Medições privadas atualizadas, limites RAM/disco, reserva para ISO/VHDX/checkpoint e energia | Não criar VM; desprovisionar somente artefatos do laboratório após conferência |
| G3 ISO Linux | NOT_TESTED | ISO, versão, procedência, assinatura/manifesto e compatibilidade Gen2 não conferidos | Revisor de segurança | Proveniência oficial autenticada, hash verificado, Secure Boot Linux compatível | Rejeitar mídia; não contornar Secure Boot |
| G4 Node Linux | NOT_TESTED | Node confirmado apenas no HOST Windows, não no guest Linux | Revisor + executor | Runtime Linux de versão fixada, checksum e autenticidade do manifesto, dependências offline auditadas | Rejeitar pacote; não transferir binários não autenticados |
| G5 Fronteira da VM | NOT_TESTED | Hyper-V desabilitado; nenhuma VM isolada criada/testada | Executor + revisor | Configuração Gen2 sem NIC/switch, clipboard, enhanced session ou pastas; inspeção também dentro do guest | Desligar VM e remover configuração laboratorial somente com checklist autorizado |
| G6 Entrada sintética | NOT_TESTED | ISO read-only de teste não gerado/verificado | Executor + revisor | Inventário de arquivos fictícios, ausência de tokens/dados reais, prova DVD virtual somente leitura | Desmontar mídia e invalidar insumo de teste |
| G7 Saída auditável | NOT_TESTED | Canal VHDX dedicado introduz risco; leitura defensiva não aprovada | Revisor de segurança + custodiante | Esquema mínimo, limites de tamanho, desligamento confirmado e inspeção offline segura sem execução de artefatos do guest | Não importar saída; isolar volume e descartar somente após decisão de retenção |
| G8 Piloto fictício | NOT_TESTED | G0–G7 ainda não satisfeitos | Executor + revisor | Falha fechada em hash divergente/timeout/runtime ausente; execução fictícia documentada, exit code e logs sanitizados | Parar piloto, encerrar VM e preservar só prova aprovada |
| G9 Descarte/recuperação | NOT_TESTED | Procedimento completo não ensaiado | Custodiante + executor | VM encerrada, mídias desconectadas, artefatos efêmeros tratados e restauração comprovada quando aplicável | Reverter conforme backup independente; não eliminar evidências necessárias |

## Árvore de decisão
1. **NO-GO administrativo imediato** enquanto G0 não possuir decisão explícita. Nenhuma ativação Hyper-V, reboot, download, compra, instalação ou criação de VM.
2. **NO-GO técnico** se G1/G2 não estiverem demonstrados; se G3/G4 não tiverem fontes autenticadas; se houver NIC, clipboard ou compartilhamento no G5; ou se G6/G7 não tiverem cadeia de entrada e saída aprovada.
3. Mesmo após **GO documental futuro**, executar somente piloto inteiramente sintético (G8) e ensaiar descarte (G9). Uma falha implica **STOP, evidência privada e rollback controlado**; não prosseguir por conveniência.
4. **GO para atestados L1/L2** é decisão DISTINTA, posterior ao piloto; exige revisão de código privado, dependências e proveniência no ambiente autorizado. Não é autorizado por esta matriz.
5. Qualquer evidência ausente, inconclusiva, incompatível ou obsoleta permanece `NOT_TESTED` / `FAIL`; nunca promover a `PASS` por descrição do plano.

## Ordem futura de rollback, somente após autorização e plano validado
Paralisar execução; impedir novas entradas/saídas; confirmar desligamento do guest; reter evidências mínimas privadas autorizadas; isolar e desconectar mídia; remover somente recursos criados pelo laboratório com inventário anterior/posterior; se houver mudanças do host, seguir procedimento de recuperação verificado em G1 e conferir saúde dos serviços; registrar responsáveis e resultados. **Não executar rollback agora**, porque não houve implantação documentada. Checkpoint da VM não substitui backup independente.

## Resultado desta revisão
**NO-GO** por G0 sem autorização, G1–G9 não testados, Hyper-V não habilitado, Gate B do Windows Sandbox parcial, Gate C sem canal aprovado, L1/L2 privados ausentes. PR #4 permanece bloqueado; faturamento de Actions privado adiado. Nada no hub público deve conter código privado, hashes operacionais, credenciais ou informações de equipamento.

Progresso E-TEST: **5/6h = 83,33% concluído; 16,67% restante**. P4.1 **EM EXECUÇÃO**. Weine histórico: **92,11% concluído; 7,89% restante**, sem alteração. E-INFRA-L2 estimada **10–16h, NÃO INCORPORADA**.

## Próxima ação — sujeita à verificação
Conferir PR/CI e leitura da matriz na main; registrar recuperação no HANDOFF e no ROADMAP E-TEST e sincronizar apenas alterações comprovadas nos três Docs do Drive, com leitura posterior. Em seguida requerer decisão formal sobre a expansão antes de qualquer implantação. Não ativar Hyper-V, alterar Windows, baixar Node/Linux, copiar fontes privadas, mexer em planilhas, contornar PR #4 ou retomar billing.
