import { useContext } from "react"
import "../Range/range.css"
import { ThemeContextCustom } from "../../../Context/ThemeContext"
export default function Range({ nameInput, valor, deuda, color1, color2, pDark }) {
    const { theme } = useContext(ThemeContextCustom)
    return (
        <label htmlFor="range" className={`flex flex-col justify-center `}>
            <span className={` ${theme === 'dark' ? 'text-slate-900' : 'text-slate-700'} absolute text-sm font-semibold left-12  select-none z-10 `}>{valor}%</span>
            <input type="range" name={nameInput} value={valor} min={0} max={deuda} className='range-input' style={{
                background: `linear-gradient(
            to right,
            #${color1} ${valor - 5}%,
            #${color2} ${valor + 4}%
          )`
            }} />
        </label >
    )
}
