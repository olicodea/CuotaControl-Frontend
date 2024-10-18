
import "../Card/card.css"
import useTheme from "../../../Hooks/useTheme"

export default function Card({ title, cuota, fecha }) {
    const { darkCard, pDark } = useTheme()

    return (
        <article className={`flex flex-col p-2 mt-3 w-40 rounded-md cardStyle cursor-pointer hover:scale-105 transition-transform duration-500 ${darkCard}`}>
            <h2 className='font-semibold'>{title}</h2>
            <p className={`${pDark} text-sm`}>Cuota Nº {cuota}</p>
            <p className={`${pDark}  text-sm`}>Vence {fecha}</p>
        </article>
    )
}
