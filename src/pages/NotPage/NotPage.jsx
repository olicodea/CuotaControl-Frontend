import { Link } from "react-router-dom"
import imgError from "../NotPage/error.jpg"
export default function NotPage() {
    return (
        <div className="w-screen h-full flex flex-col justify-center items-center">
            <img src={imgError} alt="error de carga" />

            <Link to='/'> Volver al Inicio</Link>

        </div >
    )
}
