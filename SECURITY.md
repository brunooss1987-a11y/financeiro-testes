# Politica de seguranca do repositorio publico

1. NUNCA copiar arquivos, commits ou snapshots de repositorios privados sem revisao individual documentada.
2. NUNCA incluir segredos, refresh tokens, tokens de acesso, Client Secret, .clasp, .env, arquivos JSON de credenciais, URLs/IDs de planilhas, dados bancarios, CPF, nome de cliente ou transacoes financeiras reais.
3. Somente codigo generico especificamente autorizado, fixtures 100% sinteticas e testes deterministas sem rede.
4. NUNCA permitir checkout de repositorios privados, login Google, OIDC, deploy, Google Sheets, Apps Script, webhooks operacionais ou upload de artefatos privados neste pipeline.
5. O GITHUB_TOKEN deve permanecer apenas com contents:read. Nao utilizar pull_request_target, secrets:inherit, workflow_run encadeado, nem execucao privilegiada de codigo enviado por terceiros.
6. Proteger a branch main e revisar contribuicoes externas antes de integrar codigo compartilhado real.
7. Testes publicos aprovados NAO comprovam homologacao real das planilhas.
8. Se um segredo for exposto, REVOGAR/ROTACIONAR antes de apenas remover o texto; auditar commits e forks.
9. Antes de publicar, executar guard de seguranca, verificar arquivos e conferir ausencia de tokens e dados reais.
