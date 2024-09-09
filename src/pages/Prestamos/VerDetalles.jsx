import { useParams } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { useEffect } from 'react';
import DetallesCard from '../../components/PagesComponents/Prestamos/DetallesCard/DetallesCard';
import CardCuotas from './CardCuotas';

export default function VerDetalles() {
    const { id } = useParams(); // Destructuring directly

    const { fetchDetalles, getDetalles } = useStore((state) => ({
        fetchDetalles: state.fetchDetalles,
        getDetalles: state.getDetalles,
    }));

    useEffect(() => {
        fetchDetalles('/services/Detalles.json');
    }, [fetchDetalles]);

    const responseDetalles = getDetalles(Number(id)) || [];
    const { cuotas = {}, vencimientos = [] } = responseDetalles;


    function generarArrayHasta(numero) {
        const array = [];
        for (let i = 1; i <= numero; i++) {
            array.push(i);
        }
        return array;
    }

    const cuotasTotal = generarArrayHasta(cuotas.total);

    return (
        <div className='flex flex-col gap-5'>
            <section className='flex flex-col justify-center items-start'>
                <h1 className='pl-4 p-2'>Detalles</h1>
                <DetallesCard obj={responseDetalles} />
            </section>

            <section className='flex flex-col justify-center items-start'>
                <h2 className='pl-4 p-2'>Cuotas:  {cuotas.total}</h2>
                {
                    cuotasTotal.map((cuota) => (

                        <CardCuotas key={cuota} cuota={`${cuota}/${cuotas.total}`} vencimientos={vencimientos} />
                    ))
                }
            </section>
        </div>
    );
}
