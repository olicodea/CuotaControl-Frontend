import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RiDeleteBinLine } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import useTheme from '../../../Hooks/useTheme';
import Range from "../../Inicio/Range/Range";
import { useStore } from '../../../../store/useStore';
import { useNavigate } from "react-router-dom"
import useAlert from '../../../Hooks/useAlert';
const apiUrl = import.meta.env.VITE_API_BASE_URL
const prestamoDelete = import.meta.env.VITE_PRESTAMOS_ENDPOINT

export default function DetallesCard({ obj }) {
    const { nombreContacto, monto, totalCobrado, porcentajeCumplido, nroPrestamo, tipo, id } = obj;

    const [isEditing, setIsEditing] = useState(false);
    const [showNota, setShowNota] = useState(false);
    const { darkCard } = useTheme();
    const { handleSubmit, register, reset, setFocus } = useForm();
    const { EditDetalles, deleteItem } = useStore(state => ({ EditDetalles: state.EditDetalles, deleteItem: state.deleteItem }));
    const navigate = useNavigate()
    const { alertConfirm } = useAlert()

    const restante = monto - totalCobrado;

    useEffect(() => {
        if (isEditing) {
            setFocus('tipo');
        }
    }, [isEditing, setFocus]);

    useEffect(() => {
        reset({ nombreContacto, tipo, monto, totalCobrado });
    }, [nombreContacto, tipo, monto, totalCobrado, reset]);

    const handleChange = (data) => {
        const url = `${apiUrl}/api${prestamoDelete}`

        EditDetalles(url, id, data);
        setIsEditing(false);
    };

    const handleClickDelete = async () => {
        const urlDelete = `${apiUrl}/api${prestamoDelete}?loanId=${id}`;
        const isConfirm = await alertConfirm()
        const isDelete = await deleteItem(id, urlDelete, isConfirm)
        if (isDelete) {
            navigate('/prestamos')
        }
    };


    return (
        <article className={`flex flex-col p-2 w-11/12 rounded-md cardStyle m-auto ${darkCard} mt-3`}>
            <div className="flex justify-between">
                <h2>Prestamo Nº {nroPrestamo}</h2>
                <div className="flex gap-6">
                    <button onClick={() => setIsEditing(prev => !prev)}>
                        <CiEdit className="size-6 cursor-pointer" />
                    </button>
                    <RiDeleteBinLine className="size-6 cursor-pointer" onClick={handleClickDelete} />
                </div>
            </div>
            <div>
                <form onSubmit={handleSubmit(handleChange)} className="flex flex-col p-2 gap-2">
                    <label htmlFor="nombreContacto">
                        Contacto: {' '}
                        <input type="text" {...register("nombreContacto")} disabled className="bg-transparent border-none" />
                    </label>
                    <label htmlFor="tipo">
                        Tipo: {' '}
                        <select type="select" {...register("tipo")} disabled={!isEditing} className={`bg-transparent border-none ${isEditing ? '' : 'appearance-none '}`} >
                            <option value="prestado" >Prestado</option>
                            <option value="pedido">Pedido</option>
                        </select>
                    </label>
                    <label htmlFor="monto">
                        Total prestado: $
                        <input type="number" {...register("monto")} disabled className="bg-transparent border-none" />
                    </label>
                    <label htmlFor="totalCobrado">
                        Total cobrado: $
                        <input type="number" {...register("totalCobrado")} disabled className="bg-transparent border-none" />
                    </label>
                    <label htmlFor="restante">
                        Restante: ${restante}
                    </label>

                    <h4>Porcentaje Cumplido</h4>
                    <Range
                        nameInput="Pedidos"
                        TotalPago={totalCobrado}
                        Totaldeuda={monto}
                        porcentaje={porcentajeCumplido}
                        color1={tipo !== 'dado' ? '3EBDAf' : 'F77B73'}
                        color2="E2E8F0"
                    />

                    <span className="flex justify-between">
                        <ins onClick={() => setShowNota(prev => !prev)} className="cursor-pointer"> Ver Nota </ins>
                    </span>
                    <div className={`overflow-hidden transition-all duration-500 ease-out ${showNota ? 'max-h-60' : 'max-h-0'}`}>
                        <label htmlFor="descripcion" className="flex">
                            Descripción:
                            <textarea {...register("descripcion")} disabled={!isEditing} className="bg-transparent w-4/5 pl-2" />
                        </label>
                    </div>
                    {isEditing && <button type="submit" className="p-2 cursor-pointer m-auto">Guardar</button>}
                </form>
            </div>
        </article>
    );
}

