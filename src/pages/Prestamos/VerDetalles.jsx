import { Link, useParams } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { useEffect } from 'react';
import DetallesCard from '../../components/PagesComponents/Prestamos/DetallesCard/DetallesCard';
import CardCuotas from './CardCuotas';
import { IoIosArrowBack } from 'react-icons/io';
import { useGenerarArrayHasta } from '../../components/Hooks/useGenerarArrayHasta';
import useTheme from '../../components/Hooks/useTheme';


export default function VerDetalles() {
    const { id } = useParams();
    const { styleDarkHome } = useTheme()

    const { fetchDetalles, getDetalles } = useStore((state) => ({
        fetchDetalles: state.fetchDetalles,
        getDetalles: state.getDetalles,
    }));

    useEffect(() => {
        fetchDetalles('/services/Detalles.json');
    }, [fetchDetalles]);

    const responseDetalles = getDetalles(Number(id)) || [];
    const { cuotas = {}, vencimientos = [] } = responseDetalles;
    const cuotasTotal = useGenerarArrayHasta(cuotas.total);

    return (
        <div className={`flex flex-col gap-5 ${styleDarkHome}`}>
            <section className='flex flex-col justify-center items-start'>
                <h1 className='pl-4 p-2'>Detalles</h1>
                <DetallesCard obj={responseDetalles} />
            </section>

            <section className='flex flex-col justify-center items-start'>
                <h2 className='pl-4 p-2'>Cuotas:  {cuotas.total}</h2>

                <div className='snap-proximity snap-y overflow-y-auto h-96 p-2 border-t m-auto'>
                    {
                        cuotasTotal.map((cuota) => (
                            <CardCuotas key={cuota} cuota={`${cuota}/${cuotas.total}`} vencimientos={vencimientos} />
                        ))
                    }
                </div>

            </section>
            <footer className='p-3'>
                <Link to='/prestamos' className="flex  items-center cursor-pointer"><IoIosArrowBack /> Vovler Atras</Link>
            </footer>
        </div>
    );
}
