export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            keyframes: {
                movingBorder: {
                    "0%": { width: "0%" },
                    "50%": { width: "100%" },
                    "100%": { width: "0%" },
                },
            },
            animation: {
                movingBorder: "movingBorder 2s infinite ease-in-out",
            },
        },
    },
    plugins: [],
};
