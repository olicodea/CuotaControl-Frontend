import useTheme from '../../../Hooks/useTheme';
import { RiDeleteBinLine } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import PropTypes from 'prop-types';

import Range from "../../Inicio/Range/Range"
import { useState } from 'react';

export default function DetallesCard({ obj = {} }) {
    const [nota, setNota] = useState(false)
    const { darkCard } = useTheme()
    const { nroPrestamo, nombreContacto, porcentajeCumplido, estadoPrestamo, montoTotal, montoPagado, descripcion } = obj;

    const restante = montoTotal - montoPagado;

    return <article className={`flex flex-col p-2 w-11/12 rounded-md cardStyle  m-auto ${darkCard} mt-3`}>
        <div className={`justify-between flex`}>
            <h2>Prestamo Nº {nroPrestamo}</h2>
            <div className='flex gap-6'>
                <CiEdit className='size-6' />
                <RiDeleteBinLine className='size-6' />

            </div>

        </div>
        <div className='flex flex-col justify-start p-2 gap-2'>
            <article>
                <h3>Contacto: {nombreContacto}</h3>
                <h4>Tipo: Entrengado</h4>
            </article>
            <article>
                <h5>Total prestado: ${montoTotal}</h5>
                <h5>Total cobrado: ${montoPagado}</h5>
                <h5>Restante por cobrar: ${restante}</h5>
            </article>


            <h4 >PorcentajeCumplido</h4>
            <Range nameInput='Pedidos' TotalPago={montoPagado} Totaldeuda={montoTotal} porcentaje={porcentajeCumplido} color1={estadoPrestamo !== 'dado' ? '3EBDAf' : 'F77B73'}
                color2={'E2E8F0'} />


            <ins onClick={() => setNota(!nota)} className='cursor-pointer'> Ver Nota </ins>
            <div className={`overflow-hidden transition-all duration-500 ease-out ${nota ? 'max-h-40' : 'max-h-0'}`}>
                <span>{descripcion}</span>
            </div>
        </div>



    </article >


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

