import { create } from "zustand";

// Creación de la store usando zustand
export const useStore = create((set) => ({
  getData: [],

  // Función para obtener datos de la API
  fetchData: async (url) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        console.error("Error al cargar los datos");
        return;
      }
      const data = await response.json();
      set({ getData: data });
    } catch (error) {
      console.error("Error en la solicitud de datos:", error);
    }
  },
}));
