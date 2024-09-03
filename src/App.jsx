
import './App.css'
import Home from './pages/Home/Home';
import Nav from './components/nav/Nav';
import ThemeContextProvider from './components/Context/ThemeContext';

function App() {


    return (
        <>
            <ThemeContextProvider>
                <Nav />
                <Home />
            </ThemeContextProvider>


        </>
    )
}

export default App
