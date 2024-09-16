import PropTypes, { number } from 'prop-types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RiDeleteBinLine } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import useTheme from '../../../Hooks/useTheme';
import Range from "../../Inicio/Range/Range";
import { useStore } from '../../../../store/useStore';

export default function DetallesCard({ obj, id }) {
    const { descripcion, estadoPrestamo, montoPagado, montoTotal, nombreContacto, nroPrestamo, porcentajeCumplido } = obj;
    const [isEditing, setIsEditing] = useState(false);
    const [showNota, setShowNota] = useState(false);
    const { darkCard } = useTheme();
    const { handleSubmit, register, reset, setFocus } = useForm();
    const EditDetalles = useStore(state => state.EditDetalles);

    const restante = montoTotal - montoPagado;

    useEffect(() => {
        if (isEditing) {
            setFocus('nombreContacto');
        }
    }, [isEditing, setFocus]);

    useEffect(() => {
        reset({ nombreContacto, estadoPrestamo, montoTotal, montoPagado, descripcion });
    }, [nombreContacto, estadoPrestamo, montoTotal, montoPagado, descripcion, reset]);

    const handleChange = (data => {
        EditDetalles(id, data);
    })

    return (
        <article className={`flex flex-col p-2 w-11/12 rounded-md cardStyle m-auto ${darkCard} mt-3`}>
            <div className="flex justify-between">
                <h2>Prestamo Nº {nroPrestamo}</h2>
                <div className="flex gap-6">
                    <button onClick={() => setIsEditing(prev => !prev)}>
                        <CiEdit className="size-6 cursor-pointer" />
                    </button>
                    <RiDeleteBinLine className="size-6 cursor-pointer" />
                </div>
            </div>
            <div>
                <form onSubmit={handleSubmit(handleChange)} className="flex flex-col p-2 gap-2">
                    <label htmlFor="nombreContacto">
                        Contacto:{' '}
                        <input type="text" {...register("nombreContacto")} className="bg-transparent border-none" />
                    </label>
                    <label htmlFor="estadoPrestamo">
                        Tipo:
                        <input type="text" {...register("estadoPrestamo")} className="bg-transparent border-none" />
                    </label>
                    <label htmlFor="montoTotal">
                        Total prestado: $
                        <input type="number" {...register("montoTotal")} className="bg-transparent border-none" />
                    </label>
                    <label htmlFor="montoPagado">
                        Total cobrado: $
                        <input type="number" {...register("montoPagado")} className="bg-transparent border-none" />
                    </label>
                    <label htmlFor="restante">
                        Restante: ${restante}
                    </label>

                    <h4>Porcentaje Cumplido</h4>
                    <Range
                        nameInput="Pedidos"
                        TotalPago={montoPagado}
                        Totaldeuda={montoTotal}
                        porcentaje={porcentajeCumplido}
                        color1={estadoPrestamo !== 'dado' ? '3EBDAf' : 'F77B73'}
                        color2="E2E8F0"
                    />

                    <span className="flex justify-between">
                        <ins onClick={() => setShowNota(prev => !prev)} className="cursor-pointer"> Ver Nota </ins>
                    </span>
                    <div className={`overflow-hidden transition-all duration-500 ease-out ${showNota ? 'max-h-60' : 'max-h-0'}`}>
                        <label htmlFor="descripcion" className="flex">
                            Descripción:
                            <textarea {...register("descripcion")} className="bg-transparent w-4/5 pl-2" />
                        </label>
                    </div>
                    {isEditing && <button type="submit" className="p-2 cursor-pointer m-auto">Guardar</button>}
                </form>
            </div>
        </article>
    );
}

DetallesCard.propTypes = {
    obj: PropTypes.shape({
        descripcion: PropTypes.string,
        montoPagado: PropTypes.number,
        montoTotal: PropTypes.number,
        nombreContacto: PropTypes.string,
        nroprestamo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        porcentajeCumplido: PropTypes.number,
    }).isRequired,
};
