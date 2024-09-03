import Resumen from "../../components/PagesComponents/Inicio/Resumen";
import VencimientosAPagar from "../../components/PagesComponents/Inicio/VencimientosAPagar";
import VencimientosARecibir from "../../components/PagesComponents/Inicio/VencimientosARecibir";


export default function Home() {
    return (
        <main>
            <Resumen deben={154023033} debo={50023033} valorDeben={40} valorDebo={12} />
            <VencimientosARecibir />
            <VencimientosAPagar />

            <button className="border-solid bg-slate-50">Nuevo préstamo</button>

        </main>
    )
}
