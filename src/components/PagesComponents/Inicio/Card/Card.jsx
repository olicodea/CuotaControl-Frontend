import React from 'react'

export default function Card({ title, cuota, fecha }) {
    return (
        <article>
            <h2>{title}</h2>
            <p>Cuota Nº {cuota}</p>
            <p>Vence {fecha}</p>
        </article>
    )
}
