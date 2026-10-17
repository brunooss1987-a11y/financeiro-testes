# Weine — área pública própria

Esta área contém **exclusivamente exemplos e contratos publicáveis específicos da Weine**, não o motor financeiro da planilha.

- `src/index.mjs`: ponto de entrada público da Weine; atualmente reexporta as funções monetárias genéricas de `comum/src/index.mjs`
- `tests/`: cinco testes sintéticos separados (18 casos), usados pelo **Piloto weine** na CI
- `npm run test:weine`: executa a suíte atual diretamente daqui; `npm test` também inclui as três áreas

Funcionalidades que sejam exclusivas da Weine e adequadas a um repositório público pertencem aqui. Não precisam ser transferidas para a Casa Santana nem publicadas na área Comum.

**Legado preservado:** `../tests/weine/` continua sendo executado no gate por `npm run test:legacy`. A prova v1 exige `../tests/weine/piloto.test.mjs` e a fonte hashada `../src/shared/centavos-demo.mjs`; não mover ou editar esses arquivos silenciosamente.

Nenhuma fórmula, planilha, registro, Apps Script, credencial ou implementação financeira privada foi copiada. Ver [guia de manutenção](../docs/E-ARQ-GUIA-MANUTENCAO.md) e [ROADMAP E-ARQ](../docs/ROADMAP-IMPLANTACAO-ARQUITETURA-V2.md).
