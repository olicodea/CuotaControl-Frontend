const calcularPorcentaje = (pagado, total) => {
  const result = (parseInt(pagado) / parseInt(total)) * 100;
  return result.toFixed(2);
};
export default calcularPorcentaje;
