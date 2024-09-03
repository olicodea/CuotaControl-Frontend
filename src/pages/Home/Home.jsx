import Button from "../../components/PagesComponents/Inicio/Button/Button";
import Resumen from "../../components/PagesComponents/Inicio/Resumen";
import VencimientosAPagar from "../../components/PagesComponents/Inicio/VencimientosAPagar";
import VencimientosARecibir from "../../components/PagesComponents/Inicio/VencimientosARecibir";


export default function Home() {
    return (
        <main>
            <Resumen deben={154023033} debo={50023033} valorDeben={40} valorDebo={12} />
            <section>
                <VencimientosARecibir />
                <VencimientosAPagar />

            </section>
            <div className="flex justify-center">

                <Button name='Nuevo préstamo' style='border border-slate-900 border-[1px] w-50 p-2  m-auto rounded-md text-sm font-semibold' />
            </div>
        </main>
    )
}
