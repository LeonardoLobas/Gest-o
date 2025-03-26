import { Path, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import Input from "./ui/Input";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const validationCPF = (cpf: string) => {
    const regexCpf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return regexCpf.test(cpf);
};

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
    cpf: z.string().refine(validationCPF, {
        message: "CPF inválido. Use o formato 000.000.000-00",
    }),
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

const CadastroClientes = () => {
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
        { label: "CPF", name: "cpf", type: "text" },
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

    const [isHovered, setIsHovered] = useState(false);

    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const handleExpand = (index: number) => {
        // Se o card clicado já estiver expandido, colapsa-o. Caso contrário, expande o card.
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="grid grid-cols-1   bg-[#FFFDF3] flex-1">
            <div className="bg-background-secondary grid p-4">
                <div className="grid grid-cols-2 gap-2 place-items-center p-2">
                    {[1, 2, 3, 4].map((item, index) => (
                        <motion.div
                            key={index}
                            className="bg-details w-[400px] h-[250px] shadow-md shadow-background place-items-center content-center text-text-main rounded-xl p-2 cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            onClick={() => handleExpand(index)}
                        >
                            <h1 className="text-2xl font-bold mb-2">
                                Leonardo Lobas
                            </h1>
                            <p className="text-xl mb-1">
                                Comprou:{" "}
                                <span className="font-semibold">1500$$</span>
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
            {/* <form
                onSubmit={handleSubmit(submit, (errors) => console.log(errors))}
                className="bg-[#1A1A1A] rounded-2xl place-items-center  grid grid-cols-2"
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
                    className="relative bg-transparent font-bold text-lg p-2 cursor-pointer tracking-[0.1rem] text-white"
                    type="submit"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    Cadastrar
                    <span
                        className={`absolute bottom-0 left-0 h-0.5 bg-amber-50 transition-all duration-300 ease-in-out ${
                            isHovered ? "w-full" : "w-0"
                        }`}
                    ></span>
                </button>
            </form> */}
        </div>
    );
};

export default CadastroClientes;
