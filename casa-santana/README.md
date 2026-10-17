# Casa Santana — área pública própria

Esta área contém **somente exemplos e testes publicáveis da Casa Santana**. O motor financeiro operacional, recibos, lançamentos, planilhas, credenciais e Apps Script continuam privados.

- `src/index.mjs`: entrada pública do projeto, hoje reexportando as funções monetárias de `comum/src/index.mjs`
- `tests/`: cinco testes sintéticos (17 casos), executados pelo **Piloto casa-santana** na CI
- `npm run test:casa`: executa a área; `npm test` inclui também Weine e Comum

Funcionalidades específicas e publicáveis da Casa Santana devem permanecer nesta área, mesmo quando não façam sentido para a Weine.

**Legado mantido:** `../tests/casa-santana/` integra `npm run test:legacy` e o gate. Os contratos demonstrativos v1 e o somador histórico não foram movidos. Não atualizar seus caminhos ou hashes sem versionamento de contrato e novas provas.

Ver o [guia de manutenção](../docs/E-ARQ-GUIA-MANUTENCAO.md) e o [ROADMAP E-ARQ](../docs/ROADMAP-IMPLANTACAO-ARQUITETURA-V2.md).
