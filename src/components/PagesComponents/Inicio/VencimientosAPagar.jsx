
import { useStore } from '../../../store/useStore'
import useTheme from '../../Hooks/useTheme';
import Card from './Card/Card'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CardSeeAll from './Card/CardSeeAll';


export default function VencimientosAPagar() {
    const { vencimientosDeuda } = useStore(state => state.getData)

    const dataVencimientosDeuda = Array.isArray(vencimientosDeuda) ? vencimientosDeuda : [];
    const { pDark } = useTheme()
    const settings = {
        className: "center",
        centerMode: false,
        infinite: false,
        centerPadding: "0px",
        slidesToShow: 2,
        speed: 500,
        rows: 1,
        slidesPerRow: 1,
        nextArrow: 0,
        prevArrow: 0,
    };


    return (
        <section className='h-auto  w-screen m-auto '>
            <h2 className='font-semibold text-xl pl-4'>Próximos vencimientos a pagar</h2>
            <div className=' slider-container '>

                <Slider {...settings} className=' flex h-40 w-screen  m-auto p-3 '>


                    {
                        dataVencimientosDeuda.length > 0 ?
                            dataVencimientosDeuda.slice(0, 4).map((prop, index) => {
                                const { nroPrestamo, cuotaNro, fechaVencimiento } = prop

                                return <Card title={nroPrestamo} cuota={cuotaNro} fecha={fechaVencimiento} key={index} />
                            }) : <span className={`m-auto text-sm p-5 text bord ${pDark}`}>No tienes préstamos vigentes.</span>
                    }
                    <CardSeeAll title='Ver todos' />


                </Slider>


            </div>
        </section>
    )

}
