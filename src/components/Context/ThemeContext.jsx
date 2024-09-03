import { createContext, useEffect, useState } from "react";

export const ThemeContextCustom = createContext();

const estiloInicial = localStorage.getItem('theme')

export default function ThemeContextProvider({ children }) {


    const [theme, setTheme] = useState(estiloInicial || 'light');

    useEffect(() => {
        // Aplica la clase 'dark' si el tema es 'dark', o la elimina si es 'light'
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            setTheme('dark')
        } else {
            document.documentElement.classList.remove('dark');
            setTheme('light')
        }

        // Guardamos el tema actual en localStorage
        localStorage.setItem('theme', theme);
    }, [theme]);


    const handleTheme = () => {
        setTheme(prev => prev === "dark" ? "light" : "dark");
    };
    return (
        <ThemeContextCustom.Provider value={{ handleTheme, theme }}>
            {children}
        </ThemeContextCustom.Provider>
    );
}