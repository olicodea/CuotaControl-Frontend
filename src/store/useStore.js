import { create } from "zustand";

const initialState = [
  {
    totalAFavor: 0,
    totalAFavorPago: 0,
    totalDeuda: 0,
    totalDeudaPago: 0,
    vencimientosAFavor: [],
    vencimientosDeuda: [],
  },
];

export const useStore = create((set, get) => ({
  getData: initialState,
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
        console.error("Error al cargar los datos");
        return;
      }
      const data = await response.json();
      set({ getPrestamos: data });
    } catch (error) {
      console.error("Error en la solicitud de datos:", error);
    }
  },

  fetchDetalles: async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error("Error al cargar los datos");
        return;
      }
      const data = await response.json();
      set({ detalles: data });
    } catch (error) {
      console.error("Error en la solicitud de datos:", error);
    }
  },

  getDetalles: (id) => {
    const { detalles } = get();
    return detalles.find((prestamo) => prestamo.id === id);
  },

  EditDetalles: (id, data) => {
    console.log(id, data); // Implementar lógica PATCH para el backend aquí
    // tengo que hacer algo como fetch('/api/detalles', { method: 'PATCH', body: JSON.stringify(data) })
  },
}));
