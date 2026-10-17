# ADR-0002 — Áreas autônomas Weine, Casa Santana e Comum

**Data:** 2026-10-17
**Estado:** **decisão arquitetural VALIDADA na main** (T0 concluída); implantação física ainda NÃO EXECUTADA.

## Contexto

O repositório `financeiro-testes` é público e contém duas suítes sintéticas independentes e utilitários demonstrativos. A organização atual por `tests/weine` e `tests/casa-santana` separa os testes, mas a árvore ainda não oferece áreas de código e documentação próprias para cada projeto. O trabalho recente E-COM.1 destacou indevidamente componentes comuns como se fossem o objetivo principal.

O objetivo solicitado é **um repositório com três áreas autônomas**, em que Weine e Casa Santana podem evoluir funcionalidades distintas e a terceira área abriga reutilizações reais.

## Decisão

Adotar **`weine/`**, **`casa-santana/`** e **`comum/`** como domínios principais de autoria e manutenção; CI, controles de publicação, governança e documentação transversal podem permanecer na raiz.

Cada área de projeto recebe `src/`, `tests/`, `contracts/` e `docs/` quando efetivamente necessários. Uma função não precisa ser compartilhada para existir. A área `comum/` recebe código público genérico que demonstre utilidade para os dois projetos; o conversor monetário E-COM.1 é candidato natural.

O repositório **continua público e limitado a código/fixtures autorizados**. Os motores reais da Weine e da Casa Santana, arquivos privados, Google Sheets, Apps Script, segredos, dados e infraestrutura não serão migrados. A criação de pastas não equivale a autorização para publicação de código privado.

## Compatibilidade e riscos

O contrato `local-integrity/v1` fixa caminho e digest de `src/shared/centavos-demo.mjs`, e `tools/prove-public-demo-run.mjs` fixa também texto de importação e nome de teste. O runner e a CI atuais usam `tests/<suite>`. A implantação deverá conservar a compatibilidade de v1 durante a transição ou versionar expressamente novo contrato (v2), provando ambos. Não fazer substituições silenciosas de hashes, symlinks ou migração abrupta de caminhos.

A trilha de implantação será a de `docs/ROADMAP-IMPLANTACAO-ARQUITETURA-V2.md` (E-ARQ T0–T6, 5h). **Nenhum código foi movido na decisão atual.**

## Alternativas consideradas

- **Somente biblioteca comum:** rejeitada; impediria módulos exclusivos de cada projeto e não atende à organização solicitada.
- **Dois repositórios públicos separados:** não necessário neste estágio; duplicaria a infraestrutura comum de CI e governança.
- **Copiar os dois repositórios operacionais privados para o hub:** rejeitada pelas regras de segurança vigentes.
- **Mover todos os caminhos em um único commit sem transição:** rejeitada por quebrar contratos de integridade e provas públicas já aprovados.

## Critérios de aceite da decisão

Roadmap especializado ligado ao `ROADMAP.md`, status e baselines transparentes, HANDOFF operacional para T1, nenhum arquivo financeiro tocado, gate de publicação e três checks da CI aprovados no PR e após merge. A aprovação deste ADR comprova apenas a **decisão de arquitetura**, não a implantação.


## Evidência de aceite de T0

PR #32 incorporado na main em `8bd69685224c065b9f6bcda5c24dc7a42dc769c1`. CI PR `39069584418` e pós-merge `39069630708`, ambas 3/3 SUCCESS; readback de roadmap, ADR, README e HANDOFF. E-ARQ T0 validada (0,75h), próxima T1 (inventário 0,50h). Não houve migração estrutural.
