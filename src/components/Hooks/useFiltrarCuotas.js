export default function useFiltrarCuotas(cuotasConEstado, valueCheck) {
  const cuotasFiltradas = cuotasConEstado
    .filter((cuota) => {
      if (valueCheck.pendiente && cuota.estado === "pendiente") return true;
      if (valueCheck.pagado && cuota.estado === "pagado") return true;
      if (!valueCheck.pendiente && !valueCheck.pagado) return true;
    })
    .sort((a, b) => {
      if (valueCheck.pendiente) {
        return a.estado === "pendiente" ? -1 : 1;
      }
      if (valueCheck.pagado) {
        return a.estado === "pagado" ? -1 : 1;
      }
      return 0;
    });
  return cuotasFiltradas;
}
