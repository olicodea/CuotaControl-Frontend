import React from 'react';
import PropTypes from 'prop-types';
import useTheme from "../../components/Hooks/useTheme";
import Button from "../../components/PagesComponents/Inicio/Button/Button";

const CardCuotas = ({ cuota, vencimientos }) => {
    const { darkCard } = useTheme();

    return (
        <article className={`flex flex-col p-2 w-11/12 rounded-md cardStyle m-auto ${darkCard} mt-3 gap-4`}>
            <div className="flex flex-col justify-center items-start p-2">
                <h3>{cuota}</h3>
                <ul>
                    {vencimientos.map((vencimiento) => (
                        <li key={vencimiento.fecha}>
                            Fecha: {vencimiento.fecha}, Monto: {vencimiento.monto}, Estado: {vencimiento.estado}
                        </li>
                    ))}
                </ul>
            </div>
            <Button name='Marcar pagado' style={'w-32 m-auto'} />
        </article>
    );
};

CardCuotas.propTypes = {
    cuota: PropTypes.string.isRequired,
    vencimientos: PropTypes.arrayOf(
        PropTypes.shape({
            fecha: PropTypes.string.isRequired,
            monto: PropTypes.number.isRequired,
            estado: PropTypes.string.isRequired
        })
    ).isRequired
};

export default CardCuotas;
