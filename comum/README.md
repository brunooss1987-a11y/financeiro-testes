# Comum — utilitários públicos compartilhados

Esta área **complementa** as áreas próprias `weine/` e `casa-santana/`, sem exigir que cada nova função seja compartilhada.

- `src/index.mjs`: API pública comum, atualmente reexportando `lerCentavosPtBr` e `formatarCentavosPtBr` da implementação única em `../src/shared/moeda-ptbr.mjs` (caminho relativo ao repositório)
- `tests/moeda-ptbr.test.mjs`: dois testes do contrato reutilizável, executados com `npm run test:comum`
- Os testes das duas áreas de projeto usam a entrada comum através de seu respectivo `src/index.mjs`.

A implementação original foi **mantida** em `src/shared/moeda-ptbr.mjs`; não há uma segunda implementação concorrente. Mover a fonte futuramente requer escopo, atualização consciente de imports e CI.

Separadamente, `src/shared/centavos-demo.mjs` permanece **pinado** pelo manifesto `local-integrity/v1` em `contracts/public-demo.json`. Essa demonstração é fictícia e não representa um motor financeiro privado.

Ver [guia de manutenção](../docs/E-ARQ-GUIA-MANUTENCAO.md) e [contrato público E-COM.1](../docs/E-COM-1-conversao-moeda-ptbr.md).
