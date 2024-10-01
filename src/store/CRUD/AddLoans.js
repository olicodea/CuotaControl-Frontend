const formatDate = (dateString) => {
  const [year, month, day] = new Date(dateString)
    .toLocaleDateString("es-ES")
    .split("/");
  return `${day}/${month}/${year}`; // Formato DD/MM/YYYY
};

export const AddLoans = async (url, dataAddLoans, id) => {
  const {
    cantidadCuotas,
    contactoId,
    fechaInicio,
    monto,
    notas,
    tipoPrestamo,
  } = dataAddLoans;

  const updateLoans = {
    tipoPrestamo: tipoPrestamo,
    monto: monto,
    fechaInicio: formatDate(fechaInicio),
    notas: notas,
    contactoId: contactoId,
    usuarioId: id,
    cantidadCuotas: cantidadCuotas,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateLoans),
    });
    console.log(response.status);

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error:", error);
  }
};
