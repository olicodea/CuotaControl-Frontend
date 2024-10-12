import { useEffect } from "react"
import { useStore } from "../../store/useStore"


export default function Contacto() {
    const { listContacto, fetchContactList } = useStore((state) => ({
        listContacto: state.listContacto,
        fetchContactList: state.fetchContactList
    }))

    useEffect(() => {
        const url = "SupuestaURL"
        fetchContactList(url)
    })
    return (
        <div>
            <h1>Contacto</h1>
        </div>
    )
}
