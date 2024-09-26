import Button from "../../components/PagesComponents/Inicio/Button/Button";
import Resumen from "../../components/PagesComponents/Inicio/Resumen";
import VencimientosAPagar from "../../components/PagesComponents/Inicio/VencimientosAPagar";
import VencimientosARecibir from "../../components/PagesComponents/Inicio/VencimientosARecibir";
import useTheme from "../../components/Hooks/useTheme";
import { useEffect, useState } from "react";
import { useStore } from "../../store/useStore";
import NuevoPrestamo from "../../components/PagesComponents/Inicio/FormAddPrestamo/NuevoPrestamo";
import { useForm } from "react-hook-form";

const apiUrl = import.meta.env.VITE_API_BASE_URL;
const homeEndpoint = import.meta.env.VITE_HOME_ENDPOINT;
const userId = import.meta.env.VITE_USER_ID;

const loansEndpoint = import.meta.env.VITE_PRESTAMOS_ENDPOINT


export default function Home() {
    const { styleDarkHome } = useTheme()
    const { fetchData, AddPrestamo } = useStore((state) => ({
        fetchData: state.fetchData,
        AddPrestamo: state.AddPrestamo,


    }))
    const [openForm, setOpenForm] = useState(false)
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        const url = `${apiUrl}/api${homeEndpoint}?userId=${userId}`;

        fetchData(url)

    }, [fetchData])


    const handleClickOpen = () => {
        setOpenForm(prev => !prev)
    }


    const onSubmit = data => {
        const url = `${apiUrl}/api${loansEndpoint}`;

        AddPrestamo(url, data, userId);
        setOpenForm(false)

    };


    return (
        <main className={`${styleDarkHome} h-auto`}>
            <Resumen />
            <section >
                <VencimientosARecibir />
                <VencimientosAPagar />
            </section>
            <div className="flex justify-center">

                <Button name='Nuevo préstamo' style={'mb-6'} handle={handleClickOpen} />
                {
                    openForm && <NuevoPrestamo close={handleClickOpen} register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} />
                }

            </div>
        </main>
    )
}
