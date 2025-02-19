import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import "./daypicker-overrides.css";

const Home = () => {
    const [selected, setSelected] = useState<Date>();
    return (
        <div className="flex-1 bg-gray-200 h-full p-8 grid grid-cols-[25%_75%] gap-4 ">
            <div className="bg-black text-white grid place-items-center rounded-2xl ">
                <DayPicker
                    mode="single"
                    selected={selected}
                    onSelect={setSelected}
                    footer={
                        selected
                            ? `Selected: ${selected.toLocaleDateString()}`
                            : "Escolha um dia."
                    }
                />
            </div>

            <div className="bg-black text-white grid place-items-center rounded-2xl ">
                <h2>Área 70%</h2>
            </div>
        </div>
    );
};

export default Home;
