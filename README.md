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
