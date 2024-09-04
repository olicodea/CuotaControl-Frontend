
import { useStore } from '../../../store/useStore'
import Card from './Card/Card'

export default function VencimientosAPagar() {
    const { vencimientosDeuda } = useStore(state => state.getData)

    const dataVencimientosDeuda = Array.isArray(vencimientosDeuda) ? vencimientosDeuda : [];
    console.log(vencimientosDeuda)
    return (
        <section className='h-auto  w-12/12 m-auto'>
            <h2 className='font-semibold text-xl pl-4'>Próximos vencimientos a pagar</h2>
            <div className='flex gap-4 w-screen m-auto p-4'>
                {
                    dataVencimientosDeuda.map((prop, index) => {
                        const { nroPrestamo, cuotaNro, fechaVencimiento } = prop

                        return <Card title={nroPrestamo} cuota={cuotaNro} fecha={fechaVencimiento} key={index} />
                    })
                }

            </div>
        </section>
    )

}
