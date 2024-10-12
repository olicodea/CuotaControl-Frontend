import { useEffect, useState, useCallback, useMemo } from "react";
import useTheme from "../../components/Hooks/useTheme";
import { useStore } from "../../store/useStore";
import HeaderPrestamo from "../../components/PagesComponents/Prestamos/HeaderPrestamo";
import ContainerCard from "../../components/PagesComponents/Prestamos/Card/ContainerCard";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import Loading from "../../components/Loading/Loading";

const apiUrl = import.meta.env.VITE_API_BASE_URL;
const prestamosEndpoint = import.meta.env.VITE_PRESTAMOS_ENDPOINT;
const userId = import.meta.env.VITE_USER_ID;

export default function Prestamos() {
    const [filter, setFilter] = useState('all');
    const { styleDarkHome, selectTheme } = useTheme();
    const { fetchPrestamos, getPrestamos, isLoading } = useStore(state => ({
        fetchPrestamos: state.fetchPrestamos,
        getPrestamos: state.getPrestamos,
        isLoading: state.isLoading
    }));

    useEffect(() => {
        const url = `${apiUrl}/api${prestamosEndpoint}?userId=${userId}`;
        fetchPrestamos(url);
    }, [fetchPrestamos]);

    // useMemo para filtrar los préstamos
    const filteredPrestamos = useMemo(() => {
        if (filter === 'all') {
            return getPrestamos;
        }
        return getPrestamos.filter(item => item.tipo === filter);
    }, [getPrestamos, filter]);

    const handleChangeFilter = (e) => {
        const selectedFilter = e.target.value;
        setFilter(selectedFilter)
    }


    return (
        <div className={`${styleDarkHome} h-12/12`}>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <HeaderPrestamo handleChangeFilter={handleChangeFilter} filte={filter} selectTheme={selectTheme} />
                    <main className="w-screen h-auto">
                        <h4 className="pl-4">
                            {filter === 'dado' ? "Prestados" : filter === 'pedido' ? "Pedidos" : "Todos"}
                        </h4>
                        <section>
                            <ContainerCard stateFilter={filteredPrestamos} />
                        </section>
                    </main>
                </>
            )}
            <footer className="p-5 flex items-center">
                {filter === 'all' ? (
                    <Link to='/' className="flex items-center cursor-pointer"><IoIosArrowBack /> Atras</Link>
                ) : ''}
            </footer>
        </div>
    );
}
