import Button from "./Button/Button";
import Range from "./Range/Range";
import useTheme from "../../Hooks/useTheme";


export default function Resumen({ deben, debo, valorDeben, valorDebo }) {

    const { darkResumen, pDark } = useTheme()

    return (
        <section className={`flex flex-col justify-start p-4 gap-5 w-12/12 m-auto `}>
            <h1 className="font-semibold text-xl">Resumen</h1>
            <div className=" flex flex-col">
                <h2 className="font-normal">Me deben <strong>${new Intl.NumberFormat("es-AR").format(deben)} ARS</strong></h2>
                <p className={`text-sm t ${pDark}`}>Porcentaje cobrado</p>
                <Range nameInput='cobrado' valor={valorDeben} deuda={deben} color1='3EBDAf' color2={'E2E8F0'} />
            </div>
            <div>
                <h2 className="font-normal">Debo <strong>${new Intl.NumberFormat("es-AR").format(debo)} ARS</strong></h2>
                <p className={`text-sm  ${pDark}`}>Porcentaje pagado</p>
                <Range nameInput='cobrado' valor={valorDebo} deuda={debo} color1='F77B73' color2='E2E8F0' />
            </div>

            <Button name='Lista de préstamo' style={`${darkResumen} border border-slate-900 border-[1px] w-50 p-2  m-auto rounded-md text-sm font-semibold`} />

        </section>
    )
}
