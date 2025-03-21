import React from "react";
import {
    UseFormRegister,
    FieldError,
    FieldValues,
    Path,
    FieldErrorsImpl,
    Merge,
} from "react-hook-form";

interface InputProps<T extends FieldValues> {
    label: string;
    name: Path<T>;
    type: string;
    placeholder: string;
    register: UseFormRegister<T>;
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<T>>;
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
                className="block text-sm  text-amber-50 font-bold"
            >
                {label}
            </label>
            <input
                {...register(name)}
                type={type}
                id={name}
                placeholder={placeholder}
                className="mt-1 p-2  bg-[#E0E0E0] text-[#000000] rounded-md w-full placeholder-[#B0B0B0]"
            />
            <div className="h-4">
                <p className="text-red-700 text-sm mt-1">
                    {error ? String(error.message) : ""}
                </p>
            </div>
        </div>
    );
};

export default Input;
