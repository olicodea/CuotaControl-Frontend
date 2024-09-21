import PropTypes from 'prop-types';

export default function HeaderPrestamo({ handleChangeFilter, filter, selectTheme }) {
    return (
        <header className="flex justify-between p-5">
            <h1>Lista de préstamos</h1>
            <select id="Options" onChange={handleChangeFilter} value={filter} className={selectTheme}
            >
                <option value="all">Todos</option>
                <option value="prestado">Prestado</option>
                <option value="recibido">Recibido</option>
            </select>
        </header>
    )
}

HeaderPrestamo.propTypes = {
    handleChangeFilter: PropTypes.func.isRequired,
    selectTheme: PropTypes.string.isRequired
};
