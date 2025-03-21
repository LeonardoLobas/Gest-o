import React from "react";
import {
    UseFormRegister,
    FieldError,
    FieldValues,
    Path,
} from "react-hook-form";

interface InputProps<T extends FieldValues> {
    label: string;
    name: Path<T>;
    type: string;
    placeholder: string;
    register: UseFormRegister<T>;
    error?: FieldError;
}

const Input = <T extends FieldValues>({
    label,
    name,
    type,
    placeholder,
    register,
    error,
}: InputProps<T>) => {
    return (
        <div className="mb w-full items-center p-3">
            <label
                htmlFor={name}
                className="block text-sm font-medium text-amber-50"
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
            <div className="h-4">
                <p className="text-red-500 text-sm mt-1">{error?.message}</p>
            </div>
        </div>
    );
};

export default Input;
