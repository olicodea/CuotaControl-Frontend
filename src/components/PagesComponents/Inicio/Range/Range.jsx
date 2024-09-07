import { useContext } from "react";
import "../Range/range.css";
import { ThemeContextCustom } from "../../../Context/ThemeContext";

export default function Range({ nameInput, TotalPago, Totaldeuda, porcentaje, color1, color2 }) {
    const { theme } = useContext(ThemeContextCustom);

    return (
        <label htmlFor="range" className={`flex flex-col justify-center `}>
            <span className={` ${theme === 'dark' ? 'text-slate-900' : 'text-slate-700'} absolute text-sm font-semibold  select-none z-10 pl-5`}>
                %{porcentaje}
            </span>
            <input
                type="range"
                name={nameInput}
                value={TotalPago}
                min={0}
                max={Totaldeuda}
                className='range-input'


                style={{
                    background: porcentaje === 100
                        ? `#${color1}`
                        : `linear-gradient(to right, #${color1} ${porcentaje - 4}%, #${color2} ${porcentaje}%)`
                }} />
        </label>
    );
}
