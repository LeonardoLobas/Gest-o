import { motion } from "framer-motion";
import { useState } from "react";

const Clientes = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const handleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="grid grid-cols-1   bg-[#FFFDF3] flex-1">
            <div className="bg-background-secondary grid p-4">
                <div className="grid grid-cols-2 gap-2 place-items-center p-2">
                    {[1, 2, 3, 4].map((item, index) => (
                        <motion.div
                            key={index}
                            className="bg-gradient-to-tr from-background  details w-[400px] h-[250px] shadow-md shadow-background place-items-center content-center text-text-main rounded-xl p-2 cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            onClick={() => handleExpand(index)}
                        >
                            <h1 className="text-2xl font-bold mb-2">
                                Leonardo Lobas
                            </h1>
                            <p className="text-xl mb-1">
                                Telefone:{" "}
                                <span className="font-semibold">
                                    (42)98849-0054
                                </span>
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
            {expandedIndex !== null && (
                <div className="fixed inset-0 bg-background/70  flex items-center justify-center z-10">
                    <div className="bg-white p-4 rounded-lg shadow-lg w-[500px]">
                        <h2 className="text-lg font-bold">
                            Informações Adicionais
                        </h2>
                        <p className="text-sm mt-2">
                            Informações adicionais sobre o cliente...
                        </p>
                        <div className="flex justify-end mt-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="bg-details cursor-pointer text-text-main p-2 rounded"
                                onClick={() => setExpandedIndex(null)}
                            >
                                Fechar
                            </motion.button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Clientes;
