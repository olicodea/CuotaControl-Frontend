import Swal from "sweetalert2";
import { create } from "zustand";
import { Delete } from "./CRUD/Delete";
import { Editar } from "./CRUD/Editar";
import { AddLoans } from "./CRUD/AddLoans";
import useAlert from "../components/Hooks/useAlert";

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
    const { detalles } = get();
    console.log(detalles);
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
  AddPrestamo: async (url, data, id) => {
    const updateLoans = {
      tipoPrestamo: data.tipoPrestamo,
      monto: Number(data.monto),
      fechaInicio: data.fechaInicio,
      notas: data.notas,
      contactoId: "66e32f2648ce6527d50c555b",
      usuarioId: id,
      cantidadCuotas: Number(data.cantidadCuotas),
    };
    const response = await AddLoans(url, updateLoans);
    if (!response) return;

    console.log(response);
  },
  EditDetalles: async (url, id, data) => {
    const updateEditData = {
      id: id,
      tipo: data.tipo,
      notas: data.descripcion || "",
    };

    const response = await Editar(url, updateEditData);
    if (!response) return;

    // Actualiza solo los campos específicos
    set((detalles) => ({
      ...detalles,
      tipo: updateEditData.tipo,
      notas: updateEditData.notas,
    }));
  },

  deleteItem: async (id, url, resultIsConfirmed) => {
    const { detalles } = get();

    if (resultIsConfirmed) {
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
      return resultIsConfirmed;
    }
  },

  ItemPagado: (cuotaId) => {
    const { detalles } = get();

    const { cuotas } = detalles;
    // si se cumple el fetch que haga todo lo que esta adentro de try de lo contrario retunr false entonces la alerta no salta
    try {
      const cuotasActualzadas = cuotas.map((cuota) => {
        if (cuota.id === cuotaId && cuota.estado === "pendiente") {
          return { ...cuotas, estado: "pagada" };
        }
        return cuotas;
      });
      set({ ...detalles, cuotas: cuotasActualzadas });
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;

    //actual;izo el estado local y aca abajo tengo que mandarle los datos albackend
  },
}));
