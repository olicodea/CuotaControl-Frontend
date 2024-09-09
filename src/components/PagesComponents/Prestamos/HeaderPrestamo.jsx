import PropTypes from 'prop-types';

export default function HeaderPrestamo({ handleChangeFilter, filter, selectTheme }) {
    return (
        <header className="flex justify-between p-5">
            <h1>Lista de préstamos</h1>
            <select id="Options" onChange={handleChangeFilter} value={filter} className={selectTheme}
            >
                <option value="all">Todos</option>
                <option value="dado">Prestado</option>
                <option value="pedido">Pedido</option>
            </select>
        </header>
    )
}

HeaderPrestamo.propTypes = {
    handleChangeFilter: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
    selectTheme: PropTypes.string.isRequired
};
