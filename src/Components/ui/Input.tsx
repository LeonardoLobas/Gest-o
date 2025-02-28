import React from "react";
import { UseFormRegister, FieldError } from "react-hook-form";
import { FormData } from "../CadastroClientes";

// Tipo de propriedades do input
interface InputProps {
    label: string;
    name: keyof FormData | `endereco.${keyof FormData["endereco"]}`;
    type: string;
    placeholder: string;
    register: UseFormRegister<FormData>;
    error?: FieldError;
}

const Input: React.FC<InputProps> = ({
    label,
    name,
    type,
    placeholder,
    register,
    error,
}) => {
    return (
        <div className="mb-4">
            <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700"
            >
                {label}
            </label>
            <input
                {...register(name)}
                type={type}
                id={name}
                placeholder={placeholder}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
            {error && (
                <span className="text-red-500 text-sm">{error.message}</span>
            )}
        </div>
    );
};

export default Input;
