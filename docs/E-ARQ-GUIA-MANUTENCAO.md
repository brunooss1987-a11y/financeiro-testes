# E-ARQ — Guia de manutenção do hub público

**Referência:** arquitetura Weine / Casa Santana / Comum, T0–T5 validadas; T6 em validação. Este guia descreve o repositório **público** `financeiro-testes`, não os motores privados.

## Onde colocar um componente

| Necessidade | Local de autoria | Verificação |
| --- | --- | --- |
| Comportamento específico e publicável da Weine | `weine/src/`, testes em `weine/tests/` | `npm run test:weine` |
| Comportamento específico e publicável da Casa Santana | `casa-santana/src/`, testes em `casa-santana/tests/` | `npm run test:casa` |
| Função genérica realmente reutilizada pelos dois | `comum/src/`, testes em `comum/tests/` | `npm run test:comum` |
| Proteção, gate, runner e CI compartilhados | `tools/`, `tests/security/`, `.github/` | Gate de publicação e CI 3/3 |
| Manifestos e provas públicas históricas | `contracts/`, `src/shared/`, `tests/weine/` e outros legados | `npm run test:legacy` e testes de integridade |

**Não duplicar** código para simular compartilhamento: primeiro definir contrato, quais projetos o usam e testes sintéticos. Código exclusivo não deve ser forçado à pasta Comum.

## Rotina de contribuição segura

1. Confirmar HEAD da `main`, último ROADMAP/HANDOFF e resultado da CI. Antes de alteração estrutural, confirmar branch `backup/e-arq-t2-pre-migracao-20261017` no SHA esperado do plano de backup.
2. Delimitar mudança e peso de esforço. Funcionalidade **fora do roadmap** exige expansão explícita de escopo e recalcular baseline **antes** do código.
3. Criar branch de trabalho. Modificar só arquivos do escopo; **não** copiar motor privado, arquivo Google Sheet, Apps Script, OAuth, dados, IDs/URLs operacionais ou recibos reais.
4. Executar `npm test`, `npm run test:legacy`, `npm run guard` e os testes específicos relevantes. `npm test` cobre 37 casos públicos, `test:legacy` mantém 35; o gate de CI contém mais 26 testes de segurança e os 3 checks públicos.
5. Abrir PR com diff, objetivo e riscos; não desabilitar testes para conseguir PASS. Validar Gate de publicação, Piloto weine e Piloto casa-santana no PR e na `main` após merge.
6. Ler novamente os arquivos alterados na `main`, conferir hashes/refs protegidos e registrar evidências somente para trabalho de fato **VALIDADO** em ROADMAP/HANDOFF. Distinguir PLANEJADO, EXECUTADO e VALIDADO.
7. Se o guia, README, contratos ou organização mudarem, revisar coerência das três áreas e links. Só atualizar o Drive após mudança efetiva, confirmar ação e leitura de retorno.

## Compatibilidade e recuperação

O contrato `local-integrity/v1` exige o caminho e SHA-256 originais de `src/shared/centavos-demo.mjs`; o comprovante `public-demo-run/v1` também fixa `tests/weine/piloto.test.mjs` e importação textual. Os dois não foram migrados. O código BRL E-COM.1 permanece implementado em `src/shared/moeda-ptbr.mjs`, reexportado por `comum/src/index.mjs`.

O snapshot pré-migração está registrado em [E-ARQ T2 — backup e rollback](E-ARQ-T2-BACKUP-ROLLBACK.md); trata-se de uma branch **não imutável**, não backup externo. Verificar SHA antes de mexer em caminhos. Para rollback, usar PR reverso/seletivo com testes, nunca force-push.

## Limites e pendências ao finalizar E-ARQ

A homologação pública mede organização, isolamento, regras de publicação, integridade sintética e CI. **Não valida** cálculos reais nem substitui auditoria privada de Weine/Casa Santana. A pendência **P4.1 (1h)** requer L1/L2 em ambiente privado autorizado e permanece **BLOQUEADA**; o PR #4 não deve ser mesclado sem essa prova. E-INFRA-L2 de 10–16h continua **ADIADA e fora do baseline**.

A E-ARQ usa peso total **5,00h** e integra o baseline ampliado E-TEST **14,50h**. Quando T6 realmente for validada: E-ARQ 5,00/5,00h = 100%, projeto ampliado 13,50/14,50h = 93,10% (restante 6,90% da P4.1). O histórico Weine F0–F16 = 15h/100%, e total histórico 19h/92,11%, **não é alterado** por este roadmap independente.

## Documentação autorizada

- [ROADMAP principal](../ROADMAP.md), [HANDOFF](../HANDOFF.md), [roadmap E-ARQ](ROADMAP-IMPLANTACAO-ARQUITETURA-V2.md)
- [ADR-0002](ADR-0002-tres-areas-monorepo.md), [relatório T5](E-ARQ-T5-HOMOLOGACAO-PUBLICA.md)
- [SECURITY](../SECURITY.md), [contrato E-COM.1](E-COM-1-conversao-moeda-ptbr.md)

**Próxima ação sujeita à verificação:** validar T6 no PR e pós-merge, sincronizar ROADMAP/HANDOFF/checkpoint no Drive com readback e preservar P4.1 privada sem prometer homologação inexistente.
