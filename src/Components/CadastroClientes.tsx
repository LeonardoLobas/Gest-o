import { Path, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import Input from "./ui/Input";
import { useEffect } from "react";

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

    return (
        <div className="grid grid-cols-2 gap-4 p-8 bg-[#FFFDF3] flex-1">
            <div className="bg-amber-800 rounded-2xl">
                AQUI E A PAGINA DE CADASTROS
            </div>
            <form
                onSubmit={handleSubmit(submit, (errors) => console.log(errors))}
                className="bg-amber-800 rounded-2xl place-items-center  grid grid-cols-2"
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
                    className="bg-blue-500   w-40 h-10 rounded-md p-2 cursor-pointer text-white"
                    type="submit"
                >
                    Cadastrar
                </button>
            </form>
        </div>
    );
};

export default CadastroClientes;
