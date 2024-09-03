import "../Button/button.css"

export default function Button({ name, style }) {
    return <button className={`${style} buttonAnimated`}>{name}</button>
}
