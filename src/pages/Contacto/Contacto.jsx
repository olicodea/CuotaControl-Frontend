import { useCallback, useEffect, useState } from "react";
import { useStore } from "../../store/useStore";
import CardContacto from "../../components/PagesComponents/Contactos/CardContacto";
import { IoFilterSharp } from "react-icons/io5";
import useTheme from "../../components/Hooks/useTheme";
import Button from "../../components/PagesComponents/Inicio/Button/Button";
import FormContacto from "../../components/PagesComponents/Contactos/Form";
import { useForm } from "react-hook-form";
import { Slide, toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../Contacto/StyleContacto.css'

const url = import.meta.env.VITE_API_BASE_URL
const userId = import.meta.env.VITE_USER_ID;
const contactsUrl = import.meta.env.VITE_CONTACTOS_ENPOINT


export default function Contacto() {
    const { styleDarkHome } = useTheme();
    const { listContacto, fetchContactList, addContactoList } = useStore((state) => ({
        listContacto: state.listContacto,
        fetchContactList: state.fetchContactList,
        addContactoList: state.addContactoList
    }));

    const [openForm, setOpenForm] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    useEffect(() => {
        const url = "http://localhost:5000/api/contacts?userId=66e32f2648ce6527d50c5557";
        fetchContactList(url);
    }, [fetchContactList]);

    const handleClickOpenForm = () => {
        setOpenForm(prev => !prev);
    };

    const handleChangeData = useCallback(async (data) => {
        const uptDateContact = { ...data, userId: String(userId) }
        console.log(uptDateContact)

        const res = await addContactoList(`${url}/api${contactsUrl}`, uptDateContact)
        if (res) {
            toast.success('¡Contacto agregado exitosamente!', {
                className: "toast-message"
            });
            reset();
            setOpenForm(false);
        }






    }, [reset, addContactoList]);






    return (
        <div className={`w-screen h-screen ${styleDarkHome}`}>
            <main className={`h-auto flex flex-col justify-center items-center gap-5 ${styleDarkHome}`}>
                <header className={`w-screen p-4 flex justify-between ${styleDarkHome}`}>
                    <h1 className="font-semibold text-xl">Contacto</h1>
                    <IoFilterSharp size={30} className="cursor-pointer" />
                </header>

                <section className="flex flex-col p-2 w-screen  h-[60vh]">
                    {listContacto.map((contacto, i) => (
                        <CardContacto key={i} nombre={contacto.nombre} telefono={contacto.telefono} notas={contacto.notas} />
                    ))}
                </section>

                <Button name="Nuevo Contacto" style="mb-6 flex m-auto" handle={handleClickOpenForm} />

                {openForm && (
                    <FormContacto
                        register={register}
                        handleSubmit={handleSubmit}
                        errors={errors}
                        close={handleClickOpenForm}
                        handleChangeData={handleChangeData}
                    />
                )}

                <ToastContainer
                    position="top-right"
                    autoClose={1000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Slide}

                />
            </main>
        </div>
    );
}
