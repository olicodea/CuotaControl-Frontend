const formatDate = (dateString) => {
  const [day, month, year] = new Date(dateString)
    .toLocaleDateString("es-AR")
    .split("/");
  return `${day}/${month}/${year}`; // Formato DD/MM/YYYY
};

export const AddLoans = async (url, dataAddLoans) => {
  const { cantidadCuotas, usuarioId, fechaInicio, monto, notas, tipoPrestamo } =
    dataAddLoans;
  //validad los updateLoans

  const updateLoans = {
    tipoPrestamo: tipoPrestamo,
    monto: monto,
    fechaInicio: formatDate(fechaInicio),
    notas: notas,
    usuarioId: usuarioId,
    cantidadCuotas: cantidadCuotas,
  };

  console.log(updateLoans);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateLoans),
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error:", error);
  }
};
