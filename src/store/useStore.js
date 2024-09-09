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
export const useStore = create((set, get) => ({
  getData: initialState,
  getPrestamos: [],
  detalles: [],

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
  // Obtener los datos de la lista de préstamos
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
}));
