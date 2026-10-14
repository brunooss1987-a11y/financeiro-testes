// EXEMPLO FICTICIO: NAO e o motor financeiro da Weine ou da Casa Santana.
export function somarCentavosDemo(valores) {
  if (!Array.isArray(valores)) throw new TypeError('Lista obrigatoria');
  let total = 0;
  for (const valor of valores) {
    if (!Number.isSafeInteger(valor)) throw new TypeError('Centavos inteiros obrigatorios');
    total += valor;
    if (!Number.isSafeInteger(total)) throw new RangeError('Total nao seguro');
  }
  return total;
}
