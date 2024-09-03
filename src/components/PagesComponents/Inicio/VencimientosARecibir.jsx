
import Card from './Card/Card'

export default function VencimientosARecibir() {
    return (
        <section className='h-auto  w-12/12 m-auto'>
            <h2 className='font-semibold text-xl pl-4'>Próximos vencimientos a recibir</h2>
            <div className='flex gap-4 w-screen m-auto p-4'>
                <Card title='Préstamo X' cuota='4/12' fecha='25/08/2024' />
                <Card title='Préstamo Y' cuota='2/6' fecha='26/08/2024' />
            </div>
        </section>
    )
}
