import { useContext, useState } from "react";
import ButtonTeheme from "./ButtonTheme/ButtonTeheme";
import { Sling as Hamburger } from 'hamburger-react';
import logo from "../../assets/img/logo.png";
import { ThemeContextCustom } from "../Context/ThemeContext";


export default function Nav() {
    const [open, setOpen] = useState(false);
    const { theme, handleTheme } = useContext(ThemeContextCustom)

    const handleOpen = () => {
        setOpen(prev => !prev);
    };

    console.log(theme)
    const fontNav = `${theme === 'dark' ? 'text-slate-100' : ' text-slate-950'} text-xl `;
    return (
        <header className="w-screen flex items-center justify-between p-4 bg-slate-600 h-14 ">
            <img src={logo} className="h-24" alt="Logo" />

            <div>
                <Hamburger toggled={open} toggle={handleOpen} color={theme === 'dark' ? '#e2e8f0' : '#1e293b'} />
            </div>


            {open && (

                <div className="fixed top-14 left-0 w-full h-full bg-black/50 z-10 flex justify-end ">
                    <nav className=" fixed top-- right-0 m-auto">
                        <ul className="flex flex-col items-end gap-6 p-5 pr-10 bg-black/0 h-lvh z-30 ">
                            <li><a href="http://" className={fontNav}>Mi Cuenta</a></li>
                            <li><a href="http://" className={fontNav}>Prestamo</a></li>
                            <li><a href="http://" className={fontNav}>Contacto</a></li>
                            <ButtonTeheme handleTheme={handleTheme} theme={theme} />
                        </ul>
                    </nav>
                </div>
            )}
        </header>
    );
}
