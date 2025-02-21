import { animate, keyframes } from "framer-motion";

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            keyframes: {
                borderAnimation: {
                    "0%": {
                        borderTopWidth: "0",
                        borderBottonWidth: "0",
                    },
                    "100%": {
                        borderTopWidth: "3px",
                        borderBottonWidth: "3px",
                    },
                },
            },
            animation: {
                borderAnimation: "borderAnimation 0.8s ease-out forward",
            },
        },
    },
    plugins: [],
};
