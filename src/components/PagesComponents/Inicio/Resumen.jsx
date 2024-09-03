import Range from "./Range/Range";


export default function Resumen({ deben, debo, valorDeben, valorDebo }) {
    return (
        <section className=" flex flex-col justify-start p-4 gap-3 w-11/12 m-auto">
            <h1 className="font-semibold text-xl">Resumen</h1>
            <div className=" flex flex-col">
                <h2 className="font-normal">Me deben <strong>${new Intl.NumberFormat("es-AR").format(deben)} ARS</strong></h2>
                <p className="text-xs">Porcentaje cobrado</p>
                <Range nameInput='cobrado' valor={valorDeben} deuda={deben} color1='3EBDAF' color2='ece3e300' />
            </div>
            <div>
                <h2 className="font-normal">Debo <strong>${new Intl.NumberFormat("es-AR").format(debo)} ARS</strong></h2>
                <p className="text-xs">Porcentaje pagado</p>
                <Range nameInput='cobrado' valor={valorDebo} deuda={debo} color1='F77B73' color2='ece3e300' />
            </div>

            <button className="border border-slate-900 border-[1px] w-50 p-2  m-auto rounded-md text-sm font-semibold">Lista de prestamos </button>

        </section>
    )
}
