import Button from "./Button/Button";
import Range from "./Range/Range";
import useTheme from "../../Hooks/useTheme";
import { useStore } from "../../../store/useStore";
import calcularPorcentaje from "../../Hooks/usePorcentaje";


export default function Resumen() {
    const { pDark } = useTheme();
    const data = useStore(state => state.getData);
    const { totalAFavor, totalAFavorPago, totalDeuda, totalDeudaPago } = data || {};


    const porcentajeTotalAFavor = calcularPorcentaje(totalAFavorPago, totalAFavor);
    const porcentajeTotalDeuda = calcularPorcentaje(totalDeudaPago, totalDeuda);



    return (
        <section className={`flex flex-col justify-start p-4 gap-5 w-12/12 m-auto `}>
            <h1 className="font-semibold text-xl">Resumen</h1>
            <div className="flex flex-col">
                <h2 className="font-normal">Me deben <strong>${new Intl.NumberFormat("es-AR").format(totalAFavor)} ARS</strong></h2>
                {porcentajeTotalAFavor !== 100 ? <p className={`text-sm ${pDark}`}>Porcentaje cobrado</p> : <p className={`text-sm ${pDark}`}>Pago Completado</p>}

                <Range
                    nameInput='cobrado'
                    totalAFavor={totalAFavor}
                    totalAFavorPago={totalAFavorPago}
                    porcentaje={porcentajeTotalAFavor}
                    color1='3EBDAf'
                    color2={'E2E8F0'}
                />
            </div>
            <div>
                <h2 className="font-normal">Debo <strong>${new Intl.NumberFormat("es-AR").format(totalDeuda)} ARS</strong></h2>
                {porcentajeTotalDeuda !== 100 ? <p className={`text-sm ${pDark}`}>Porcentaje pagado</p> : <p className={`text-sm ${pDark}`}>Pago Completado</p>}
                <Range
                    nameInput='cobrado'
                    totalAFavor={totalDeuda}
                    totalAFavorPago={totalDeudaPago}
                    porcentaje={porcentajeTotalDeuda}
                    color1='F77B73'
                    color2={'E2E8F0'}
                />
            </div>

            <Button
                name='Lista de préstamo'
                route='prestamos'
                style='m-auto'
            />
        </section>
    );
}
