import { IoMdClose } from "react-icons/io";
import { Button } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { useEffect, useMemo } from "react";
import { useStore } from "../../../store/useStore";

export default function ModalEditContact({ openEditModal, handleCloseModalEdit, handleSaveEdit, idOpenModal }) {
    const { listContacto } = useStore((state) => ({
        listContacto: state.listContacto,
    }));
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const infoUserActual = useMemo(() => {
        return listContacto.find((contact) => contact.usuarioId === idOpenModal)
    }, [idOpenModal, listContacto])

    useEffect(() => {
        if (infoUserActual) {
            reset({
                nombre: infoUserActual.nombre,
                telefono: infoUserActual.telefono || 0,
                email: infoUserActual.email,
                nota: infoUserActual.nota || 'No hay notas',
            });
        }
    }, [infoUserActual, reset]);


    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ${openEditModal ? '' : 'hidden'}`}>
            <main className="relative bg-white rounded-lg shadow-md p-6 w-10/12 max-w-md flex flex-col">
                <button
                    onClick={handleCloseModalEdit}
                    className="absolute right-1 top-1 p-2"
                >
                    <IoMdClose size={20} />
                </button>

                <h1 className="text-2xl font-semibold text-center mb-4">Editar Contacto</h1>

                <form className="flex flex-col gap-3" onSubmit={handleSubmit(handleSaveEdit)}>

                    <label htmlFor="nombre" className="flex flex-col">
                        <span>Nombre:</span>
                        <input
                            type="text"
                            className="border border-gray-300 rounded p-2"
                            {...register('nombre')}
                        />
                        {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}
                    </label>

                    <label htmlFor="telefono" className="flex flex-col">
                        <span>Teléfono:</span>
                        <input
                            type="number"
                            className="border border-gray-300 rounded p-2"
                            {...register('telefono', { required: 'El teléfono es requerido' })}
                        />
                        {errors.telefono && <p className="text-red-500 text-sm">{errors.telefono.message}</p>}
                    </label>

                    <label htmlFor="email" className="flex flex-col">
                        <span>Email:</span>
                        <input
                            type="email"
                            className="border border-gray-300 rounded p-2"
                            {...register('email', {
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: 'Ingresa un email válido'
                                }
                            })}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </label>

                    <label htmlFor="nota" className="flex flex-col">
                        <span>Nota:</span>
                        <textarea
                            className="border border-gray-300 rounded p-2"
                            {...register('nota', { maxLength: 200 })}
                        />
                        {errors.nota && <p className="text-red-500 text-sm">{errors.nota.message}</p>}
                    </label>

                    {/* Botones de acción */}
                    <div className="flex justify-center mt-4 gap-4">
                        <Button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                        >
                            Guardar
                        </Button>
                        <Button
                            color="gray"
                            onClick={handleCloseModalEdit}
                            className="px-4 py-2 rounded-md border border-gray-300"
                        >
                            Cancelar
                        </Button>
                    </div>
                </form>
            </main>
        </div>
    );
}
