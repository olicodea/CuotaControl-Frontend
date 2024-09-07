import { Link } from "react-router-dom"
import "../Button/button.css"
import useTheme from "../../../Hooks/useTheme"

export default function Button({ name, style, route }) {
    const { styleDarkHome, darkResumen } = useTheme()
    return <button className={`${style} buttonAnimated ${styleDarkHome} ${darkResumen} border  border-[1px]  p-2  rounded-md text-sm font-semibold mb-6`}><Link to={route}>{name}</Link></button>
}
