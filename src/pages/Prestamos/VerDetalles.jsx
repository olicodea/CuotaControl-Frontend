import { Link, useParams } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { useEffect, useState } from 'react';
import DetallesCard from '../../components/PagesComponents/Prestamos/DetallesCard/DetallesCard';
import CardCuotas from './CardCuotas';
import { IoIosArrowBack } from 'react-icons/io';
import { useGenerarArrayHasta } from '../../components/Hooks/useGenerarArrayHasta';
import useTheme from '../../components/Hooks/useTheme';
const API_DETALLES = '/services/Detalles.json';
import { IoFilterSharp } from "react-icons/io5";
import CheckBox from '../../components/PagesComponents/Prestamos/CheckBox/CheckBox';


export default function VerDetalles() {
    const { id } = useParams();
    const { styleDarkHome } = useTheme();
    const [openCheck, setOpenCheck] = useState(false)

    const { fetchDetalles, getDetalles, } = useStore((state) => ({
        fetchDetalles: state.fetchDetalles,
        getDetalles: state.getDetalles,

    }));


    useEffect(() => {
        fetchDetalles(API_DETALLES);
    }, [fetchDetalles]);

    const resDetalles = getDetalles(Number(id)) || {};
    const { cuotas = {}, vencimientos = [] } = resDetalles;
    const cuotasTotal = useGenerarArrayHasta(cuotas.total || 0);

    const handleClickCheck = () => {
        setOpenCheck(prev => !prev)
    }


    return (
        <div className={`flex flex-col gap-5 ${styleDarkHome} h-full`}>
            <section className="flex flex-col justify-center items-start">
                <h1 className="pl-4 p-2">Detalles</h1>

                <DetallesCard obj={resDetalles} id={id} />

            </section>

            <section className="flex flex-col justify-center items-start">
                <div className='flex justify-between items-center w-11/12 m-auto bg-slate-500  p-2'>
                    <h2 >Cuotas: {cuotas.total || 0}</h2>

                    <button onClick={handleClickCheck}><IoFilterSharp className={`cursor-pointer ${openCheck ? 'rotate-90' : ''}`} /></button>
                </div>
                <div className={` rounded-md transition-max-heightD duration-700 ease-in-out overflow-hidden ${openCheck ? "max-h-[1000px]" : "max-h-0"
                    }`}>
                    {openCheck && <CheckBox openCheck={openCheck} />}
                </div>



                <div className="snap-proximity snap-y overflow-y-auto h-96 p-2 border-t m-auto w-11/12">
                    {cuotasTotal.map((cuota, i) => (
                        <div key={i} className="cuota-group">
                            {vencimientos.map((vencimientoDeuda, j) => {
                                const { estado, fecha, monto } = vencimientoDeuda;
                                return (
                                    <CardCuotas
                                        key={j}
                                        couta={`${cuota}/${cuotasTotal.length}`}
                                        vencimiento={fecha}
                                        estado={estado}
                                        monto={monto}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>
            </section >

            <footer className="p-3">
                <Link to="/prestamos" className="flex items-center cursor-pointer">
                    <IoIosArrowBack /> Atrás
                </Link>
            </footer>
        </div >
    );
}
