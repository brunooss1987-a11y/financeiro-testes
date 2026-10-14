# P2.1 — Inventario de testes offline da Weine (2026-10-14)

**Estado:** auditoria de classificacao EXECUTADA e VALIDADA por leitura de fonte real, verificacao dos Git blob SHA e execucao local de teste offline. **Nenhum codigo da Weine foi publicado no hub.**

## Fonte e escopo examinado
- Weine (repositorio privado), branch principal: arvore com 59 arquivos. Revisados fluxos de validacao e testes WAC.
- PR privado #105 (E1.4, DRAFT, nao mesclado), head no momento da auditoria: `703f3d8ea6824eef413742634084d590207483e5`, arvore com 79 arquivos. Revisados guards, tests offline, snapshot e rotinas remotas.
- PR privado #107 (E-DIV.2, DRAFT, nao mesclado), head no momento da auditoria: `0bb39a39dca9c460f08505960cc9e54f66db805f`, arvore com 89 arquivos. Revisados harnesses de simulacao, protecao de arquivos, replay, rollback e testes de ligacao.
- Inventario e triagem sao limitados aos arquivos e versoes mencionados: nao substituem varredura integral de todos os commits historicos nem auditoria de vulnerabilidades.

## Candidato selecionado — PUBLICAVEL SOMENTE APOS GATE P4.1
| Origem privada | Git blob SHA exato | Condicao |
|---|---|---|
| `lab-e14/overwrite-guard.mjs` | `148666fc3ee4dd5de1fa38843a24226a98c89986` | Funcao pura com import exclusivo `node:crypto`; sem rede, Google API, credenciais, ID de planilha ou escrita |
| `lab-e14/overwrite-guard-test.mjs` | `6bff970930553d85c1d7faa7c478cc80a37c460b` | `node:assert/strict` e `node:crypto`, fixtures inteiramente artificiais, importa o modulo acima |

**Prova executada:** arquivos baixados pela conta GitHub autorizada para diretorio temporario no computador do proprietario; SHA do objeto Git recalculado para cada arquivo e comparado com o GitHub; `node overwrite-guard-test.mjs` concluiu com exit code 0 e mensagem de **7 verificacoes aprovadas**; diretorio temporario foi removido em bloco `finally`. Nenhum token foi exibido, nenhum job GitHub privado foi disparado, nenhuma implantacao executada.

**Limite do aceite:** a dupla valida o **bloqueio offline de sobrescrita do LAB**; NAO testa pagamentos, formulas, parcelas, dados reais, autorizacao remota ou Apps Script em producao. Os identificadores e segredos presentes em arquivos correlatos permanecem fora do pacote publicavel. Publicar a dupla sem alteracao exigira correspondencia de Git blob SHA verificada (ou correspondencia de conteudo, se a conversao de formato mudar), mais PR com revisao do diff completo, guard publico e rastreio de versao. A classificacao "publicavel" NAO e autorizacao para publicar automaticamente nesta subetapa.

## Classificacao dos demais conjuntos
| Grupo | Estado | Motivo |
|---|---|---|
| `lab-e14/remote-guard.mjs` + `remote-guard-test.mjs` | REAVALIAR | Offline, porem contem contratos de manifesto e limites especificos de deploy; precisa auditoria de superficie e de acoplamento mais rigorosa |
| `lab-e14/snapshot-policy*.mjs`, `snapshot-attestation*.mjs`, `read-remote*.mjs` | PRIVADO | Conexao com identificadores do LAB, diretorios de snapshots privados, leitura API e/ou autorizacao; nao replicar |
| `lab-e14/runtime-test.mjs`, `lab-e14/test.mjs` | PRIVADO | Fixtures e validacoes associadas ao LAB e seus identificadores; nao representam pacote publico ja revisado |
| `WAC_WAC52Test.js`, `WAC_WAC53Test.js`, `WAC_WAC62Test.js`, `WAC_WAC63Test.js`, `WAC_WAC74Test.js` | PRIVADO | Testes de contrato que executam funcoes do Apps Script e seus colaboradores do projeto real; alguns sao acionados com autenticacao `clasp` |
| `scripts/validate-repo.mjs`, `scripts/deploy-apps-script.mjs`, workflows de producao | PRIVADO | Contem vinculos a ambiente operacional, IDs e/ou configuracao de deploy |
| `lab-ediv2/*-test.mjs` e harnesses relacionados | PRIVADO NESTA ETAPA | Diversos testes leem codigo financeiro real, simulam SpreadsheetApp ou dependem de fixtures, IDs e artefatos privados. Apenas futuras funcoes puras previamente extraidas poderiam ser reavaliadas |

## Gates antes de eventual publicacao no hub
1. Revisar diff completo e fixtures, proibindo segredos, tokens, IDs reais, dados pessoais e historico privado.
2. Nao copiar repo inteiro, snapshot, arquivos `.clasp`, `.env`, outputs financeiros ou eventos E2E.
3. Fixar SHA da origem privada; preservar identidade da funcao testada, jamais duplicar algoritmo ficticio e tratar verde como homologacao financeira.
4. Usar PR no hub com security guard e os dois jobs separados; nao usar permissao GitHub de escrita, OAuth, acesso aos repos privados nem deploy.
5. Conferir post-merge e repetir verificacao de correspondencia ao mudar fonte privada. Esse gate e parte de **P4.1**, nao foi realizado na P2.1.

## Proximo passo
**P3.1 — Inventariar e selecionar testes offline da Casa Santana**, com revisao independente dos 608 arquivos da arvore principal, com prioridade em testes `node` isolados e sem dados reais. Nao reexecutar o piloto P0 nem a protecao P1; P2.1 foi apenas selecao e verificacao privada do candidato.
