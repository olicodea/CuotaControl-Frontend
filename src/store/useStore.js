import Swal from "sweetalert2";
import { create } from "zustand";
import { Delete } from "./CRUD/Delete";
import { Editar } from "./CRUD/Editar";
import { AddLoans } from "./CRUD/AddLoans";

export const useStore = create((set, get) => ({
  getData: [],
  getPrestamos: [],
  detalles: [],
  isLoading: false,

  fetchData: async (url) => {
    set({ isLoading: true });
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
    } finally {
      set({ isLoading: false });
    }
  },

  fetchPrestamos: async (url) => {
    set({ isLoading: true });
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error("Error al cargar los préstamos");
        return;
      }
      const dataPrestamos = await response.json();
      console.log(dataPrestamos);
      set({ getPrestamos: dataPrestamos });
    } catch (error) {
      console.error("Error en la solicitud de préstamos:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchDetalles: async (url) => {
    const { detalles } = get();
    console.log(detalles);
    set({ isLoading: true });
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error("Error al cargar los detalles");
        return;
      }
      const dataDetalles = await response.json();
      set({ detalles: dataDetalles });
    } catch (error) {
      console.error("Error en la solicitud de detalles:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  AddPrestamo: async (url, data, id) => {
    set({ isLoading: true });

    const response = await AddLoans(url, data, id);
    if (!response) return;

    console.log(response);
    set({ isLoading: false });
  },

  EditDetalles: async (url, id, data) => {
    set({ isLoading: true });
    const updateEditData = {
      id: id,
      tipo: data.tipo,
      notas: data.descripcion || "",
    };

    const response = await Editar(url, updateEditData);
    if (!response) return;

    set((detalles) => ({
      ...detalles,
      tipo: updateEditData.tipo,
      notas: updateEditData.notas,
    }));
    set({ isLoading: false });
  },

  deleteItem: async (id, url, resultIsConfirmed) => {
    const { detalles } = get();
    if (resultIsConfirmed) {
      set({ isLoading: true }); // Establecer carga a true
      const response = await Delete(url);

      if (response) {
        const detallesArray = Array.from(detalles);
        if (Array.isArray(detallesArray)) {
          const deleteItem = detallesArray.filter((item) => item.id !== id);
          set({ detalles: deleteItem });
        } else {
          console.error("detalles no es un arreglo:", detalles);
        }
      } else {
        Swal.fire({
          title: "Error",
          text: "No se pudo eliminar el producto. Inténtalo más tarde.",
          icon: "error",
        });
        return false;
      }
      set({ isLoading: false }); // Establecer carga a false
      return resultIsConfirmed;
    }
  },

  ItemPagado: (cuotaId) => {
    const { detalles } = get();
    const { cuotas } = detalles;

    try {
      const cuotasActualzadas = cuotas.map((cuota) => {
        if (cuota.id === cuotaId && cuota.estado === "pendiente") {
          return { ...cuota, estado: "pagada" };
        }
        return cuota;
      });
      set({ ...detalles, cuotas: cuotasActualzadas });
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  },
}));
