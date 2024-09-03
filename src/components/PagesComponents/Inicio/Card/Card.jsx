
import "../Card/card.css"
export default function Card({ title, cuota, fecha }) {
    return (
        <article className={`flex flex-col p-2 w-52 rounded-md cardStyle cursor-pointer hover:scale-105 transition-transform duration-300`}>
            <h2 className='font-semibold'>{title}</h2>
            <p className='text-[#00000091]'>Cuota Nº {cuota}</p>
            <p className='text-[#00000091]'>Vence {fecha}</p>
        </article>
    )
}
