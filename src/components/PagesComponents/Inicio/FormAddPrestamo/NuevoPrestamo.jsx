import Button from "../Button/Button";
import { IoMdClose } from "react-icons/io";

export default function NuevoPrestamo({ close, onSubmit, register, handleSubmit }) {

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <main className="relative bg-white rounded-lg shadow-md p-6 w-10/12 max-w-md"> {/* Ajusté max-w para que sea más pequeño */}
                <button onClick={close} className="absolute right-4 top-4"><IoMdClose size={20} /></button>
                <h1 className="text-2xl font-semibold text-center mb-4">Agregar nuevo préstamo</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                    <label htmlFor="nombre" className="flex flex-col">
                        <span>Nombre:</span>
                        <input {...register("nombre", { required: true })} type="text" className="border border-gray-300 rounded p-2" placeholder="Lautaro... Romina..." />
                    </label>

                    <div className="flex gap-3">
                        <label htmlFor="monto" className="flex flex-col w-1/2"> {/* Monto y fecha en columnas */}
                            <span>Monto:</span>
                            <input {...register("monto", { required: true })} type="number" min={0} className="border border-gray-300 rounded p-2" placeholder="$" />
                        </label>
                        <label htmlFor="fechaInicio" className="flex flex-col w-1/2">
                            <span>Fecha de Inicio:</span>
                            <input {...register("fechaInicio")} type="date" className="border border-gray-300 rounded p-2" />
                        </label>
                    </div>

                    <label htmlFor="tipoPrestamo" className="flex flex-col">
                        <span>Tipo:</span>
                        <select {...register("tipoPrestamo", { required: true })} className="border border-gray-300 rounded p-2">
                            <option value="">Selecciona una opción</option>
                            <option value="pedido">Pedido</option>
                            <option value="prestado">Prestado</option>
                        </select>
                    </label>

                    <label htmlFor="notas" className="flex flex-col">
                        <span>Notas:</span>
                        <textarea {...register("notas")} className="border border-gray-300 rounded p-2" />
                    </label>

                    <label htmlFor="cantidadCuotas" className="flex flex-col">
                        <span>Cantidad de Cuotas:</span>
                        <input {...register("cantidadCuotas", { required: true })} type="number" min={0} max={12} className="border border-gray-300 rounded p-2" />
                    </label>

                    <Button name="Guardar" type="submit" />
                </form>
            </main>
        </div>
    );
}
