import { useContext } from "react"
import "../Range/range.css"
import { ThemeContextCustom } from "../../../Context/ThemeContext"
export default function Range({ nameInput, valor, deuda, color1, color2 }) {
    const { theme } = useContext(ThemeContextCustom)
    const defaultValue = isNaN(valor) ? ' ' : valor
    const maxValue = isNaN(deuda) ? ' ' : deuda
    return (
        <label htmlFor="range" className={`flex flex-col justify-center `}>
            <span className={` ${theme === 'dark' ? 'text-slate-900' : 'text-slate-700'} absolute text-sm font-semibold left-12  select-none z-10 `}>{valor}%</span>
            <input type="range" name={nameInput} defaultValue={defaultValue} min={0} max={maxValue} className='range-input' style={{
                background: `linear-gradient(
            to right,
            #${color1} ${valor - 5}%,
            #${color2} ${valor + 4}%
          )`
            }} />
        </label >
    )
}
