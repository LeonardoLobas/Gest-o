import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import "./daypicker-overrides.css";
import { AnimatePresence, motion } from "framer-motion";

const Home = () => {
    const [selected, setSelected] = useState<Date>();

    const [isVisible, setIsVisible] = useState(false);

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
                <motion.div className="col-span-1  border-[#373739]  h-full place-items-center w-full bg-black ">
                    <motion.h1 className="mt-2">Minha Agenda</motion.h1>
                    <AnimatePresence mode="popLayout" initial={false}>
                        {isVisible ? (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    scale: 0,
                                }}
                                animate={{ opacity: 1, scale: 1, y: 100 }}
                                exit={{ opacity: 0, scale: 0 }}
                                className="w-[300px] h-[100px] bg-[#373739] rounded-2xl"
                                key="box"
                            >
                                <textarea
                                    className="w-full h-full bg-transparent rounded-lg p-2 text-white outline-none resize-none"
                                    placeholder="Digite aqui..."
                                />
                            </motion.div>
                        ) : null}
                        <div className="flex justify-center items-center w-full h-full">
                            <motion.button
                                className="p-2  border-b-2 border-amber-50 cursor-pointer flex items-center  text-white "
                                onClick={() => setIsVisible(!isVisible)}
                            >
                                {isVisible ? "Fechar" : "Adicionar"}
                            </motion.button>
                        </div>
                    </AnimatePresence>
                </motion.div>
                <motion.div className="col-span-1 border-l-4 border-r-4 border-[#373739] h-full place-items-center w-full bg-black relative">
                    <motion.h1 className="mt-2">Vendas</motion.h1>
                </motion.div>
                <motion.div className="col-span-1  border-[#373739] h-full place-items-center w-full bg-black relative">
                    <motion.h1 className="mt-2">Cadastros Clientes</motion.h1>
                </motion.div>
            </div>
        </div>
    );
};

export default Home;
