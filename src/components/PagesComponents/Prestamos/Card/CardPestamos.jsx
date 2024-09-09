
import useTheme from '../../../Hooks/useTheme'
import Button from '../../Inicio/Button/Button'
import Range from '../../Inicio/Range/Range'

export default function CardPestamos({ nombreContacto, nroPrestamo, porcentajeCumplido, estadoPrestamo, id }) {
    const { darkCard } = useTheme()


    return (
        <article className={`flex flex-col p-2 w-11/12 rounded-md cardStyle  m-auto hover:scale-105 transition-transform duration-500 ${darkCard} mt-3`}>
            <div className={`justify-between flex`}>
                <h2>Prestamo Nº {nroPrestamo}</h2>
                <Button name='Ver detalles' route={`/ver-detalles/${id}`} />
            </div>
            <h3 className='pl-2'>{nombreContacto}</h3>
            {porcentajeCumplido > 99 ? <p className='text-xs pl-2 p-1'>Pago Completado</p> : <p className='text-xs pl-2 p-1'>Poncentaje</p>}
            <Range nameInput='Pedidos' TotalPago={porcentajeCumplido} Totaldeuda={450} porcentaje={porcentajeCumplido} color1={estadoPrestamo !== 'dado' ? '3EBDAf' : 'F77B73'}
                color2={'E2E8F0'} />

        </article>
    )
}





