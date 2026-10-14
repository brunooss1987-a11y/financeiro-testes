# P4.1 — Continuidade independente do faturamento privado

**Estado:** implementacao PUBLICA, OFFLINE e SINTETICA, sem conclusao da P4.1.

## O que funciona sem GitHub Actions privado

- O repositorio publico `financeiro-testes` usa runners GitHub-hosted padrao e `GITHUB_TOKEN` apenas com `contents:read`.
- Cada projeto tem sua pasta `tests/weine/` ou `tests/casa-santana/`; o workflow testa **todos** os `*.test.mjs` de cada pasta, em jobs independentes.
- Existe uma funcao **ficticia** publica, `src/shared/centavos-demo.mjs`, para verificar somente a infraestrutura e propriedades genericas: inteiros seguros, soma de valores, negativos, rejeicao de nao numericos e nao mutacao.
- Na rotina publica, executar `npm run test:weine`, `npm run test:casa` e `npm run guard`. Nenhum comando requer OAuth, Google Sheets, Apps Script, secrets ou checkout dos repositorios privados.
- O nome dos jobs obrigatorios foi preservado: `Gate de publicacao`, `Piloto weine` e `Piloto casa-santana`, para nao enfraquecer branch protection.

## Matriz de cobertura honesta

| Componente | CI publica verifica? | Estado |
|---|---|---|
| Testes sinteticos de limites de centavos | Sim | Infraestrutura/contrato generico |
| Isolamento das suites Weine e Casa Santana | Sim | Infraestrutura |
| Guard de arquivos proibidos no hub | Sim | Protecao basica, NAO auditoria completa de segredos historicos |
| Motor financeiro real da Weine | Nao | Privado; nao homologado por este hub |
| Motor financeiro real da Casa Santana | Nao | Privado; nao homologado por este hub |
| Apps Script, OAuth, Google Sheets, formula e E2E | Nao | Dependem de homologacao separada e autorizada |

## Rastreabilidade e limites

Os testes sinteticos sao versionados pelo commit GitHub da `main` que passa na CI. Isso permite identificar **qual versao do proprio hub** passou, mas NAO comprova que o codigo dos sistemas privados implementa a mesma funcao. Os pares privados selecionados nas auditorias P2.1 e P3.1 continuam SOMENTE em seus repositorios de origem. Nenhum arquivo privado e publicado, copiado ou importado nos workflows.

O PR #4 do hub, com bloqueio de publicacao e proveniencia, permanece **separado e nao incorporado** enquanto houver recusa de seguranca da plataforma. Nao tentar contornar o bloqueio. A recuperacao do faturamento dos workflows privados pode ser adiada, mas a cobertura financeira real permanece dependente de testes que executem diretamente a implementacao verdadeira.

## Proxima acao

1. Validar este PR com 3 checks e confirmar que as duas suites executaram as verificacoes adicionais (nao apenas os testes piloto).
2. Se permitido, incorporar o PR e verificar `main` com checks completos e nenhum arquivo `components/` proveniente dos repositorios privados.
3. Manter P4.1 `EM EXECUCAO` ate implementar e comprovar um contrato verificavel de identidade da versao dos motores **sem** violar o bloqueio de seguranca ou alterar planilhas.
