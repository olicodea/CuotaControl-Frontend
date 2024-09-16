import { Checkbox, Label } from "flowbite-react";
import { useState } from "react";

export default function CheckBox() {

    const [valueCheck, setValueCheck] = useState({
        pendiente: false,
        pagado: false
    })

    const handleChange = (e) => {
        const { id, checked } = e.target;
        setValueCheck((prev) => ({ ...prev, [id]: checked }))

    }
    console.log(valueCheck)
    return (
        <div className="flex max-w-md w-11/12 m-auto flex-col gap-4 bg-slate-500 " id="checkbox">
            <div className="flex items-center gap-2 p-2">
                <Label htmlFor="accept" className="flex">
                    Buscar por estado &nbsp;
                    <p className="text-cyan-600  dark:text-cyan-500">
                        Pendiente / Pagado
                    </p>
                </Label>
            </div>
            <div className="flex items-center gap-2 pl-2" onChange={handleChange}>
                <Checkbox id="pediente" onChange={handleChange} checked={valueCheck.pendiente} />
                <Label htmlFor="pendiente">pendiente</Label>
            </div>
            <div className="flex items-center gap-2 pl-2">
                <Checkbox id="pagado" onChange={handleChange} checked={valueCheck.pagado} />
                <Label htmlFor="age">pagado</Label>
            </div>
            <div className="flex gap-2 pl-2">
                <div className="flex h-5 items-center">
                    <Checkbox id="shipping" />
                </div>
                <div className="flex flex-col ">
                    <Label htmlFor="shipping">Vencido</Label>
                    <div className="text-gray-500 dark:text-gray-300 p-2">
                        <span className="text-xs font-normal">
                            For orders shipped from Flowbite from <span className="font-medium">€ 25</span> in books or&nbsp;
                            <span>€ 29</span> on other categories
                        </span>
                    </div>
                </div>
            </div>

        </div >


    );

}
