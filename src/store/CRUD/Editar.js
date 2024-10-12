export const Editar = async (url, dataEdit) => {
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataEdit),
    });
    console.log(response.status);
    if (!response) return console.log(`error`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`${error} no se pudo editar correctamente `);
  }
};
