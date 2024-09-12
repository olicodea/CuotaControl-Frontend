import useTheme from '../../../Hooks/useTheme';
import { RiDeleteBinLine } from "react-icons/ri";
import PropTypes from 'prop-types';
import Range from "../../Inicio/Range/Range";
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useStore } from '../../../../store/useStore';
import { CiEdit } from "react-icons/ci";

export default function DetallesCard({ obj = {} }) {
    const [nota, setNota] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    const { darkCard } = useTheme();
    const { handleSubmit, register } = useForm();
    const EditDetalles = useStore(state => state.EditDetalles);
    const focusRef = useRef(null);

    const restante = obj.montoTotal - obj.montoPagado;

    const handleClickFocus = () => {
        setIsFocus(true);
    };

    useEffect(() => {
        if (isFocus && focusRef.current) {
            focusRef.current.focus();
        }
    }, [isFocus]);

    const handleChange = (data) => {
        const id = obj.id;
        EditDetalles(id, data);
        setIsFocus(false);
    };

    const disabled = !isFocus;


    return (
        <article className={`flex flex-col p-2 w-11/12 rounded-md cardStyle m-auto ${darkCard} mt-3`}>
            <div className={`justify-between flex`}>
                <h2>Prestamo Nº {obj.nroPrestamo}</h2>
                <div className='flex gap-6'>
                    <button onClick={handleClickFocus}><CiEdit className='size-6 cursor-pointer' /></button>
                    <RiDeleteBinLine className='size-6 cursor-pointer' />
                </div>
            </div>
            <div>
                <form onSubmit={handleSubmit(handleChange)} className='flex flex-col justify-start p-2 gap-2'>

                    <label htmlFor='nombreContacto'>
                        Contacto:
                        <input
                            type="text"
                            {...register("nombreContacto")}
                            className='bg-transparent'
                            defaultValue={obj.nombreContacto}
                            disabled={disabled}
                            ref={focusRef}
                        />
                    </label>
                    <label htmlFor='estadoPrestamo'>
                        Tipo:
                        <input
                            type="text"
                            {...register("estadoPrestamo")}
                            className='bg-transparent'
                            defaultValue={obj.estadoPrestamo}
                            disabled={disabled}
                        />
                    </label>

                    <label htmlFor='montoTotal'>
                        Total prestado: $
                        <input
                            type="number"
                            {...register("montoTotal")}
                            className='bg-transparent'
                            defaultValue={obj.montoTotal}
                            disabled={disabled}
                        />
                    </label>
                    <label htmlFor='montoPagado'>
                        Total cobrado: $
                        <input
                            type="number"
                            {...register("montoPagado")}
                            className='bg-transparent'
                            defaultValue={obj.montoPagado}
                            disabled={disabled}
                        />
                    </label>
                    <label htmlFor='restante'>
                        Restante: $
                        <input
                            type="number"
                            value={restante}
                            disabled
                            className='bg-transparent'
                        />
                    </label>

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
                        <label htmlFor='descripcion' className='flex'>
                            Descripción: {' '}
                            <textarea
                                type="text"
                                {...register("descripcion")}
                                className='bg-transparent w-4/5 pl-2'
                                defaultValue={obj.descripcion}
                                disabled={disabled}
                            />
                        </label>
                    </div>
                    <button type="submit" className={`p-2 cursor-pointer ${isFocus ? 'flex' : 'hidden'} m-auto`} >Guardar</button>

                </form>
            </div>
        </article>
    );
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
