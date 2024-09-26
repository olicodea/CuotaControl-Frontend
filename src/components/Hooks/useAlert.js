import Swal from "sweetalert2";
import useTheme from "./useTheme";

const useAlert = () => {
  const { alertTheme } = useTheme();

  const alertPago = () => {
    return Swal.fire({
      position: "top-end",
      showConfirmButton: false,
      title: "Pagado",
      icon: "success",
      timer: 1500,
      customClass: {
        popup: `w-12/12 text-sm flex items-center ${alertTheme}`,
        title: "text-ms font-medium",
      },
    });
  };

  const alertError = (message) => {
    return Swal.fire({
      title: "Error",
      text: message,
      icon: "error",
      confirmButtonText: "Ok",
      customClass: {
        popup: `w-12/12 text-sm ${alertTheme}`,
      },
    });
  };

  const alertConfirm = async (message) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: message,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
      cancelButtonText: "Cancelar",
      customClass: {
        popup: `w-12/12 text-sm ${alertTheme}`,
      },
    });

    return result.isConfirmed;
  };

  // Puedes agregar más alertas aquí según lo necesites

  return { alertPago, alertError, alertConfirm };
};

export default useAlert;
