# ADR-0001: Hub publico compartilhado de testes offline

Status: PILOTO, sujeito a CI publica real.

## Parecer do conselho
Arquitetura: um monorepo publico reduz duplicacao; suites separadas para Weine e Casa Santana.
Seguranca: somente codigo revisado e dados ficticios, sem segredos ou integracoes autenticadas.
Qualidade: smoke tests iniciais NAO homologam motor financeiro real.
Custos: runners padrao em repositorio publico podem ser gratuitos; bloqueio de faturamento da conta precisa ser verificado pela execucao.
Manutencao: uma CI com jobs isolados; separar repos somente diante de ciclos, permissoes ou equipes incompatíveis.

## Decisao
Adotar um unico hub publico para testes OFFLINE compartilhados, com E2E e implantacoes dentro dos repositorios privados. Nao chamar um workflow publico a partir do repo privado esperando gratuidade.

## Criterios do piloto
1. Repositorio criado sem copiar codigo privado.
2. CI inicia e conclui gate de publicacao, suite Weine ficticia e suite Casa Santana ficticia.
3. Nenhum token, API ou deploy utilizado.
4. Se billing bloquear CI, nao migrar testes privados.
5. So considerar componentes reais apos revisao e rastreio de versao.

## Escopo
Expansao proposta E-TEST com baseline proprio de 6 horas; NAO incorporada ao baseline historico de 19 horas de Weine. F0-F16 e E1 permanecem com seus percentuais anteriores. O piloto nao conta como homologacao financeira.
