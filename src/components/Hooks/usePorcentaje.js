const calcularPorcentaje = (pagado, total) => {
  let result = 0;
  if (pagado >= total) {
    result = 100;
  } else {
    result = (pagado / total) * 100;
  }

  return Number(result === 100 ? result : result.toFixed(2));
};
export default calcularPorcentaje;
