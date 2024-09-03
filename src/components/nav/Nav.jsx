import { useState } from "react";
import ButtonTeheme from "./ButtonTheme/ButtonTeheme";
import { Sling as Hamburger } from 'hamburger-react';
import logo from "../../assets/img/logo.png";

export default function Nav() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(prev => !prev);
    };
    const fontNav = "text-xl"
    return (
        <header className="w-screen flex items-center justify-between p-4 ">
            <img src={logo} className="h-24" alt="Logo" />


            <div>
                <Hamburger toggled={open} toggle={handleOpen} />
            </div>


            {open && (

                <div className="fixed top-28 left-0 w-full h-full bg-black/30 z-10 flex justify-end ">
                    <nav className=" fixed top-- right-0 m-auto">
                        <ul className="flex flex-col items-end gap-6 p-5 pr-10 bg-black/0 h-lvh">
                            <li><a href="http://" className={fontNav}>Mi Cuenta</a></li>
                            <li><a href="http://" className={fontNav}>Prestamo</a></li>
                            <li><a href="http://" className={fontNav}>Contacto</a></li>
                            <ButtonTeheme />
                        </ul>
                    </nav>
                </div>
            )}
        </header>
    );
}
