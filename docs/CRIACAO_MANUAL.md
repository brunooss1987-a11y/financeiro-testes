# Criacao e uso

Repositorio publico criado inicialmente pela conta proprietaria com README. Aplicar somente arquivos do piloto, nenhum snapshot privado. O teste inicial valida apenas se os runners publicos iniciam apesar do bloqueio de billing.

Conferir Settings > Actions > General e limitar permissoes padrao a leitura. Proteger main antes de incluir componentes reais. Conferir Actions > Piloto publico: security PASS; Weine PASS; Casa Santana PASS.

Se CI nao iniciar devido a billing, nao migrar o codigo privado. Nenhum workflow deve usar secrets, autenticacao Google ou implantacao. Mudancas futuras em codigo compartilhavel exigem revisao individual de seguranca.
