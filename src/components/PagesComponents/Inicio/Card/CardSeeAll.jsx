
import "../Card/card.css"
import useTheme from "../../../Hooks/useTheme"
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";

export default function CardSeeAll({ title }) {
    const { darkCard } = useTheme()

    return (
        <article className={`flex flex-col p-2 w-40 rounded-md cardStyle cursor-pointer hover:scale-105 transition-transform duration-500 ${darkCard} mt-3`}>
            <Link to='prestamos'> <h2 className='font-semibold flex justify-center items-center gap-2 p-5'>{title}<IoIosArrowRoundForward /></h2></Link>

        </article>
    )
}
