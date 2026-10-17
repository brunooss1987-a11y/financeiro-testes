# E-COM.1 — Conversao monetaria pt-BR no hub compartilhado

**Status inicial:** em implementacao na branch `feature/e-com1-money-ptbr-shared-20261017`, aguardando revisao/PR/CI. Data: 2026-10-17.

## Lacuna e decisao

No hub publico `financeiro-testes`, o unico utilitario de moeda era `somarCentavosDemo`, uma soma de inteiros ficticios. Nao havia conversor entre valor BRL exibido como texto e centavos inteiros com rejeicao explicita de formatos ambiguos. Weine e Casa Santana poderiam reutilizar um contrato comum assim, mas **nenhuma integracao aos respectivos motores privados foi realizada ou homologada**.

Implementar um modulo **puro**, sem dependencias, `src/shared/moeda-ptbr.mjs`, e testa-lo com fixtures ficticias nas suites isoladas de ambos os projetos. O modulo e uma biblioteca publicavel, nao uma importacao de codigo financeiro privado.

## API e contrato

- `lerCentavosPtBr(texto: string): number`: aceita `R$ 1.234,56`, `1.234,56`, `1234,56`, `0,00` e `-R$ 10,25`. `R$ ` e opcional, com **exatamente um espaco** se presente. Decimal com **virgula e exatamente dois digitos**; se houver agrupamento de milhar, deve ser com pontos validos a cada tres digitos. Sem simbolos de moeda estrangeira, casas faltantes, zeros de preenchimento indevidos, texto extra ou espacos/quebras finais.
- `formatarCentavosPtBr(centavos: number): string`: recebe **somente Number inteiro seguro em centavos**, gera `R$ 1.234,56`, valores negativos no formato `-R$ 1.234,56`; o zero negativo e normalizado como `R$ 0,00`.
- **Sem arredondamento**: o parser multiplica em `BigInt` e so converte a `Number` depois de verificar `Number.MAX_SAFE_INTEGER`. A formatacao tambem rejeita centavos nao inteiros/inseguros. O limite monetario seguro em valor absoluto e `90.071.992.547.409,91` reais.
- **Erros explicitos**: tipo incorreto/gramatica invalida = `TypeError`; valor fora do intervalo seguro ou texto demasiado longo (>64 caracteres) = `RangeError`.
- Nenhuma rede, arquivo, armazenamento, locale do sistema ou modulo nativo exigido. Sem estado mutavel e sem alteracao dos argumentos.

## Exemplos sinteticos

```js
import { lerCentavosPtBr, formatarCentavosPtBr } from './src/shared/moeda-ptbr.mjs';

lerCentavosPtBr('R$ 1.234,56');   // 123456
lerCentavosPtBr('-R$ 10,25');    // -1025
formatarCentavosPtBr(123456);    // 'R$ 1.234,56'
```

**Nao confundir:** parse de texto nao e OCR de recibos; formatacao nao implementa descontos, rateios, parcelas, competencia, status de pagamento, validacao de recebedor, idempotencia, formulas ou rastreabilidade. O contrato nao prova comportamento dos Apps Scripts e Sheets existentes. Para qualquer adocao futura em motores privados, exigir revisao de integracao, compatibilidade de API e teste protegido separado.

## Testes de aceite

- `tests/weine/moeda-ptbr.test.mjs`: formatos com/sem prefixo e agrupamento, positivos e negativos, zero negativo, MAX/MIN SAFE, entradas ambiguas, limites, strings excessivas, nao numeros e ausencia de arredondamento.
- `tests/casa-santana/moeda-ptbr.test.mjs`: fixtures de compras ficticias, round-trip, negativos, formatos estrangeiros invalidos, e coexistencia do somador demonstrativo original.
- Os dois contratos de teste continuam **somente demonstrativos**, dentro dos jobs publicos existentes. Nenhuma mudanca em `contracts/public-demo.json` ou no arquivo sob hash `src/shared/centavos-demo.mjs`; o gate de publicacao e os 3 checks permanecem obrigatorios.

## Escopo/pesos antes da implementacao

O roadmap registrou a expansao **E-COM.1 (1,50h)** antes de adicionar o modulo e seus testes. Baseline E-TEST passou de **8,00h** para **9,50h**. Antes da validacao: **7,00/9,50h = 73,68% concluido | 26,32% restante**. Apos E-COM.1 validada: **8,50/9,50h = 89,47% concluido | 10,53% restante**; a P4.1 com peso 1h fica pendente. Baselines originais Weine 15h e 19h/92,11% inalterados. E-INFRA-L2 permanece adiada/não incorporada.

## PROXIMA ACAO A EXECUTAR - SUJEITA A VERIFICACAO

Examinar o diff e os logs do PR antes de alegar validacao; confirmar os 3 checks e os testes separados, integridade do somador demonstrativo e gate de publicacao. Somente apos CI do PR e da main aprovadas e readback registrar E-COM.1 VALIDADA no ROADMAP/HANDOFF. Sem copiar logica privada, acesso Google, OAuth, pagamento real ou alteracao de planilhas.
