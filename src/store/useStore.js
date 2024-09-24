import Swal from "sweetalert2";
import { create } from "zustand";
import { Delete } from "./CRUD/Delete";

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
      const dataPrestamos = await response.json();

      set({ getPrestamos: dataPrestamos });
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
      const dataDetalles = await response.json();

      set({ detalles: dataDetalles });
    } catch (error) {
      console.error("Error en la solicitud de detalles:", error);
    }
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
  deleteItem: async (id, url) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
      cancelButtonText: "Cancelar",
    });
    if (result.isConfirmed) {
      // Hacemos la petición DELETE al backend
      const response = await Delete(url);

      if (response) {
        set((state) => ({
          detalles: state.detalles.filter((item) => item.id !== id),
        }));
        return true;
      } else {
        Swal.fire({
          title: "Error",
          text: "No se pudo eliminar el producto. Inténtalo más tarde.",
          icon: "error",
        });
        return false;
      }
    }
  },

  ItemPagado: (cuotaId) => {
    const { detalles } = get();

    const { cuotas } = detalles;

    const cuotasActualzadas = cuotas.map((cuota) => {
      if (cuota.id === cuotaId && cuota.estado === "pendiente") {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "pagado",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: "p-5 text-xs w-6/12 h-auto",
          },
        });
        return { ...cuotas, estado: "pagada" };
      }
      return cuotas;
    });
    set({ ...detalles, cuotas: cuotasActualzadas });

    //actual;izo el estado local y aca abajo tengo que mandarle los datos albackend
  },
}));
