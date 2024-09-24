export const Delete = async (url) => {
  try {
    const response = await fetch(url, { method: "DELETE" });

    return response.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
};
