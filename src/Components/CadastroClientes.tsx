import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";

const validationCEP = async (cep: string) => {
    try {
        const response = await axios.get(
            `https://brasilapi.com.br/api/cep/v2/${cep}`
        );
        console.log(response);
        return response.data ? true : false;
    } catch {
        return false;
    }
};

const validationCPF = (cpf: string) => {
    const regexCpf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return regexCpf.test(cpf);
};

const registrationScheme = z.object({
    nome: z.string().min(8, "O nome deve ter pelos menos 8 caracteres"),
    telefone: z.string().min(10, "telefone inválido"),
    cpf: z.string().refine(validationCPF, {
        message: "CPF inválido. Use o formato xxx.xxx.xxx-xx",
    }),
    cep: z
        .string()
        .min(8, "CEP deve ter 8 caracteres")
        .refine(async (cep) => await validationCEP(cep), {
            message: "CEP inválido",
        }),
    endereco: z.object({
        rua: z.string().min(5, "A rua deve ter pelo menos 5 caracteres"),
        numero: z.string().min(1, "O número é obrigatório"),
        bairro: z.string().min(3, "O bairro deve ter pelo menos 3 caracteres"),
        cidade: z.string().min(3, "A cidade deve ter pelo menos 3 caracteres"),
        estado: z.string().min(2, "O estado deve ter 2 caracteres"),
    }),
});

type FormData = z.infer<typeof registrationScheme>;

const CadastroClientes = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(registrationScheme),
    });

    const submit = (data: FormData) => {
        alert(data);
    };

    return (
        <div className="grid grid-cols-2 gap-4 p-8 bg-amber-950 flex-1 ">
            <div className="bg-amber-800">AQUI E A PAGINA DE CADASTROS</div>
            <form onSubmit={handleSubmit(submit)} className="bg-amber-800">
                <div>
                    <label htmlFor="cep">CEP</label>
                    <input
                        {...register("cep")}
                        type="text"
                        id="cep"
                        placeholder="Digite seu CEP"
                        onSubmit={handleSubmit(submit)}
                    />
                    {errors.cep && (
                        <span className="text-red-500">
                            {errors.cep.message}
                        </span>
                    )}
                </div>
                <button
                    className="p-2 bg-blue-500 cursor-pointer text-white rounded"
                    type="submit"
                >
                    Enviar
                </button>
            </form>
        </div>
    );
};

export default CadastroClientes;
