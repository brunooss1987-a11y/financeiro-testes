// Utilitario PUBLICO e puro; nao e parte dos motores privados Weine/Casa Santana.
// Valores convertidos por BigInt, sem arredondamento ou aritmetica monetaria de ponto flutuante.
const PADRAO_VALOR = /^(-)?(?:R\$ )?(0|[1-9][0-9]*|[1-9][0-9]{0,2}(?:\.[0-9]{3})+),([0-9]{2})$/u;
const LIMITE_CENTAVOS = BigInt(Number.MAX_SAFE_INTEGER);
const LIMITE_TEXTO = 64;

/** Le texto pt-BR estrito e devolve numero inteiro de centavos seguro. */
export function lerCentavosPtBr(texto) {
  if (typeof texto !== 'string') {
    throw new TypeError('Valor monetario deve ser texto');
  }
  if (texto.length > LIMITE_TEXTO) {
    throw new RangeError('Valor monetario muito longo');
  }
  const grupos = PADRAO_VALOR.exec(texto);
  // Em JavaScript, $ pode corresponder a posicao anterior ao \n final.
  // O teste de igualdade impede aceitar espacos/quebras invisiveis.
  if (!grupos || grupos[0] !== texto) {
    throw new TypeError('Formato pt-BR invalido: requer virgula e dois centavos');
  }
  const reais = BigInt(grupos[2].replaceAll('.', ''));
  const centavos = reais * 100n + BigInt(grupos[3]);
  if (centavos > LIMITE_CENTAVOS) {
    throw new RangeError('Valor em centavos fora do intervalo seguro');
  }
  const valor = Number(centavos);
  // Negativo zero nao deve vazar para consumidores.
  return valor === 0 ? 0 : (grupos[1] ? -valor : valor);
}

/** Recebe centavos inteiros seguros e devolve texto canonico de moeda BRL pt-BR. */
export function formatarCentavosPtBr(centavos) {
  if (typeof centavos !== 'number' || !Number.isInteger(centavos)) {
    throw new TypeError('Centavos inteiros obrigatorios');
  }
  if (!Number.isSafeInteger(centavos)) {
    throw new RangeError('Centavos fora do intervalo seguro');
  }
  const sinal = centavos < 0 ? '-' : '';
  const magnitude = BigInt(centavos < 0 ? -centavos : centavos);
  const reais = (magnitude / 100n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const fracao = (magnitude % 100n).toString().padStart(2, '0');
  return sinal + 'R$ ' + reais + ',' + fracao;
}
