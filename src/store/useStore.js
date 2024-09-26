import Swal from "sweetalert2";
import { create } from "zustand";
import { Delete } from "./CRUD/Delete";
import { Editar } from "./CRUD/Editar";

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
      console.log(dataPrestamos);

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

  EditDetalles: async (url, id, data) => {
    const { detalles } = get();

    const updateEditData = {
      id: id,
      tipo: data.tipo,
      notas: data.descripcion || "",
    };

    const response = await Editar(url, updateEditData);
    if (!response) return;

    const detallesIsArray = Array.from(detalles);
    if (Array.isArray(detallesIsArray)) {
      const itemEditado = detallesIsArray.map((item) => {
        if (item.id === id) {
          // si es igual al id retorno el item que con las prop remplazadas
          return {
            ...item,
            tipo: updateEditData.tipo,
            notas: updateEditData.notas,
          };
        }
        return item;
      });

      set({ detalles: itemEditado });
    }
  },
  deleteItem: async (id, url) => {
    const { detalles } = get();
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
      return result.isConfirmed;
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
