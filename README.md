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
