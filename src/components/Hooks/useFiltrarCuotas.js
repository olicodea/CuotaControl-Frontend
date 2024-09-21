export default function useFiltrarCuotas(estadoCuota, valueCheck) {
  return estadoCuota
    .filter((cuota) => {
      if (!valueCheck.pendiente && !valueCheck.pagada) {
        return true;
      }
      const esPendiente = valueCheck.pendiente && cuota.estado === "pendiente";
      const esPagada = valueCheck.pagada && cuota.estado === "pagada";
      return esPendiente || esPagada;
    })
    .sort((a, b) => {
      if (valueCheck.pendiente && a.estado === "pendiente") return -1;
      if (valueCheck.pagada && a.estado === "pagada") return -1;
      return 1;
    });
}
