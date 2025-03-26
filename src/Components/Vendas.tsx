import { Path, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import Input from "./ui/Input";
import { useEffect, useState } from "react";
import React from "react";
import { motion } from "framer-motion";

const validationNumber = (number: string) => {
    const regexNumber = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    return regexNumber.test(number);
};

const registrationScheme = z.object({
    nome: z.string().min(8, "O nome deve ter pelos menos 8 caracteres"),
    telefone: z
        .string()
        .refine(
            validationNumber,
            "Telefone inválido, use o formato (XX) 9XXXX-XXXX"
        ),
    cep: z.string().regex(/^\d{5}-\d{3}$/, {
        message: "O CEP deve estar no formato XXXXX-XXX",
    }),

    endereco: z.object({
        rua: z.string().min(5, "A rua deve ter pelo menos 5 caracteres"),
        numero: z.string().min(1, "O número é obrigatório"),
        bairro: z.string().min(3, "O bairro deve ter pelo menos 3 caracteres"),
        cidade: z.string().min(3, "A cidade deve ter pelo menos 3 caracteres"),
        estado: z.string().min(2, "O estado deve ter 2 caracteres"),
    }),
});

const searchCEP = async (cep: string) => {
    try {
        const response = await axios.get(
            `https://brasilapi.com.br/api/cep/v2/${cep}`
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar o CEP:", error);
        return null;
    }
};

export type FormData = z.infer<typeof registrationScheme>;

const Vendas = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm<FormData>({
        resolver: zodResolver(registrationScheme),
    });

    const inputs: { label: string; name: Path<FormData>; type: string }[] = [
        { label: "Nome", name: "nome", type: "text" },
        { label: "Telefone", name: "telefone", type: "text" },
        { label: "CEP", name: "cep", type: "text" },
    ];

    const enderecoInputs: {
        label: string;
        name: Path<FormData>;
        type: string;
    }[] = [
        { label: "Rua", name: "endereco.rua", type: "text" },
        { label: "Número", name: "endereco.numero", type: "text" },
        { label: "Bairro", name: "endereco.bairro", type: "text" },
        { label: "Cidade", name: "endereco.cidade", type: "text" },
        { label: "Estado", name: "endereco.estado", type: "text" },
    ];

    const cep = watch("cep");

    useEffect(() => {
        if (cep?.length >= 8) {
            searchCEP(cep).then((info) => {
                reset((prev) => ({
                    ...prev,
                    endereco: {
                        ...prev.endereco,
                        cidade: info.city,
                        rua: info.street,
                        bairro: info.neighborhood,
                        estado: info.state,
                    },
                }));
            });
        }
    }, [cep, reset]);

    const submit = (data: FormData) => {
        alert(JSON.stringify(data, null, 2));
    };

    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const handleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const [openForm, setOpenForm] = React.useState<boolean>(false);

    return (
        <>
            {openForm && (
                <>
                    <div className="fixed inset-0 bg-background/70 flex items-center justify-center z-20">
                        <form
                            onSubmit={handleSubmit(submit, (errors) =>
                                console.log(errors)
                            )}
                            className="bg-background-secondary rounded-2xl p-6 grid grid-cols-2 shadow-xl w-[500px] relative"
                        >
                            {inputs.map((input) => (
                                <Input
                                    key={input.name}
                                    label={input.label}
                                    name={input.name}
                                    type={input.type}
                                    placeholder={`Digite seu ${input.label.toLowerCase()}`}
                                    register={register}
                                    error={errors[input.name as keyof FormData]}
                                />
                            ))}

                            {enderecoInputs.map((input) => (
                                <Input
                                    key={input.name}
                                    label={input.label}
                                    name={input.name}
                                    type={input.type}
                                    placeholder={`Digite ${input.label.toLowerCase()}`}
                                    register={register}
                                    error={
                                        errors.endereco?.[
                                            input.name.split(
                                                "."
                                            )[1] as keyof FormData["endereco"]
                                        ]
                                    }
                                />
                            ))}

                            <button
                                className="relative bg-transparent  hover:text-details  font-bold text-lg p-2 cursor-pointer tracking-[0.1rem] text-white"
                                type="submit"
                            >
                                Cadastrar
                            </button>

                            <button
                                className="relative bg-transparent  hover:text-details  font-bold text-lg p-2 cursor-pointer tracking-[0.1rem] text-white"
                                onClick={() => setOpenForm(false)}
                            >
                                Cancelar
                            </button>
                        </form>
                    </div>
                </>
            )}

            <button
                className="p-2 w-60 top-7 h-10 absolute right-86  hover:text-details   cursor-pointer  text-lg  text-text-main"
                onClick={() => setOpenForm(true)}
            >
                Cadastrar cliente/vendas
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-details animate-pulse"></span>
            </button>

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
                                    Comprou:{" "}
                                    <span className="font-semibold">
                                        1500$$
                                    </span>
                                </p>
                                <p className="text-sm mb-1">
                                    Pagou:{" "}
                                    <span className="font-semibold">780$$</span>
                                </p>
                                <p className="text-sm">
                                    Esta com condicional:{" "}
                                    <span className="font-semibold">
                                        SIMMMMMMMMMM
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
        </>
    );
};
export default Vendas;
