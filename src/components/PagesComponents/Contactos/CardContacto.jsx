import React from 'react'
import useTheme from '../../Hooks/useTheme'

export default function CardContacto({ nombre, telefono, email, notas }) {

    const { darkCard, pDark } = useTheme()
    return (
        <div className={`p-2 ${darkCard} cardStyle`}>
            <h2 className={pDark}>Nombre: {nombre}</h2>
            <p className={pDark}>Telefono: {telefono}</p>
            <p className={pDark}>Email: {email !== undefined ? email : 'No hay Mail'}</p>
            <p className={pDark}>Notas: {notas !== undefined ? notas : 'No hay notas'}</p>
        </div>
    )
}
