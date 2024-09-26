export const AddLoans = async (url, dataAddLoans) => {
  console.log(url, dataAddLoans);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataAddLoans),
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
