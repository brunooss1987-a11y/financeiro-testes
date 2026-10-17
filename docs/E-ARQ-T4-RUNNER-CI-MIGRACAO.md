# E-ARQ T4 — Runner, comandos e governança das três áreas

**Data:** 2026-10-17. **Subetapa:** T4 — 0,75h dentro das 5h E-ARQ já aprovadas (sem expansão). **Estado final:** **T4 VALIDADA na main** por PR #40, CI PR/main e readback; execução dos testes originais e novos preservada.

## Situação conferida antes das mudanças
- `main` no commit `5fd08f19383565cd98ba1d08f80fa98b61e4cf4f`; CI `39072237838` SUCCESS 3/3; T3 validada.
- Backup `backup/e-arq-t2-pre-migracao-20261017` ainda em `53a4a6eba6ada83b4bcee1f28824257799bfa4b0`. Arquivos públicos pinados `contracts/public-demo.json`, `src/shared/centavos-demo.mjs`, `tests/weine/piloto.test.mjs` e `tools/prove-public-demo-run.mjs` não foram tocados na T4.
- As suítes de projeto novas já tinham 18 testes Weine e 17 Casa Santana, além de 2 do Comum; os 21 testes de segurança executavam indiretamente os 37 casos das novas áreas.

## Implementação T4
1. `tools/run-public-suite.mjs`: allowlist continua estrita a três valores `security`, `weine`, `casa-santana`; mapeia os diretórios `tests/security`, `weine/tests`, `casa-santana/tests` por objeto interno fixo. Descoberta mantém 1–40 arquivos de extensão `.test.mjs`, nomes restritos, proibição de symlink e runner Node sem shell, com TAP fail-closed e Step Summary.
2. `package.json`: `npm test` executa testes de Weine, Casa Santana e Comum nos respectivos diretórios; comandos por domínio `test:weine`, `test:casa`, `test:comum`. Acrescenta `test:legacy` para executar os 35 testes v1 originais sem transferi-los nem silenciá-los.
3. `.github/workflows/ci.yml`: **mesmos três checks**, com `contents: read`, action pinada e gate como requisito; o gate executa testes de segurança (21), o legado (35), o Comum (2) e o scanner de publicação, antes de habilitar os pilotos dos novos diretórios (18 e 17).
4. `.github/CODEOWNERS`: três entradas explícitas `weine/`, `casa-santana/`, `comum/`, preservando proprietário e wildcard existentes.
5. `README.md`: documenta comandos e separação de áreas.

## Condições de aceite
- Gate: 21/21 segurança, 35/35 legado, 2/2 comum, `PUBLIC_GUARD=PASS`; teste de segurança de arquitetura continua a executar 37/37 nas três áreas. Pilotos matriz: Weine 18/18 e Casa Santana 17/17, agora **nos diretórios novos**.
- CI 3/3 SUCCESS no PR e na main; diff preserva os arquivos pinados v1, dados privados e permissões.
- Releitura de runner, npm, workflow, CODEOWNERS, principais contratos v1 e backup após merge.
- Sem alterar motores financeiros, planilhas, IDs, fórmulas, Apps Script, OAuth, outras refs Git ou acesso privado.

## Progresso ponderado
**Até T4 validar:** E-ARQ 3,25/5,00h = **65,00% concluída | 35,00% restante**; E-TEST ampliado 11,75/14,50h = **81,03% concluído | 18,97% restante**.
**Se T4 validar:** T4 0,75/0,75h = 100%; E-ARQ **4,00/5,00h = 80,00% concluída | 20,00% restante**; E-TEST ampliado **12,50/14,50h = 86,21% concluído | 13,79% restante**. Weine histórica 19h/92,11% inalterada, P4.1 1h privada L1/L2 pendente, E-INFRA-L2 adiada.

## Evidências finais de validação de T4

PR #40 incorporado à main no commit público `aa85aac7374c0c61f111fd0a8af7b5eb76688c29`. CI do PR [39072699368](https://github.com/brunooss1987-a11y/financeiro-testes/actions/runs/39072699368) e CI pós-merge [39072770519](https://github.com/brunooss1987-a11y/financeiro-testes/actions/runs/39072770519), **COMPLETED SUCCESS 3/3**. Logs do gate: 21/21 segurança com prova de 37/37 nas novas áreas, 35/35 legado, 2/2 Comum, `PUBLIC_GUARD=PASS`; pilotos nos diretórios novos Weine 18/18 e Casa Santana 17/17. Readback da main confirmou runner, npm, CI, ROADMAP/HANDOFF, contrato `local-integrity/v1` e fonte hashada originais, e backup no SHA fixo.

**PROGRESSO DO ROADMAP:** T4 **0,75/0,75h = 100,00% concluída | 0,00% restante**; E-ARQ **4,00/5,00h = 80,00% concluída | 20,00% restante**; E-TEST+E-ARQ **12,50/14,50h = 86,21% concluído | 13,79% restante**. Nenhuma expansão e baseline mantido. O teste de ponte T3 segue na CI em conjunto com o runner T4; sua eventual simplificação deverá manter toda cobertura e falhar fechado.

## PROXIMA ACAO A EXECUTAR - SUJEITA A VERIFICACAO

Verificar PR e CIs de T4, este arquivo e os roadmaps na main. Avançar somente a **T5 — Homologação pública da estrutura (0,50h)**, avaliando dependências, isolamento, cobertura, scripts e integridade v1/backup, sem testes privados. Não repetir T4 concluída.
