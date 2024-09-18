import { Checkbox, Label } from "flowbite-react";

export default function CheckBox({ pagado, pendiente, setValueCheck }) {
    const handleChange = (e) => {
        const { id, checked } = e.target;
        setValueCheck((prev) => ({ ...prev, [id]: checked }))
    }


    return (
        <div className="flex w-12/12 justify-center  p-5 m-auto flex-col gap-4 bg-slate-500 " id="checkbox">
            <div className="flex items-center gap-2 p-2">
                <Label htmlFor="accept" className="flex">
                    Buscar por estado &nbsp;
                    <p className="text-cyan-600  dark:text-cyan-500">
                        Pendiente / Pagado
                    </p>
                </Label>
            </div>
            <div className="flex items-center gap-2 pl-2">
                <Checkbox id="pendiente" onChange={handleChange} checked={pendiente} />
                <Label htmlFor="pendiente">pendiente</Label>
            </div>
            <div className="flex items-center gap-2 pl-2">
                <Checkbox id="pagado" onChange={handleChange} checked={pagado} />
                <Label htmlFor="age">pagado</Label>
            </div>


        </div >


    );

}
