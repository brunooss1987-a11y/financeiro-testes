# Comum — biblioteca publica reutilizavel

Esta area e **complementar** aos dois projetos e nao substitui `weine/` ou `casa-santana/`. Somente funcoes realmente reutilizaveis devem ser mantidas em `comum/src/`.

**T3:** `comum/src/index.mjs` reexporta a biblioteca E-COM.1 existente, mantendo a implementacao original no caminho `src/shared/moeda-ptbr.mjs` durante a transicao. A inversao de dependencias, se necessaria, requer revisao e testes na T4.

`src/shared/centavos-demo.mjs` continua intacto: seu caminho e SHA-256 sao fixados pelo contrato `local-integrity/v1`. Nada nesta area comprova homologacao de motores privados.
