import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

interface MenuItem {
    path: string;
    label: string;
}

const menuItems: MenuItem[] = [
    { path: "/Home", label: "Home" },
    { path: "/CadastroCliente", label: "Cadastro clientes" },
    { path: "/Vendas", label: "Vendas" },
    { path: "/Despesas", label: "Despesas" },
];

const Header = () => {
    const location = useLocation();
    return (
        <motion.header
            initial={{ y: -100, opacity: 1 }} // Começa fora da tela, acima
            animate={{ y: 0, opacity: 1 }} // Desce suavemente
            transition={{ duration: 1, ease: "easeOut" }} // Tempo da animação
            className="flex h-24 w-full bg-[#1A1A1A]  px-8"
        >
            <nav className="flex  w-[100%] items-center justify-center pl-36 ">
                <ul className="flex gap-10 text-lg text-amber-50">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <li key={item.path} className="relative group">
                                {" "}
                                <Link
                                    to={item.path}
                                    className="relative inline-block py-2"
                                >
                                    {item.label}
                                </Link>
                                <span
                                    className={`absolute bottom-0 left-0 h-0.5 bg-black transition-all duration-300 ease-in-out ${
                                        isActive
                                            ? "w-full"
                                            : "w-0 group-hover:w-full"
                                    }`}
                                ></span>
                            </li>
                        );
                    })}
                </ul>
            </nav>
            <div className="flex  justify-end content-end">
                <form className="flex items-center ">
                    <label className="sr-only">Search</label>
                    <div className="relative">
                        <input
                            type="search"
                            id="default-search"
                            className="block w-60 p-3 pl-5 text-sm text-gray-900 border border-black rounded-lg bg-gray-100"
                            placeholder="Clientes..."
                            required
                        />
                        <button
                            type="submit"
                            className="absolute right-2 bottom-1 w-10 h-10 text-white flex items-center justify-center rounded cursor-pointer group"
                        >
                            <svg
                                className="w-4 h-4 text-gray-500 group-hover:text-black"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </motion.header>
    );
};

export default Header;
