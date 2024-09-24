import { Link, useParams } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { useEffect, useState } from 'react';
import DetallesCard from '../../components/PagesComponents/Prestamos/DetallesCard/DetallesCard';
import CardCuotas from './CardCuotas';
import { IoIosArrowBack } from 'react-icons/io';
import useTheme from '../../components/Hooks/useTheme';
import { IoFilterSharp } from "react-icons/io5";
import CheckBox from '../../components/PagesComponents/Prestamos/CheckBox/CheckBox';
import useFiltrarCuotas from '../../components/Hooks/useFiltrarCuotas';

const apiUrl = import.meta.env.VITE_API_BASE_URL;
const prestamosDetailEnpoint = import.meta.env.VITE_PRESTAMOS_DETAIL_ENDPOINT;

export default function VerDetalles() {
    const { id } = useParams();


    const { styleDarkHome } = useTheme();
    const [openCheck, setOpenCheck] = useState(false);
    const [valueCheck, setValueCheck] = useState({
        pendiente: false,
        pagada: false
    });

    const { fetchDetalles, detalles, ItemPagado } = useStore(state => ({
        fetchDetalles: state.fetchDetalles,
        detalles: state.detalles,
        ItemPagado: state.ItemPagado

    }));

    useEffect(() => {

        const url = `${apiUrl}/api${prestamosDetailEnpoint}?loanId=${id}`

        fetchDetalles(url);
    }, [fetchDetalles, id]);


    const filterCuotas = useFiltrarCuotas(detalles.cuotas || [], valueCheck)

    const handleClickCheck = () => {
        setOpenCheck(prev => !prev);
    };


    const handleClickPagado = (cuotaId) => {
        ItemPagado(cuotaId)
    };

    return (
        <div className={`flex flex-col gap-5 ${styleDarkHome} h-full`}>
            <section className="flex flex-col justify-center items-start">
                <h1 className="pl-4 p-2">Detalles</h1>
                <DetallesCard obj={detalles} />
            </section>

            <section className="flex flex-col justify-center items-start">
                <div className='flex justify-between items-center w-11/12 m-auto  p-2'>
                    <h2>Cuotas: {' '}</h2>
                    <button onClick={handleClickCheck}>
                        <IoFilterSharp className={`cursor-pointer ${openCheck ? 'rotate-90' : ''}`} />
                    </button>
                </div>
                <div className={` w-11/12 m-auto rounded-md transition-max-heightD duration-700 ease-in-out overflow-hidden ${openCheck ? "max-h-[1000px]" : "max-h-0"}`}>
                    {openCheck && <CheckBox pendiente={valueCheck.pendiente} pagado={valueCheck.pagada} setValueCheck={setValueCheck} />}
                </div>

                <div className="snap-proximity snap-y overflow-y-auto h-96 p-2 border-t m-auto w-11/12">
                    {filterCuotas.map((cuota) => (
                        <CardCuotas
                            key={cuota.id}
                            id={cuota.id}
                            cuota={cuota.cuota}
                            vencimiento={cuota.fecha}
                            estado={cuota.estado}
                            monto={cuota.monto}
                            handleClickPagado={handleClickPagado}
                        />
                    ))}
                </div>
            </section>

            <footer className="p-3">
                <Link to="/prestamos" className="flex items-center cursor-pointer">
                    <IoIosArrowBack /> Atrás
                </Link>
            </footer>
        </div>
    );
}
