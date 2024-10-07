import { useEffect, useState } from "react";
import Button from "../Button/Button";
import { IoMdClose } from "react-icons/io";

export default function NuevoPrestamo({ close, onSubmit, register, handleSubmit, errors }) {

    const [listContacto, setListContacto] = useState([])

    useEffect(() => {
        try {
            const fetchContacto = async () => {
                const url = "../../../../../public/services/ListaContacto.json"
                const response = await fetch(url)
                if (!response) return;

                const data = await response.json()
                setListContacto(data)
            }
            fetchContacto()

        } catch (error) {
            console.log(error)
        }
    }, [])


    const styleErrors = 'text-red-500 text text-sm justify-center items-center flex';
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <main className="relative bg-white rounded-lg shadow-md p-6 w-10/12 max-w-md">
                <button onClick={close} className="absolute right-4 top-4"><IoMdClose size={20} /></button>
                <h1 className="text-2xl font-semibold text-center mb-4">Agregar nuevo préstamo</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">

                    {/* Nombre */}
                    <label htmlFor="contactoId">
                        Nombre:
                        <select {...register("contactoId", { required: 'Por favor seleccione un contacto' })}>
                            {listContacto.map((contact, i) => {
                                return <option key={i} value={contact.contactoId}>
                                    {contact.nombre}
                                </option>
                            })}
                        </select>
                        {errors.contactoId && <span className={styleErrors}>{errors.contactoId.message}</span>}
                    </label>

                    <div className="flex gap-3">
                        {/* Monto */}
                        <label htmlFor="monto" className="flex flex-col w-1/2">
                            <span>Monto:</span>
                            <input
                                {...register("monto", {
                                    required: 'El monto es obligatorio',
                                    valueAsNumber: true,
                                    pattern: /[^a-zA-Z0-9]/
                                })}
                                type="number"
                                min={0}
                                className="border border-gray-300 rounded p-2"
                                placeholder="$Solo numeros"
                            />
                            {errors.monto && <span className={styleErrors}>{errors.monto.message}</span>}
                        </label>

                        {/* Fecha de Inicio */}
                        <label htmlFor="fechaInicio" className="flex flex-col w-1/2">
                            <span>Fecha de Inicio:</span>
                            <input
                                {...register("fechaInicio", { required: 'La fecha de inicio es obligatoria' })}
                                type="date"
                                className="border border-gray-300 rounded p-2"
                            />
                            {errors.fechaInicio && <span className={styleErrors}>{errors.fechaInicio.message}</span>}
                        </label>
                    </div>

                    {/* Tipo de Préstamo */}
                    <label htmlFor="tipoPrestamo" className="flex flex-col">
                        <span>Tipo:</span>
                        <select
                            {...register("tipoPrestamo", { required: 'El tipo de préstamo es obligatorio' })}
                            className="border border-gray-300 rounded p-2">
                            <option value="">Selecciona una opción</option>
                            <option value="recibido">Recibido</option>
                            <option value="prestado">Prestado</option>
                        </select>
                        {errors.tipoPrestamo && <span className={styleErrors}>{errors.tipoPrestamo.message}</span>}
                    </label>

                    {/* Notas */}
                    <label htmlFor="notas" className="flex flex-col">
                        <span>Notas:</span>
                        <textarea {...register("notas")} className="border border-gray-300 rounded p-2" />
                    </label>

                    {/* Cantidad de Cuotas */}
                    <label htmlFor="cantidadCuotas" className="flex flex-col">
                        <span>Cantidad de Cuotas:</span>
                        <input
                            {...register("cantidadCuotas", {
                                required: 'Por favor ingrese la cantidad de cuotas',
                                valueAsNumber: true,
                                min: { value: 1, message: 'Debe ser al menos 1 cuota' },
                                max: { value: 12, message: 'El máximo es 12 cuotas' }
                            })}
                            type="number"
                            min={0}
                            max={12}
                            className="border border-gray-300 rounded p-2"
                        />
                        {errors.cantidadCuotas && <span className={styleErrors}>{errors.cantidadCuotas.message}</span>}
                    </label>

                    <Button name="Guardar" type="submit" />
                </form>
            </main>
        </div>
    );
}
