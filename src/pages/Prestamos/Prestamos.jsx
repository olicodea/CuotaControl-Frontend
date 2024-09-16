import { useEffect, useState, useCallback } from "react";
import useTheme from "../../components/Hooks/useTheme";
import { useStore } from "../../store/useStore";
import HeaderPrestamo from "../../components/PagesComponents/Prestamos/HeaderPrestamo";
import ContainerCard from "../../components/PagesComponents/Prestamos/Card/ContainerCard";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const API_URLPRESTAMOS = "../../../public/services/data.json";

export default function Prestamos() {

    const [filter, setFilter] = useState('all');
    const [stateFilter, setStateFilter] = useState([])
    const { styleDarkHome, selectTheme } = useTheme()
    const { fetchPrestamos, getPrestamos
    } = useStore(state => ({
        fetchPrestamos: state.fetchPrestamos,
        getPrestamos: state.getPrestamos
    }))


    useEffect(() => {
        fetchPrestamos(API_URLPRESTAMOS);
    }, [fetchPrestamos]);

    useEffect(() => {
        if (filter === 'all') {
            setStateFilter(getPrestamos);
        } else {
            const getPrestamosFilter = getPrestamos.filter(item => item.estadoPrestamo === filter)

            setStateFilter(getPrestamosFilter);
        }

    }, [getPrestamos, filter])


    const handleChangeFilter = useCallback((e) => {
        const selectedFilter = e.target.value;
        setFilter(selectedFilter);

    }, [])

    return (
        <div className={`${styleDarkHome} h-12/12`}>
            <HeaderPrestamo handleChangeFilter={handleChangeFilter} filte={filter} selectTheme={selectTheme} />
            <main className="w-screen h-auto" >
                <h4 className="pl-4">{filter === 'dado' ? "Prestados" : filter === 'pedido' ? "Pedidos" : "Todos"}</h4>
                <ContainerCard stateFilter={stateFilter} />
            </main>
            <footer className="p-5 flex items-center">
                {filter === 'all' ? <Link to='/' className="flex  items-center cursor-pointer"><IoIosArrowBack /> Atras</Link> : ''}
            </footer>
        </div >
    );
}