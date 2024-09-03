import "../Range/range.css"
export default function Range({ nameInput, valor, deuda, color1, color2 }) {
    return (
        <label htmlFor="range" className=" flex flex-col justify-center ">
            <span className="absolute text-sm font-semibold left-12  select-none z-10 text-slate-700">{valor}%</span>
            <input type="range" name={nameInput} value={valor} min={0} max={deuda} className='range-input' style={{
                background: `linear-gradient(
            to right,
            #${color1} ${valor - 5}%,
            #${color2} ${valor + 4}%
          )`
            }} />
        </label>
    )
}
