import { useContext, useState } from "react";
import ButtonTeheme from "./ButtonTheme/ButtonTeheme";
import { Sling as Hamburger } from 'hamburger-react';
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
            <h2 className={`${fontNav} font-semibold`}>Couta Control</h2>

            <div className="z-50 flex items-center gap-3">

                <Hamburger toggled={open} toggle={handleOpen} color={theme === 'dark' ? '#e2e8f0' : '#1e293b'} />
            </div>


            {open && (

                <div className={`fixed top-0 left-0 w-screen h-full bg-black/50 z-20 flex justify-end ${open ? 'backdrop-blur-sm' : null}`}>
                    <nav className=" fixed top-20 right-0 m-auto">
                        <ul className="flex flex-col items-end gap-6 p-5 pr-10 bg-black/0 h-lvh z-30 ">
                            <li><a href="http://" className={fontNav}>Mi Cuenta</a></li>
                            <li><a href="http://" className={fontNav}>Prestamo</a></li>
                            <li><a href="http://" className={fontNav}>Contacto</a></li>
                            <ButtonTeheme handleTheme={handleTheme} theme={theme} />
                        </ul>
                    </nav>
                </div>
            )
            }
        </header >
    );
}
