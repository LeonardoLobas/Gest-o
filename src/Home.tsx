import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import "./daypicker-overrides.css";
import { motion, useAnimation } from "framer-motion";

const Home = () => {
    const [selected, setSelected] = useState<Date>();
    const [clicked, setClicked] = useState(false);
    const controls = useAnimation();

    const handleClick = () => {
        if (!clicked) {
            setClicked(true);
            controls.start({
                y: 170,
                transition: { type: "spring", stiffness: 100 },
            });
        }
    };
    return (
        <div className="flex-1 bg-[#FFFDF3]h-full p-8 grid grid-cols-[25%_75%] gap-4 ">
            <div className="bg-black  text-amber-50 grid place-items-center rounded-2xl ">
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

            <div className="bg-black text-amber-50 grid grid-cols-3 place-items-center text-lg tracking-[0.1rem] font-bold rounded-2xl overflow-hidden">
                <motion.div
                    className="col-span-1  border-[#373739] place-content-center h-full place-items-center w-full bg-black relative"
                    initial={{
                        y: -100,
                    }}
                    animate={{
                        y: 0,
                    }}
                    transition={{
                        duration: 0.8,
                        ease: "easeOut",
                    }}
                >
                    <h1 className="mt-2 w-full text-center absolute top-0">
                        Minha Agenda
                    </h1>
                    <div>
                        <motion.button
                            className="p-2 bg-amber-500 cursor-pointer text-white rounded"
                            onClick={handleClick}
                            animate={controls}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            Adicionar
                        </motion.button>
                    </div>
                </motion.div>
                <motion.div
                    className="col-span-1 border-l-4 border-r-4 border-[#373739] h-full place-items-center w-full bg-black relative"
                    initial={{
                        borderTopWidth: 0,
                        borderBottomWidth: 0,
                        y: -100,
                    }}
                    animate={{
                        y: 0,
                    }}
                    transition={{
                        duration: 0.8,
                        ease: "easeOut",
                    }}
                >
                    <h1 className="mt-2">Vendas</h1>
                </motion.div>
                <motion.div
                    className="col-span-1  border-[#373739] h-full place-items-center w-full bg-black relative"
                    initial={{
                        y: -100,
                    }}
                    animate={{
                        y: 0,
                    }}
                    transition={{
                        duration: 0.8,
                        ease: "easeOut",
                    }}
                >
                    <h1 className="mt-2">Cadastros</h1>
                </motion.div>
            </div>
        </div>
    );
};

export default Home;
