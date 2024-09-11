import Button from "../../components/PagesComponents/Inicio/Button/Button";
import Resumen from "../../components/PagesComponents/Inicio/Resumen";
import VencimientosAPagar from "../../components/PagesComponents/Inicio/VencimientosAPagar";
import VencimientosARecibir from "../../components/PagesComponents/Inicio/VencimientosARecibir";
import useTheme from "../../components/Hooks/useTheme";
import { useEffect } from "react";
import { useStore } from "../../store/useStore";
const API_URL = import.meta.env.VITE_API_URL
const ENDPOINT = import.meta.env.VITE_HOME_ENDPOINT
// const query = import.meta.env.VITE_QUERY

export default function Home() {
    const { styleDarkHome } = useTheme()
    const { fetchData } = useStore()

    useEffect(() => {

        fetchData(`${API_URL}${ENDPOINT}`)


    }, [fetchData])

    return (
        <main className={`${styleDarkHome} h-auto`}>
            <Resumen />
            <section >
                <VencimientosARecibir />
                <VencimientosAPagar />
            </section>
            <div className="flex justify-center">
                <Button name='Nuevo préstamo' style={'mb-6'} />
            </div>
        </main>
    )
}
