
import { useStore } from '../../../store/useStore'
import Card from './Card/Card'

export default function VencimientosARecibir() {
    const { vencimientosAFavor } = useStore(state => state.getData)
    const vencimientosData = Array.isArray(vencimientosAFavor) ? vencimientosAFavor : [];

    return (
        <section className='h-auto  w-12/12 m-auto'>
            <h2 className='font-semibold text-xl pl-4'>Próximos vencimientos a recibir</h2>
            <div className='flex gap-4 w-screen m-auto p-4'>
                {
                    vencimientosData.map((prop, index) => { //verificar este index , le tengo que padar el id cuando lo generemos.
                        const { nroPrestamo, cuotaNro, fechaVencimiento } = prop;

                        return <Card title={nroPrestamo} cuota={cuotaNro} fecha={fechaVencimiento} key={index} />
                    })

                }

            </div>
        </section>
    )
}
