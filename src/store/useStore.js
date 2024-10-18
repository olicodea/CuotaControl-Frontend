import Swal from "sweetalert2";
import { create } from "zustand";
import { Delete } from "./CRUD/Delete";
import { Editar } from "./CRUD/Editar";
import { AddLoans } from "./CRUD/AddLoans";

export const useStore = create((set, get) => ({
  getData: [],
  getPrestamos: [],
  detalles: [],
  listContacto: [],
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

      set({ getPrestamos: dataPrestamos });
    } catch (error) {
      console.error("Error en la solicitud de préstamos:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchDetalles: async (url) => {
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

  AddPrestamo: async (url, data) => {
    set({ isLoading: true });

    const response = await AddLoans(url, data);
    if (!response) return;

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
    if (!resultIsConfirmed) return false;

    const { detalles } = get();
    set({ isLoading: true });

    try {
      const response = await Delete(url);

      if (response && Array.isArray(detalles)) {
        set((state) => ({
          ...state,
          detalles: detalles.filter((item) => item.id !== id),
        }));
      } else {
        Swal.fire({
          title: "Error",
          text: "No se pudo eliminar el producto. Inténtalo más tarde.",
          icon: "error",
        });
        return false;
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Ha ocurrido un problema. Inténtalo más tarde.",
        icon: "error",
      });
      console.error(error);
      return false;
    } finally {
      set({ isLoading: false });
    }

    return true;
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

  fetchContactList: async (url) => {
    try {
      const res = await fetch(url);
      if (!res.ok) return;
      const list = await res.json();
      set({ listContacto: list });
    } catch (error) {
      console.log(error);
    }
  },

  addContactoList: async (url, data) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        return false;
      }

      set((state) => ({
        listContacto: [...state.listContacto, data],
      }));
      return true;
    } catch (error) {
      console.error("Error al agregar el contacto:", error);
      return false;
    }
  },
}));
