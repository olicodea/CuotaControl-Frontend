import useTheme from '../../../Hooks/useTheme';
import { RiDeleteBinLine } from "react-icons/ri";
import PropTypes from 'prop-types';
import Range from "../../Inicio/Range/Range";
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';


export default function DetallesCard({ obj = {} }) {
    const [nota, setNota] = useState(false);
    const { darkCard } = useTheme();
    const { handleSubmit, register } = useForm()

    const [isFocused, setIsFocused] = useState(false)

    const inputRef = useRef(false)
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const restante = obj.montoTotal - obj.montoPagado;

    const handleChange = (data) => {
        console.log(data)
    };



    return (
        <article className={`flex flex-col p-2 w-11/12 rounded-md cardStyle m-auto ${darkCard} mt-3`}>
            <div className={`justify-between flex`}>
                <h2>Prestamo Nº {obj.nroPrestamo}</h2>
                <div className='flex gap-6'>
                    <RiDeleteBinLine className='size-6 cursor-pointer' />
                </div>
            </div>
            <div >
                <form onSubmit={handleSubmit(handleChange)} className='flex flex-col justify-start p-2 gap-2' >
                    <article>
                        <label>
                            Contacto:
                            <input
                                type="text"
                                name="nombre"
                                {...register("nombre")}
                                className='bg-transparent'
                                ref={inputRef}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />

                        </label>
                        <label>
                            Tipo: <input
                                type="text"
                                name="estado"
                                {...register("estado")}
                                className='bg-transparent'
                                ref={inputRef}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                        </label>
                    </article>
                    <article>
                        <label>
                            Total prestado: $
                            <input
                                type="text"
                                name="prestado"
                                {...register("prestado")}
                                className='bg-transparent'
                                ref={inputRef}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                        </label>
                        <label>
                            Total cobrado: $
                            <input
                                type="text"
                                name="cobrado"
                                {...register("cobrado")}
                                className='bg-transparent'
                                ref={inputRef}
                                onFocus={handleFocus}
                                onBlur={handleBlur}

                            />
                        </label>
                        <label>
                            Restante: $
                            <input
                                type="text"
                                name="restante"
                                value={restante}
                                disabled
                                className='bg-transparent'

                            />
                        </label>
                    </article>

                    <h4>Porcentaje Cumplido</h4>
                    <Range
                        nameInput='Pedidos'
                        TotalPago={obj.montoPagado}
                        Totaldeuda={obj.montoTotal}
                        porcentaje={obj.porcentajeCumplido}
                        color1={obj.estadoPrestamo !== 'dado' ? '3EBDAf' : 'F77B73'}
                        color2={'E2E8F0'}
                    />

                    <span className='justify-between flex'>
                        <ins onClick={() => setNota(!nota)} className='cursor-pointer'> Ver Nota </ins>

                    </span>
                    <div className={`overflow-hidden transition-all duration-500 ease-out ${nota ? 'max-h-60' : 'max-h-0'}`}>
                        <label>
                            Descripción:
                            <input
                                type="text"
                                name="descripcion"
                                {...register("descripcion")}
                                className='bg-transparent'
                                ref={inputRef}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                        </label>
                    </div>
                    <input type="submit" value="Guardar" className={`p-2 ${isFocused ? 'block' : 'hidden'}`} />
                </form>
            </div>
        </article>
    )

}
DetallesCard.propTypes = {
    obj: PropTypes.shape({
        nroPrestamo: PropTypes.number.isRequired,
        nombreContacto: PropTypes.string.isRequired,
        porcentajeCumplido: PropTypes.number.isRequired,
        estadoPrestamo: PropTypes.string.isRequired,
        montoTotal: PropTypes.number.isRequired,
        montoPagado: PropTypes.number.isRequired,
    }).isRequired,
};
