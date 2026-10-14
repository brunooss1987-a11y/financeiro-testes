# P3.1 — Inventario dos testes offline da Casa Santana

Data: 2026-10-14. Escopo: **somente leitura e classificacao de publicabilidade**; nenhum codigo da Casa Santana foi publicado nem alterado.

## Resultado

**P3.1 VALIDADA como inventario e selecao.** A publicacao eventual de codigo-fonte real exige revisao e gates especificos de P4.1; nao foi autorizada automaticamente.

A arvore `main` do repositorio privado Casa Santana continha, no momento da auditoria: **608 arquivos** (incluindo **129 scripts `scripts/test-*.mjs`**, **92 arquivos `src/`**, **62 snapshots `live-src-snapshot/`** e **20 workflows**). Os numeros mostram o universo mapeado, NAO uma inspecao integral de conteudo de todos os arquivos. A triagem de seguranca leu detalhadamente os dois candidatos e exemplos representativos de testes de planilha, obras, gado, OAuth e HTTPS local.

## Par REAL selecionado — publicacao CONDICIONAL

| Caminho na origem privada | Git blob SHA exato na main | Parecer |
|---|---|---|
| `scripts/adv1-connector-refusal-guard.mjs` | `dbf81cb36f07aeeba5cfd52b239d2f12ed1267e1` | Funcao pura de classificacao de recusas e resultados incertos; apenas memoria |
| `scripts/test-adv1-connector-refusal-guard.mjs` | `d096b4df3eeb4cfc73997d8bd87e42af204443d9` | 13 cenarios sinteticos usando biblioteca padrao `node:assert/strict` |

As duas fontes foram consultadas na GitHub API e verificadas por inspecao estatica: **sem** chamadas de rede, Google Sheets ou Apps Script, acesso a filesystem, variaveis de ambiente, uso de subprocessos, credenciais reconheciveis, URL de planilha ou CPF formatado. Nao ha dependencia de `src/` nem pacote externo. A rotina classifica eventos e devolve sinalizadores de protecao; nao executa pagamentos nem escrita.

### Evidencia executada ANTERIORMENTE pela CI privada — verificacao sem repeticao

- Run privado: `https://github.com/brunooss1987-a11y/Casa-santana/actions/runs/38489755488`, workflow **Validate Apps Script**, conclusao `success`, job `115611901085` `success`.
- Head commit da execucao: `40b2b20cf13ac2eb350f65956bd2a604876931f4`.
- Arvore desse commit: os dois Git blob SHA sao **exatamente iguais** aos dois blobs verificados na `main` no momento da auditoria.
- `scripts/validate-repo.mjs` inclui expressamente `scripts/test-adv1-connector-refusal-guard.mjs`; o log da execucao registra: **"ADV-1 connector refusal guard OK (13 scenarios; no live writes)."**
- Tentativa posterior de uma nova execucao local isolada foi bloqueada por uma restricao de seguranca, nao executada e NAO contornada. O aceite usa **a evidencia historica da CI com hashes coincidentes**, sem alegar uma nova execucao.
- Isso prova o comportamento dos cenarios no commit verificado, nao homologacao de planilha real nem ausencia de todas as vulnerabilidades.

## Outros conjuntos classificados

| Grupo | Parecer nesta etapa | Razao |
|---|---|---|
| `scripts/test-adv1-gado-*.mjs` | PRIVADO | Alguns leem o arquivo completo `src/GadoService.gs`; publicar os testes isolados nao validaria a funcao sem tambem revelar o codigo privado |
| `scripts/test-adv1-obras-*.mjs` | PRIVADO | Acoplados a `src/ObrasService.gs` e a invariantes operacionais |
| `scripts/test-adv1-appsscript-readonly-evidence.mjs` | PRIVADO | Le `src/Adv1ReadOnlyEvidenceService.gs` e espelha estruturas tecnicas da planilha em fixtures |
| `scripts/test-adv1-cloud-*.mjs`, `scripts/test-adv1-oauth-*.mjs` | PRIVADO | Contratos de projeto Google, autenticacao, capacidades/escopos ou identificacao |
| `scripts/test-adv1-local-https-*.mjs` | REAVALIAR | Alguns sao offline, mas representam fronteiras de autenticacao/servidor; requer revisao especifica de seguranca |
| `scripts/validate-repo.mjs`, `src/`, `live-src-snapshot/`, workflows de deploy | PRIVADO | Dependencias reais, configuracoes de producao, permissoes e/ou fonte financeira completa |
| Demais 129 scripts | NAO APROVADOS PARA PUBLICACAO | Sem revisao individual de fonte/dependencias; nao inferir seguranca apenas pelo nome ou pelo sucesso da suite interna |

## Condicoes obrigatorias antes de divulgar os candidatos

1. Releitura de ambos os arquivos na origem privada, hashes e revisao de todas as linhas; nao copiar pasta/repo inteiros.
2. Confirmar que a logica publicada e IDENTICA ao modulo validado; registrar commit/blob SHA em manifesto publico de proveniencia sem URLs operacionais.
3. Publicar apenas via PR no hub com guard de seguranca e os tres checks obrigatorios. O `GITHUB_TOKEN` permanece `contents:read`, sem secrets, autenticacao Google, checkout de repo privado ou deploy.
4. Se a origem mudar, nao manter testes desatualizados como se validassem a versao corrente; nova revisao/hash antes de atualizar a central.
5. A suite publica deve continuar separada entre Weine e Casa Santana. Testes reais de Google Sheets e E2E permanecem privados.

## Proxima etapa

**P4.1 — Versionamento rastreavel e integracao documentada.** Verificar o estado real dos PRs, os controles de GitHub Actions e a versao atual da origem privada; decidir a publicacao controlada dos dois pares ja classificados (Weine e Casa Santana), sem ultrapassar os gates. A classificacao P3.1 nao e autorizacao para copiar automaticamente codigo privado.
