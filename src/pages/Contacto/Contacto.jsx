import { useEffect } from "react";
import { useStore } from "../../store/useStore";
import CardContacto from "../../components/PagesComponents/Contactos/CardContacto";
import { IoFilterSharp } from "react-icons/io5";
import useTheme from "../../components/Hooks/useTheme";
import Button from "../../components/PagesComponents/Inicio/Button/Button";

export default function Contacto() {
    const { listContacto, fetchContactList } = useStore((state) => ({
        listContacto: state.listContacto,
        fetchContactList: state.fetchContactList,
    }));
    const { styleDarkHome } = useTheme();

    useEffect(() => {
        const url = "http://localhost:5000/api/contacts?userId=66e32f2648ce6527d50c5557";
        fetchContactList(url);
    }, [fetchContactList]);

    return (
        <div className={`w-screen h-screen ${styleDarkHome}`}>
            <main className={`h-auto flex flex-col justify-center items-center gap-5 ${styleDarkHome}`}>
                <header className={`w-screen p-4 flex justify-between ${styleDarkHome}`}>
                    <h1 className="font-semibold text-xl">Contacto</h1>
                    <IoFilterSharp size={30} className="cursor-pointer" />
                </header>
                <section className="flex flex-col gap-5 p-5 w-screen">
                    {listContacto.map((contacto, i) => (
                        <CardContacto key={i} nombre={contacto.nombre} telefono={contacto.telefono} notas={contacto.notas} />
                    ))}
                </section>

                <Button name="Nuevo préstamo" style="mb-6 flex m-auto" handle={''} />
            </main>
        </div>
    );
}
