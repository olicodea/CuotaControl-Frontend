import { create } from "zustand";

const initialState = [
  {
    totalAFavor: "",
    totalAFavorPago: "",
    totalDeuda: "",
    totalDeudaPago: "",
    vencimientosAFavor: [],
    vencimientosDeuda: [],
  },
];

// Creación de la store usando zustand
export const useStore = create((set) => ({
  getData: initialState,

  // Función para obtener datos de la API
  fetchData: async (url) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        console.error("Error al cargar los datos");
        return;
      }
      const data = await response.json();
      console.log(data);
      set({ getData: data });
    } catch (error) {
      console.error("Error en la solicitud de datos:", error);
    }
  },
}));
