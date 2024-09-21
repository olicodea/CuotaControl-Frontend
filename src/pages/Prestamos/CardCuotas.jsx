import useTheme from "../../components/Hooks/useTheme";
import Button from "../../components/PagesComponents/Inicio/Button/Button";
import { GrRevert } from "react-icons/gr";

const CardCuotas = ({ cuota, vencimiento, estado, monto }) => {
    console.log(estado)

    const { darkCard } = useTheme();

    return (
        <article className={`flex flex-col p-2 w-11/12 rounded-md cardStyle m-auto ${darkCard} mt-3 gap-4 snap-center`}>
            <div className="flex flex-col justify-center items-start p-2">
                <h3>{cuota}</h3>
                <ul>
                    <li>
                        Fecha: {vencimiento}
                    </li>
                    <li>
                        Estado: {estado}
                    </li>
                    <li>
                        Monto: {monto}
                    </li>

                </ul>
            </div>
            <Button
                name={estado === 'pagada' ? (
                    <div className="flex items-center justify-center gap-1">


                        Revertir
                        <GrRevert className="" size={15} />
                    </div>
                ) : 'Marcar pagado'}
                style='w-32 m-auto'
                route=''
            />
        </article>
    );
};


export default CardCuotas;
