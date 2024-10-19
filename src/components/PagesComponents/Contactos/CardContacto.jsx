import useTheme from '../../Hooks/useTheme'
import { RiDeleteBinLine } from 'react-icons/ri'
import useAlert from '../../Hooks/useAlert'
import { useStore } from '../../../store/useStore'
import { CiEdit } from 'react-icons/ci'
const url = import.meta.env.VITE_API_BASE_URL
const contactsUrl = import.meta.env.VITE_CONTACTOS_ENPOINT


export default function CardContacto({ nombre, telefono, email, notas, usuarioId, handleOpenModalEdit }) {

    const { darkCard, pDark } = useTheme()
    const { alertConfirm } = useAlert()
    const { deleteContact } = useStore(state => ({ deleteContact: state.deleteContact }))

    const handleDeleteContact = async () => {
        const urlContactDele = `${url}/api${contactsUrl}?contactId=${usuarioId}`;
        const isConfirm = await alertConfirm();
        if (isConfirm) {
            deleteContact(urlContactDele, usuarioId);
        }
        return;
    }




    return (
        <>
            <div className={`p-2 ${darkCard} cardStyle m-auto w-11/12`}>
                <div className='flex justify-between'>
                    <h2 className={pDark}>Nombre: {nombre}</h2>
                    <ul className='flex  gap-4'>
                        <li>
                            <CiEdit className="size-6 cursor-pointer" onClick={() => handleOpenModalEdit(usuarioId)} />
                        </li>
                        <li>
                            <RiDeleteBinLine className="size-6 cursor-pointer" onClick={handleDeleteContact} />
                        </li>

                    </ul>
                </div>
                <p className={pDark}>Telefono: {telefono}</p>
                <p className={pDark}>Email: {email !== undefined ? email : 'No hay Mail'}</p>
                <p className={pDark}>Notas: {notas !== undefined ? notas : 'No hay notas'}</p>
            </div>

        </>



    )
}
