import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import "./daypicker-overrides.css";

const Home = () => {
    const [selected, setSelected] = useState<Date>();
    return (
        <div className="flex-1 bg-amber-50  h-full p-8 grid grid-cols-[25%_75%] gap-4 ">
            <div className="bg-black text-white grid place-items-center rounded-2xl ">
                <DayPicker
                    mode="single"
                    selected={selected}
                    onSelect={setSelected}
                    footer={
                        selected
                            ? `Selecionado: ${selected.toLocaleDateString()}`
                            : "Escolha um dia."
                    }
                />
            </div>

            <div className="bg-black text-white grid grid-cols-3 place-items-center text-lg tracking-[0.1rem] font-bold rounded-2xl overflow-hidden">
                <div className="col-span-1 h-full w-full place-items-center  bg-amber-900">
                    {" "}
                    <h1 className="mt-2">Minha agenda</h1>
                </div>
                <div className="col-span-1 h-full place-items-center w-full bg-amber-400">
                    <h1 className="mt-2">Vendas</h1>
                </div>
                <div className="col-span-1 h-full place-items-center w-full bg-amber-600">
                    <h1 className="mt-2">Cadastros</h1>
                </div>
            </div>
        </div>
    );
};

export default Home;
