# E-OBS.1 — Resumo verificavel dos testes da CI publica

**Data:** 2026-10-14. **Estado inicial:** IMPLEMENTADO EM BRANCH; PR, checks e readback da main ainda necessarios para VALIDADO.

## 1. Escopo e lacuna real

A CI publica do hub tem 3 checks obrigatorios, e as contagens dos testes estavam apenas no log bruto de cada job. Inspecao somente leitura da run `38625803487` confirmou logs com Gate 10/10, Weine 13/13 e Casa Santana 12/12, sem artefatos anexados. O workflow anterior nao utilizava `GITHUB_STEP_SUMMARY`.

**Mudanca nova:** mostrar em cada job uma tabela nativa e limitada a contagens de testes publicos, com status e declaracao explicita de que nada valida motores privados ou homologacao financeira.

## 2. Implementacao

- `tools/public-ci-summary.mjs`: faz parse estrito das seis contagens de TAP do Node (`tests`, `pass`, `fail`, `cancelled`, `skipped`, `todo`). Rejeita falta ou duplicidade de campo, valor nao inteiro/fora do limite e contagens inconsistentes. PASS so ocorre com todos os testes passando e codigo de saida zero. Renderiza Markdown apenas com rotulos fixos e numeros inteiros.
- `tools/run-public-suite.mjs`: aceita **somente** `security`, `weine` ou `casa-santana`; nao aceita comando/arquivo arbitrario. Seleciona apenas `tests/<suite>/*.test.mjs` regulares, sem links, invoca Node com `spawnSync`, `shell:false`, tempo maximo e limite de memoria. Mantem os logs TAP ja usuais no job, mas nunca os escreve em `GITHUB_STEP_SUMMARY`. Um erro do teste, timeout, saida sem sumario ou falha de gravacao faz o job falhar, nao vira falso PASS.
- `tests/security/ci-summary.test.mjs`: 10 testes de contrato do parser e do renderizador, com insumos inteiramente sinteticos; os dez testes de E-SEC.1 continuam presentes e independentes.
- `.github/workflows/ci.yml`: preserva **Gate de publicacao**, **Piloto weine** e **Piloto casa-santana**, `contents: read`, checkout pinado e o scanner do gate; muda somente os comandos de runner para renderizar um resumo no proprio job.

**Nao ha upload de logs, novo artefato, secrets, permissao de escrita, checkout privado, consulta a Google, execucao financeira real, nova VM ou contato com sistemas privados.**

## 3. Gates de aceite

| Gate | Criterio |
|---|---|
| G1 | Revisao do diff confirma somente ferramentas e testes publicos, workflow e documentacao |
| G2 | Suite de teste do parser cobre erro, contagem faltante, duplicada, inconsistente, skip e argumento de suite nao permitido |
| G3 | Os 3 checks da CI do PR concluem SUCCESS; log mostra marcador `PUBLIC_CI_SUMMARY=PASS` com numeros e o gate continua `PUBLIC_GUARD=PASS` |
| G4 | PR mesclado, 3 checks da main SUCCESS; resumo de testes da CI comprovado por resultado/log e, quando acessivel, pela area Step Summary do GitHub |
| G5 | ROADMAP e HANDOFF relidos na main depois da validacao; P4.1 e L1/L2 privados continuam pendentes |

**Nota de evidencias:** os logs podem comprovar o marcador do runner e a execucao, mas por si sós nao provam que a interface grafica do resumo foi renderizada. Distinguir gravação tentada de renderizacao confirmada. Se a API nao expuser o Markdown da pagina da CI, registrar a limitacao, sem inventar inspecao visual.

## 4. Esforco e progresso

Expansao **E-OBS.1: 1,00h**, declarada ANTES de alterar o codigo em ROADMAP.md. Baseline E-TEST anteriormente: 7,00h (6,00h validadas = **85,71%**). Novo baseline explicito: **8,00h**. Antes da validacao: **6,00/8,00h = 75,00% concluido | 25,00% restante**. Depois da validacao E-OBS.1: **7,00/8,00h = 87,50% concluido | 12,50% restante**. As ultimas 1,00h sao a P4.1, que nao foi concluida. Historico da Weine (15h F0-F16 100%; 19h F0-F16+E1 92,11%) INALTERADO. E-INFRA-L2 10–16h ADIADA e NAO incorporada.

## 5. Proxima acao — sujeita a verificacao

Verificar PR e logs dos 3 checks; corrigir qualquer falso PASS ou ausencia de summary sem enfraquecer o scanner; so depois incorporar, confirmar CI pos-merge e atualizar o status E-OBS.1 VALIDADA em ROADMAP/HANDOFF. Proibido repetir E-SEC.1, publicar codigo privado ou alterar arquivos financeiros.
