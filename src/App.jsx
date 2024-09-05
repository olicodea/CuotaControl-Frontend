import './App.css';
import Home from './pages/Home/Home';
import Nav from './components/nav/Nav';
import ThemeContextProvider from './components/Context/ThemeContext';
import { Route, Routes } from 'react-router-dom';
import Prestamos from './pages/Prestamos/Prestamos';
import Contacto from './pages/Contacto/Contacto';
import MiCuenta from './pages/Mi Cuenta/MiCuenta';
import NotPage from './pages/NotPage/NotPage';

function App() {
    return (
        <ThemeContextProvider>
            <Nav />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='mi-cuenta' element={<MiCuenta />} />
                <Route path='prestamos' element={<Prestamos />} />
                <Route path='contacto' element={<Contacto />} />
                <Route path='*' element={<NotPage />} />

            </Routes>
        </ThemeContextProvider>
    );
}

export default App;
