import { useContext, useEffect, useRef, useState } from "react";
import ButtonTeheme from "./ButtonTheme/ButtonTeheme";
import { Sling as Hamburger } from 'hamburger-react';
import { ThemeContextCustom } from "../Context/ThemeContext";
import { Link } from "react-router-dom";


export default function Nav() {
    const [open, setOpen] = useState(false);
    const { theme, handleTheme } = useContext(ThemeContextCustom)

    const positionMouse = useRef(null)

    const handleOpen = () => {
        setOpen(prev => !prev);
    };

    const handleClick = (e) => {
        if (!positionMouse.current.contains(e.target)) {
            setOpen(prev => !prev)

        }
    }



    const fontNav = `${theme === 'dark' ? 'text-slate-100' : ' text-slate-950'} text-xl `;
    return (
        <header className="w-screen flex items-center justify-between p-4 bg-slate-600 h-14 ">
            <h2 className={`${fontNav} font-semibold`}>Couta Control</h2>

            <div className=" z-40 flex items-center gap-3">

                <Hamburger toggled={open} toggle={handleOpen} color={'#e2e8f0'} />
            </div>


            {open && (

                <div className={`fixed top-0 left-0 w-screen h-full bg-black/50 z-30 flex justify-end ${open ? 'backdrop-blur-sm' : null}`} onClick={handleClick} >
                    <nav className=" fixed top-14 right-0 m-auto" ref={positionMouse}>
                        <ul className="flex flex-col items-end gap-6 p-5 pr-10 bg-black/0 h-lvh z-30   "  >
                            <li><Link to='/' className={fontNav}>Resumen</Link></li>
                            <li><Link to='/mi-cuenta' className={fontNav}>Mi Cuenta</Link></li>
                            <li><Link to='/prestamos' className={fontNav}>Prestamos</Link></li>
                            <li><Link to="/contacto" className={fontNav}>Contacto</Link></li>
                            <ButtonTeheme handleTheme={handleTheme} theme={theme} />
                        </ul>
                    </nav>
                </div>
            )
            }
        </header >
    );
}
