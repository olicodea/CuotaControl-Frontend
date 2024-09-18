import { create } from "zustand";

export const useStore = create((set, get) => ({
  getData: [],
  getPrestamos: [],
  detalles: [],

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

  fetchPrestamos: async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error("Error al cargar los préstamos");
        return;
      }
      const data = await response.json();
      set({ getPrestamos: data });
    } catch (error) {
      console.error("Error en la solicitud de préstamos:", error);
    }
  },

  fetchDetalles: async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error("Error al cargar los detalles");
        return;
      }
      const data = await response.json();
      set({ detalles: data });
    } catch (error) {
      console.error("Error en la solicitud de detalles:", error);
    }
  },

  getDetalles: (id) => {
    const { detalles } = get();
    return detalles.find((detalle) => detalle.id === id);
  },

  EditDetalles: async (id, data) => {
    const { detalles } = get();
    const detallesEdit = detalles.map((elemt) => {
      if (elemt.id === id) {
        return { ...elemt, ...data };
      } else {
        return elemt;
      }
    });

    set({ detalles: detallesEdit });

    // Implementar la solicitud PATCH para el backend
  },
}));
