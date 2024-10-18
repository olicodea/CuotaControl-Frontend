import { IoMdClose } from "react-icons/io";
import Button from "../Inicio/Button/Button";

export default function FormContacto({ handleChangeData, register, handleSubmit, errors, close }) {

    const styleErrors = 'text-red-500 text-sm justify-center items-center flex';

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <main className="relative bg-white rounded-lg shadow-md p-6 w-10/12 max-w-md flex flex-col">
                <button
                    onClick={close}
                    className="absolute right-1 top-1 p-2"
                >
                    <IoMdClose size={20} />
                </button>
                <h1 className="text-2xl font-semibold text-center mb-4">Nuevo contacto</h1>

                <form className="flex flex-col gap-3" onSubmit={handleSubmit(handleChangeData)}>

                    {/* Nombre */}
                    <label htmlFor="nombre" className="flex flex-col">
                        <span>Nombre:</span>
                        <input
                            type="text"
                            className="border border-gray-300 rounded p-2"
                            placeholder="Ingresa el nombre"
                            {...register("nombre", {
                                required: "El nombre es requerido",
                                minLength: {
                                    value: 3,
                                    message: "El nombre debe tener al menos 3 caracteres"
                                }
                            })}
                        />
                        {errors.nombre && <p className={styleErrors}>{errors.nombre.message}</p>}
                    </label>

                    {/* Teléfono */}
                    <label htmlFor="telefono" className="flex flex-col">
                        <span>Teléfono:</span>
                        <input
                            type="text"
                            id="telefono"
                            className="border border-gray-300 rounded p-2"
                            placeholder="Ingresa el teléfono"
                            {...register("telefono", {
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "El teléfono solo debe contener números"
                                }
                            })}
                        />
                        {errors.telefono && <p className={styleErrors}>{errors.telefono.message}</p>}
                    </label>

                    {/* Email */}
                    <label htmlFor="email" className="flex flex-col">
                        <span>Email:</span>
                        <input
                            type="text"
                            id="email"
                            className="border border-gray-300 rounded p-2"
                            placeholder="Ingresa el email"
                            {...register("email", {
                                required: "El email es requerido",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: "Ingresa un email válido"
                                }
                            })}
                        />
                        {errors.email && <p className={styleErrors}>{errors.email.message}</p>}
                    </label>

                    {/* Notas */}
                    <label htmlFor="notas" className="flex flex-col">
                        <span>Notas:</span>
                        <textarea
                            id="notas"
                            className="border border-gray-300 rounded p-2"
                            placeholder="Ingresa notas adicionales"
                            {...register("notas", {
                                maxLength: {
                                    value: 200,
                                    message: "Las notas no deben exceder los 200 caracteres"
                                }
                            })}
                        />
                        {errors.notas && <p className={styleErrors}>{errors.notas.message}</p>}
                    </label>

                    {/* Botón Agregar */}
                    <Button
                        type="submit"
                        style="mb-6 flex m-auto pl-5 pr-5"
                        name='Agregar'
                    />

                </form>
            </main>
        </div>
    );
}
