# P4.1 — Checklist de preflight, isolamento e reversibilidade de VM privada offline

**Versao de planejamento:** 2026-10-14. **Estado:** CHECKLIST REDIGIDO PARA REVISAO; TODOS OS GATES OPERACIONAIS PENDENTES. **NAO E ORDEM DE INSTALACAO.**

**Escopo:** proposta *nao incorporada* E-INFRA-L2 para eventual VM Linux descartavel Hyper-V Generation 2 com entrada por ISO virtual somente leitura, testes exclusivamente sinteticos no piloto e evidencias offline isoladas. Atestados L1/L2 dos motores privados sao etapa posterior, nao executada nem implicitamente autorizada por este documento.

**Fontes do projeto:** `ROADMAP.md`, `HANDOFF.md`, `docs/P4-1-adr-vm-offline-proposta.md`, `docs/P4-1-gate-c-node-offline.md`, `docs/P4-1-protocolo-evidencia-privada.md`. Versao publica de testes demonstrativos NAO equivale a versao de motor privado.

## 1. Regra de aceite geral

- Nenhuma acao de configuracao, provisionamento ou execucao pode ser iniciada sem os **gates G0–G9** relevantes previamente revisados e autorizados.
- Cada gate exige **evidencia observavel**, responsavel pela verificacao e resultado `PASS`, `FAIL` ou `NOT_TESTED`. Desconhecido nao significa PASS.
- Evidencias operacionais detalhadas permanecem PRIVADAS no ambiente autorizado; no hub publico entram apenas pareceres sanitizados, sem credenciais, nomes de maquinas, caminhos locais, identificadores de repositorios privados, hashes operacionais ou codigo financeiro.
- Antes da futura execucao de quaisquer testes reais: auditar todo comando, imports, efeitos colaterais, areas de gravacao e probabilidade de contatos remotos. Nunca executar `clasp`, deploy, Apps Script remoto, autenticar Google nem acessar planilhas nesta frente.
- A aprovacao de CHECKLIST apenas conclui a **especificacao**. Nao conclui a P4.1, Gate C, L1/L2 nem um teste financeiro E2E.

## 2. Matriz preflight — situacao atual: TODOS pendentes de execucao

| Gate | Verificacao e criterio de aceite | Evidencia exigida ANTES do avanco | Estado atual |
|---|---|---|---|
| G0 — Escopo/autorizacoes | E-INFRA-L2 formalmente decidido com baseline, janela e autorizacao para alteracoes administrativas/reboot; sem compromissos financeiros nao autorizados | Decisao registrada, estimativa revista, controles de risco e rollback aprovados | **NOT_TESTED / NAO AUTORIZADO** |
| G1 — Backup/reversao HOST | Backup anterior a ativacao do Hyper-V, integridade, ponto de restauracao quando aplicavel, plano de rollback da alteracao e janela de manutencao; confirmar que planilhas/repos privados estao fora da operacao | Identificacao privada do backup + restaurabilidade comprovavel + plano de reversao escrito | **NOT_TESTED** |
| G2 — Recursos | Verificar RAM disponivel SOB CARGA, folga do volume de sistema, armazenamento seguro na unidade secundaria, energia, espaco para ISO/VHDX/export/checkpoint e limite de UMA VM | Medicao privada antes da futura instalacao, margem definida e limite de ocupacao aprovado | **NOT_TESTED** |
| G3 — Imagens autenticas | Origem oficial da distribuicao Linux, compatibilidade Gen2/UEFI/Secure Boot, integridade SHA-256 do ISO e, quando fornecida, verificacao de assinatura autenticada; avaliar licencas | Manifestos oficiais verificados, resumo da procedencia e identificacao da versao | **NOT_TESTED** |
| G4 — Runtime Node autentico | Fixar release apropriada **Linux** x64 (nao reutilizar binario Windows do host), tarball oficial e SHA-256/assinatura do fornecedor; dependencias offline revisadas | Hash do artefato Linux + autenticidade verificavel + versao Node testada EM LAB sintetico | **NOT_TESTED** |
| G5 — Fronteira virtual | VM **Gen2** descartavel, **sem adaptador de rede**, sem switch, sem integracao de area de transferencia, drive/pasta do host ou enhanced session; revisar canais Hyper-V e Secure Boot para Linux | Configuracao privada e observacao de controles DENTRO do guest; esquema sem NIC e sem mapeamentos | **NOT_TESTED** |
| G6 — Entrada ISO | ISO gerado de materiais estritamente **sinteticos** no piloto; unidade de DVD virtual somente leitura; sem token, configuracao Google, `.env`, perfil de usuario ou codigo privado no piloto | Manifesto ISO; conteudo revisado; guest nao consegue modificar a midia original | **NOT_TESTED** |
| G7 — Saida e risco de retorno | Plano de artefato minimo, esquema estrito e limites de tamanho; saida em disco virtual DEDICADO apenas se houver mecanismo comprovado de desligamento/retirada e leitura defensiva; nao confiar em bytes arbitrarios do guest | Comprovacao de desligamento, isolamento do disco, verificacao offline de conteudo em ambiente seguro e ausencia de caminho de escrita no host | **NOT_TESTED** |
| G8 — Piloto somente sintetico | Um caso ficticio curto, sem rede, sem dados reais, sem secrets; verificar hash de runtime/entrada, exit code, timeout, saida e rastreabilidade antes/depois | Registro privado do piloto, controles negativos para hash alterado, falha/timeout e divergencia | **NOT_TESTED** |
| G9 — Descarte e recuperacao | Desligar VM, desconectar ISO/discos, validar que nao ha processos/conexoes, reter apenas recibo aprovado, destruir imagens efemeras sob criterio de backup; testar reversibilidade de forma segura | Checklist de descarte e confirmacao da ausencia de VM/artefatos de risco; registro privado do resultado | **NOT_TESTED** |

### Criterio de veto imediato

**FAIL CLOSED** se ocorrer um dos itens: falta de consentimento para mudanca de Windows/reinicio; backup nao verificavel; checksum sem fonte confiavel; algum canal de rede/clipboard/pasta ativo; necessidade de armazenar segredo em ISO; impossibilidade de verificar a saida sem montar como gravavel um disco sob controle do guest; impossibilidade de descartar VM; alteracao de arquivo fora da area de laboratorio; tentativa de usar testes reais antes da validacao sintética.

## 3. Fluxo de ensaio proposto (NENHUM PASSO EXECUTADO)

1. **Especificar antes de tocar no host:** documentar o resultado de G0, risco/backup G1, limites de memoria e disco G2, e limites de custo. Nao tomar decisao implicita de ativar Hyper-V.
2. **Provar procedencia de insumos em planejamento:** imagem Linux compativel Gen2 e Secure Boot com certificado UEFI aplicavel; artefato Linux x64 do Node, assinatura/manifesto conforme fornecedor. Nao baixar aqui.
3. **Ensaiar ISO sintetico em infraestrutura FUTURA:** exclusivamente um arquivo de teste inventado, sem dados privados, sob politica de DVD virtual somente leitura. Nao pressupor que montar ISO no host forneca VM funcional.
4. **Checar ausencia de NIC e de integracoes:** no hipervisor e no guest, antes e depois do boot; validar ausencia de dispositivos/canais nao previstos. Nao associar switch automatico.
5. **Verificar prova e efeitos negativos:** hash correto PASS, bytes adulterados FAIL, runtime ausente FAIL, timeout FAIL; comparar hashes antes/depois. Logs sanitizados, armazenados apenas em ambiente privado.
6. **Rever saida:** um volume virtual de exportacao e um potencial canal de risco, nao um canal intrinsecamente seguro. Revisar parser, formato e isolamento antes de interpretar dados produzidos por guest. Nenhum arquivo do guest pode obter execucao automatica no host.
7. **Desligar e descartar:** apos captura segura da prova, fechar sessao/VM; confirmar ausencia de NIC/conexoes, limpar dados temporarios e reter apenas comprovantes autorizados.
8. **Somente quando G0–G9 estiverem APROVADOS:** considerar UM teste privado offline ja revisado de cada repositorio, com hash de commit, do modulo e do arquivo de teste, mapeamento de fontes carregadas, `argv`, runtime e exit code. As evidencias L1/L2 ficam privadas; L3/L4 continuam independentes.

## 4. Backup, rollback e riscos especificos

- **Host Windows:** antes de habilitar Hyper-V, verificar janela de manutencao, backup restauravel, possiveis conflitos com outros componentes e recuperacao de chaves do dispositivo armazenadas por meio autorizado. Evitar alterar a unidade do sistema ja com folga limitada.
- **VM/dados:** preferir imagens descartaveis, armazenamento isolado e sem dados pessoais. Checkpoint de Hyper-V e ferramenta de reversao de estado, NAO substitui backup independente. Se um checkpoint falhar, nao presumir restauracao sem prova.
- **Seguranca de cadeia de suprimento:** valor SHA-256 sem autenticidade do manifesto nao comprova fornecedor; confirmar assinatura e fonte oficial da distribuicao/Node.
- **Secure Boot Linux:** validar a configuracao Gen2 especifica para distribuicao escolhida; a documentacao Microsoft descreve modelo `Microsoft UEFI Certificate Authority` para Linux compatível. Nao desabilitar Secure Boot apenas para fazer um piloto passar.
- **Saida:** montar/importar resultados de VHDX potencialmente gravado pelo guest no host e acao de risco; exigir revisao de ameacas, formato estrito, limites e analise em ambiente seguro. Capturas de janela nao substituem atestacao L2.
- **Credenciais e producao:** proibidos em ISOs, discos efemeros, logs e templates; nada de IDs, arquivos do Apps Script, bilhetagem/cartoes, Google ou `clasp`.
- **Fim de teste:** nao apagar backup ou dados historicos para economizar armazenamento; descarte deve respeitar retencao de evidencias privadas e escopo.

## 5. Criterios de decisao final e esforco

**GO para implantacao apenas se:** G0 formalizado, G1/G2 viaveis, G3–G7 projetados com controles auditaveis, plano de teste sintetico G8 e de descarte G9 aceitos; decisao previa de alteracao/reinicio do host e baseline E-INFRA-L2 separados registrados. O simples sucesso do checklist documental **nao libera** instalacao.

**NO-GO enquanto:** Hyper-V desabilitado, ausencia de imagem/Node verificados, sem caminho confiavel de saida e sem revisao de risco. Esta e a situacao REAL ao fim desta redacao.

**Expansao condicional:** E-INFRA-L2 previamente estimada em **10 a 16 horas**, NAO incorporada, sujeita a revisao antes de comeco. **Nenhum percentual recalculado:** E-TEST = 5,00/6,00 h = **83,33% concluido / 16,67% restante**. Weine historica = **92,11% concluido / 7,89% restante**. P4.1 permanece **EM EXECUCAO**, sem teste privado L1/L2.

## 6. Proxima acao concreta — SEM INSTALACAO

Confrontar este checklist com `docs/P4-1-adr-vm-offline-proposta.md` e com a realidade administrativa do Windows. Elaborar uma **matriz de decisao GO/NO-GO exclusivamente documental** de aderencia a G0–G9 e um plano de rollback para o caso de a expansao ser futuramente autorizada. Nao acionar instalacao, reinicio, download, VM, fontes privadas, PR #4 bloqueado ou faturamento GitHub privado.

## 7. Referencias tecnicas consultadas

- Microsoft Learn, VM Hyper-V Gen1/Gen2, DVD virtual por ISO e VHDX: https://learn.microsoft.com/en-us/windows-server/virtualization/hyper-v/plan/should-i-create-a-generation-1-or-2-virtual-machine-in-hyper-v
- Microsoft Learn, recursos de seguranca Gen2 e Secure Boot Linux: https://learn.microsoft.com/en-us/windows-server/virtualization/hyper-v/learn-more/Generation-2-virtual-machine-security-settings-for-Hyper-V
- Microsoft Learn, checkpoints e ressalvas de backup: https://learn.microsoft.com/en-us/windows-server/virtualization/hyper-v/checkpoints
- Microsoft Learn, criacao de VM e recursos minimos: https://learn.microsoft.com/en-us/windows-server/virtualization/hyper-v/get-started/Create-a-virtual-machine-in-Hyper-V
- Microsoft Learn, export/import: https://learn.microsoft.com/en-us/windows-server/virtualization/hyper-v/deploy/export-and-import-virtual-machines
- Fonte Node release e checksum: https://nodejs.org/download/release/v24.21.0/
