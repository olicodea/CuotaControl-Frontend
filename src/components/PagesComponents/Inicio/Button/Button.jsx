import { Link } from "react-router-dom"
import "../Button/button.css"

export default function Button({ name, style, route }) {

    return <button className={`${style} buttonAnimated`}><Link to={route}>{name}</Link></button>
}
