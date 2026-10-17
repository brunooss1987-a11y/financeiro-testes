# Financeiro-Testes

Hub **publico** de testes offline para Weine e Casa Santana. Ambos os sistemas operacionais permanecem em repositorios **privados**.

Este repositorio nao acessa planilhas, nao faz deploy, nao solicita OAuth e nao utiliza credenciais financeiras.

## Suites publicas

- Weine: `npm run test:weine`
- Casa Santana: `npm run test:casa`
- Ambas: `npm test`
- Verificacao de arquivos proibidos: `npm run guard`

O workflow `.github/workflows/ci.yml` executa suites separadas e exige sucesso no gate de seguranca. O exemplo `src/shared/centavos-demo.mjs` e **codigo ficticio**, nao uma copia do motor de nenhum projeto. Sucesso desses testes demonstra funcionamento do ambiente publico, **nao** homologacao de saldos ou pagamentos reais.

Consulte [limites da cobertura e continuidade offline](docs/P4-1-continuidade-offline.md), [ROADMAP](ROADMAP.md) e [HANDOFF](HANDOFF.md).

Nenhum codigo privado e sincronizado automaticamente. Qualquer nova publicacao de codigo precisa passar por revisao de seguranca e autorizacao valida; a transferencia anteriormente bloqueada nao deve ser repetida ou contornada.


## E-COM.1 — Conversao BRL pt-BR compartilhada (somente codigo publico)

A biblioteca `src/shared/moeda-ptbr.mjs` expoe `lerCentavosPtBr` e `formatarCentavosPtBr`: parse de texto como `R$ 1.234,56` para `123456` centavos inteiros e formatacao canonica inversa. Aceita somente duas casas decimais, rejeita strings ambiguas/centavos inseguros e nao arredonda. Consulte o [contrato E-COM.1](docs/E-COM-1-conversao-moeda-ptbr.md).

Os testes publicos sao separados em `tests/weine/moeda-ptbr.test.mjs` e `tests/casa-santana/moeda-ptbr.test.mjs`, com dados inteiramente ficticios. **Nao substitui nem testa os motores financeiros privados**, regras de rateio, cobranca, conciliacao, Sheets ou Apps Script. A adocao real exige revisao privada independente.


## Arquitetura planejada: Weine / Casa Santana / Comum

A organização-alvo terá áreas `weine/` e `casa-santana/` para funcionalidades e testes próprios, e `comum/` para componentes realmente reutilizáveis. **O repositório segue público e não contém os motores financeiros operacionais.** A árvore atual de `tests/` e `src/shared/` será migrada somente depois de inventário, backup e revisão de compatibilidade de contratos fixados.

Consulte o **[roadmap de implantação E-ARQ (T0–T6)](docs/ROADMAP-IMPLANTACAO-ARQUITETURA-V2.md)** e a [decisão de arquitetura ADR-0002](docs/ADR-0002-tres-areas-monorepo.md). O [ROADMAP E-TEST](ROADMAP.md) continua sendo o registro mestre de baselines e evidências.


## E-ARQ T4 — comandos da arquitetura em tres areas

Depois da migracao do runner, os pilotos `weine` e `casa-santana` executam diretamente `weine/tests/` e `casa-santana/tests/`; `npm test` inclui tambem `comum/tests/`. Os comandos `npm run test:weine`, `npm run test:casa` e `npm run test:comum` executam as areas respectivas.

Os testes v1 permanecem disponiveis via `npm run test:legacy` e sao executados no gate da CI para preservar regressao. A CI mantem seus tres checks anteriores, sem ampliar permissoes. O comprovante `public-demo-run/v1` segue pinado a `tests/weine/piloto.test.mjs` e `src/shared/centavos-demo.mjs`; estes arquivos nao foram movidos.
