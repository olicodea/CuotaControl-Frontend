import { Link } from "react-router-dom"
import "../Button/button.css"
import useTheme from "../../../Hooks/useTheme"
import PropTypes from 'prop-types';

export default function Button({ name, style, route }) {
    const { styleDarkHome, darkResumen } = useTheme()
    return <button className={`${style} buttonAnimated ${styleDarkHome} ${darkResumen} border  border-[1px]  p-2  rounded-md text-sm font-semibold`}><Link to={route}>{name}</Link></button>
}
Button.propTypes = {
    name: PropTypes.string.isRequired,
    style: PropTypes.string,
    route: PropTypes.string.isRequired,
};