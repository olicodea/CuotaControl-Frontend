
import { useStore } from '../../../store/useStore'
import useTheme from '../../Hooks/useTheme';
import Card from './Card/Card'

export default function VencimientosAPagar() {
    const { vencimientosDeuda } = useStore(state => state.getData)

    const dataVencimientosDeuda = Array.isArray(vencimientosDeuda) ? vencimientosDeuda : [];
    const { pDark } = useTheme()

    return (
        <section className='h-auto  w-12/12 m-auto'>
            <h2 className='font-semibold text-xl pl-4'>Próximos vencimientos a pagar</h2>
            <div className='flex gap-4 w-screen m-auto p-4'>
                {
                    dataVencimientosDeuda.length > 0 ?
                        dataVencimientosDeuda.map((prop, index) => {
                            const { nroPrestamo, cuotaNro, fechaVencimiento } = prop

                            return <Card title={nroPrestamo} cuota={cuotaNro} fecha={fechaVencimiento} key={index} />
                        }) : <span className={`m-auto text-sm p-5 text bord ${pDark}`}>No tienes préstamos vigentes.</span>
                }

            </div>
        </section>
    )

}
