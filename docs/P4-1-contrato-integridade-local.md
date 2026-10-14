# P4.1 — Contrato offline de integridade por hash (somente exemplo publico)

Estado: IMPLEMENTADO EM BRANCH, sujeito aos checks e a validacao apos merge.

## O que este contrato comprova

O modulo `tools/check-local-contract.mjs` recebe um manifesto local com o esquema `local-integrity/v1`, exige `scope=public-demo`, valida os caminhos estritamente sob `src/shared/`, proibe travessia de diretorio e links simbolicos, confere tamanho e calcula SHA-256 dos bytes lidos **no proprio checkout local**.

`contracts/public-demo.json` fixa o SHA-256 **somente** do arquivo demonstrativo publico `src/shared/centavos-demo.mjs`. A checagem devolve `LOCAL_BYTES_MATCH` quando os bytes correspondem ao hash fixado; rejeita hashes divergentes, arquivos ausentes, entradas duplicadas, campos inesperados e caminhos fora da area publica. Nenhuma rede e acessada.

O manifest não inclui codigo, nomes, hashes ou configuracoes de arquivos privados. A rotina nao tenta checkout, rede, Secrets, OAuth, Google Apps Script ou Google Sheets.

## O que NAO comprova

A igualdade de hash prova apenas que **aquele arquivo local** coincide com **aquele hash declarado**. O resultado **nao** prova que um teste executou a mesma fonte, que uma origem privada permanece atualizada, que houve autorizacao de publicacao ou que os sistemas financeiros passaram por testes integrados.

Por isso o resultado contem tres campos explicitamente falsos: `provesTestExecution`, `provesPrivateSourceIdentity` e `provesFinancialE2E`.

A suite publica continua testando codigo demonstrativo inventado, nao funcoes da Weine ou da Casa Santana. Nao copiar fontes privadas para esta area, mesmo que tenham sido anteriormente classificadas como candidatas.

## Uso sem cobranca do Actions privado

- `node --test tests/weine/*.test.mjs`
- `node --test tests/casa-santana/*.test.mjs`
- A CI publica executa as suites separadas e o gate de seguranca, sem qualquer autenticao privada.

## Protocolo futuro para fonte privada (PROPOSTO, NAO IMPLEMENTADO)

1. Executar o validador em ambiente local **privado, confiavel e autorizado**, sobre um checkout privado cujo commit tenha sido fixado e auditado. O verificador publico atual e intencionalmente limitado ao exemplo; uma extensao privada precisa de revisao propria antes do uso.
2. Relacionar cada teste ao arquivo real que ele carrega, fixar os hashes do arquivo e do teste e conferir os mesmos bytes antes e depois da execucao, sem persistir em local publico dados do projeto privado.
3. Produzir evidencias minimas de execucao que vinculem commit, comandos, ambiente confiavel e resultados; hash isolado nao prova execucao. Sem confianca na origem dessa evidencia, assinatura ou verificacao independente, nao a declarar homologada.
4. Validar aprovacao de codigo e permissoes, backups, reversibilidade e contexto de laboratorio antes de qualquer teste que se conecte ao Google.
5. Nao importar manifestos de procedencia privada para a CI publica nem tentar novamente a publicacao/merge anteriormente bloqueados.

## Criterio de aceite desta implementacao parcial

O PR deve mostrar: nenhuma alteracao na logica financeira privada, apenas arquivos publicos demonstrativos; checks obrigatorios `Gate de publicacao`, `Piloto weine` e `Piloto casa-santana` SUCCESS; ambas as suites devem exercer caminhos positivos e negativos do verificador. Uma execucao na main depois do merge deve ser conferida.

**A P4.1 permanece EM EXECUCAO** ate existir prova autorizada, verificavel e atual da identidade do codigo financeiro real e de sua validacao. E-TEST permanece **83,33% concluido / 16,67% restante**. Progresso historico da Weine permanece **92,11%**.
