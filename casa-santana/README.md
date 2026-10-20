# Casa Santana — área pública própria

Esta área contém **somente exemplos e testes publicáveis da Casa Santana**. O motor financeiro operacional, recibos, lançamentos, planilhas, credenciais e Apps Script continuam privados.

- `src/index.mjs`: entrada pública do projeto, hoje reexportando as funções monetárias de `comum/src/index.mjs`
- `tests/`: cinco testes sintéticos (17 casos), executados pelo **Piloto casa-santana** na CI
- `npm run test:casa`: executa a área; `npm test` inclui também Weine e Comum

Funcionalidades específicas e publicáveis da Casa Santana devem permanecer nesta área, mesmo quando não façam sentido para a Weine.

**Legado mantido:** `../tests/casa-santana/` integra `npm run test:legacy` e o gate. Os contratos demonstrativos v1 e o somador histórico não foram movidos. Não atualizar seus caminhos ou hashes sem versionamento de contrato e novas provas.

Ver o [guia de manutenção](../docs/E-ARQ-GUIA-MANUTENCAO.md) e o [ROADMAP E-ARQ](../docs/ROADMAP-IMPLANTACAO-ARQUITETURA-V2.md).

## CS-PUB.1 — Conciliacao sintetica de remuneracao (em validacao)

`src/conciliacao-remuneracao-ficticia.mjs` e um exemplo original puramente funcional. Recebe obrigacoes, pagamentos confirmados e alocacoes ficticias identificadas em memoria; retorna devido, alocado, saldo, situacao e antecipacoes que precisam de revisao economica. So aceita centavos inteiros e vinculos explicitos; rejeita duplicidades, fontes ausentes e valores excedentes, sem alterar entradas, consultar a nuvem ou gravar na planilha.

Os **20 cenarios novos** ficam no arquivo existente `tests/limites-sinteticos.test.mjs`, mantendo os cinco filenames exigidos pelo gate historico. A contagem exata da ponte T3 passa de 37 para **57**, sem relaxar a validacao. Veja [o contrato CS-PUB.1](../docs/CS-PUB-1-conciliacao-sintetica.md).

**Limite:** a implementacao e os resultados da CI publica nao certificam o sistema privado Casa Santana, contratos ADV, folhas, dinheiro real ou Apps Script. A integracao com planilhas exige homologacao privada propria.
