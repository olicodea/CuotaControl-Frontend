import Button from "../../components/PagesComponents/Inicio/Button/Button";
import Resumen from "../../components/PagesComponents/Inicio/Resumen";
import VencimientosAPagar from "../../components/PagesComponents/Inicio/VencimientosAPagar";
import VencimientosARecibir from "../../components/PagesComponents/Inicio/VencimientosARecibir";
import useTheme from "../../components/Hooks/useTheme";
import { useEffect } from "react";
import { useStore } from "../../store/useStore";
const API_URL = import.meta.env.VITE_API_URL
const ENDPOINT = import.meta.env.VITE_HOME_ENDPOINT


export default function Home() {
    const { styleDarkHome, darkResumen } = useTheme()
    const { fetchData } = useStore()

    useEffect(() => {

        fetchData(`${API_URL}${ENDPOINT}`)


    }, [fetchData])

    return (
        <main className={`${styleDarkHome} h-screen`}>
            <Resumen />
            <section >
                <VencimientosARecibir />
                <VencimientosAPagar />
            </section>
            <div className="flex justify-center">
                <Button name='Nuevo préstamo' />
            </div>
        </main>
    )
}
