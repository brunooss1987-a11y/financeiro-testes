# P4.1 — Gate C: runtime Node isolado e transporte de evidencias

**Data da avaliacao:** 2026-10-14. **Estado:** ESTUDO SOMENTE LEITURA CONCLUIDO; IMPLANTACAO E VALIDACAO DO GATE C PENDENTES. Nenhum executavel baixado, instalado ou transferido para o Windows Sandbox. Nenhuma fonte privada usada.

## 1. Estado real verificado

- O teste sintetico anterior, registrado em `docs/P4-1-ensaio-interno-sandbox.md`, observou diretamente dentro do Windows Sandbox: `ipconfig` sem adaptadores, `net use` sem mapeamentos, apenas o volume local `C:` no `Get-PSDrive`; marcador inventado foi lido no clipboard do guest e nao apareceu no clipboard do host. O teste inverso host -> guest nao foi realizado. Gate B permanece **PARCIAL**, nao certificado.
- Um processo `node` **existe no computador principal**, identificado em consulta somente leitura como **v24.16.0**; seu SHA-256 de executavel foi calculado localmente, sem divulgar caminho, usuario ou hash operacional neste repositorio publico. Isso NAO comprova que Node exista numa Sandbox efemera.
- **Nao ha pacote de Node portatil verificado e disponibilizado ao guest**. Nem checksum local de um ZIP portatil conferido com origem assinada, nem execucao Node dentro do guest foram realizados.
- Verificada a **ausencia de sessao WindowsSandboxRemoteSession aberta** ao final do ensaio anterior e antes deste estudo.

## 2. Fonte confiavel para futura aquisicao — consulta, nao download

O canal oficial de Node.js fornece pacotes precompilados Windows x64 e manifestos SHA-256:
- Release LTS documentada na data: `v24.21.0`;
- Windows x64: `https://nodejs.org/download/release/v24.21.0/node-v24.21.0-win-x64.zip`;
- Checksums oficiais: `https://nodejs.org/download/release/v24.21.0/SHASUMS256.txt`;
- Assinatura do manifesto: `https://nodejs.org/download/release/v24.21.0/SHASUMS256.txt.sig`.

**Qualquer aprovisionamento futuro** deve fixar a versao, validar SHA-256 do pacote e, quando suportado, a autenticidade do manifesto assinado contra a chave publicamente verificada do fornecedor. Nao assumir que o checksum de `node.exe` no host e igual ao checksum do arquivo ZIP publicado. O sucesso de um `Get-FileHash` isolado NAO autentica o binario.

## 3. Obstaculo comprovado ao Gate C sob o perfil atual

O perfil `examples/windows-sandbox-no-access.wsb` foi deliberadamente aprovado SEM rede, SEM clipboard compartilhado, SEM `MappedFolders` e SEM comando de inicializacao. O guest e descartavel. Portanto, **nao existe neste momento mecanismo aprovado e verificado** para introduzir um ZIP Node de dezenas de megabytes nesse guest ou retirar um atestado estruturado sem mudar a politica de entrada e saida.

A Microsoft documenta rede, clipboard e mapeamento de pastas como canais de entrada; tambem permite marcar mapeamentos como somente leitura. A disponibilidade tecnica de `<ReadOnly>true</ReadOnly>` NAO equivale a aprovacao, pois adicionaria uma pasta do computador acessivel ao guest e contrariaria a restricao atual de nenhum mapeamento.

Fonte: `https://learn.microsoft.com/en-us/windows/security/application-security/application-isolation/windows-sandbox/windows-sandbox-configure-using-wsb-file`.

## 4. Cursos de acao, sem implantar expansao

**Rota preferencial enquanto a politica se mantiver:** conservar o Sandbox restritivo e o hub publico de exemplos sinteticos. Nao tentar copiar binarios por comandos enormes digitados via GUI, nao reabilitar rede/clipboard e nao enviar codigo privado para a CI publica. Manter atestados L1/L2 reais pendentes; prosseguir na especificacao de provas e de manutencao da rastreabilidade.

**Alternativa arquitetural 1 — VM descartavel privada preprovisionada:** criar ambiente offline distinto com runtime confiavel preinstalado ou fornecido por **midia virtual somente leitura** preparada antes do boot, sem compartilhar pastas do host, com modo de saida sujeito a mecanismo igualmente controlado. Exige avaliar hipervisor, imagem, assinaturas, evidencias, descarte e custo. **Nao foi criado nem testado.**

**Alternativa arquitetural 2 — estagio efemero estritamente somente leitura:** permitir **somente mediante revisao e aprovacao formal de politica**, uma pasta dedicada com materiais nao sensiveis e aprovados, sem credenciais, sob isolamento adicional e sem caminho de escrita de volta; isso altera a condicao atual SEM MappedFolders e **nao foi autorizado/executado**.

Ambas podem requerer esforco adicional de infraestrutura e homologacao. Elaborar estimativa e recalcular baseline APENAS se houver expansao formalmente decidida. Estimativa preliminar de 2-4 h de atestacao privada ja estava listada como contingencia, NAO incorporada as 6 h da E-TEST; nao contar horas parciais como etapa concluida.

## 5. Resultado e proxima acao

**Gate C: PENDENTE POR AUSENCIA DE CANAL DE APROVISIONAMENTO/ATESTACAO APROVADO.** O desenho de alternativa e viabilidade foi analisado, mas NENHUM atestado privado L1/L2 existe. Gate B permanece PARCIAL no escopo bidirecional e nao foi repetido. Gate D/E/F nao implementados. P4.1 EM EXECUCAO, sem conclusao.

**Proxima acao executavel:** inventariar somente em leitura quais recursos de VM descartavel com midia virtual offline ja existem no equipamento autorizado e se podem ser usados sem instalar nada, alterar a configuracao ou aumentar custos. Se nao houver infraestrutura pronta, registrar impedimento e manter desenho como expansao futura, sem executar fonte financeira e sem insistir no PR #4 bloqueado ou faturamento privado.

**Progresso imutavel:** E-TEST 5,00/6,00 h = 83,33% concluido | 16,67% restante; Weine historica 92,11% concluida | 7,89% restante.
