import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="flex h-24 w-full bg-black  px-8">
            <nav className="flex  w-[100%] items-center justify-center pl-36 ">
                <ul className="flex gap-10 text-lg text-gray-200">
                    <li className="relative group">
                        <a
                            href="/visao-geral"
                            className="relative inline-block py-2"
                        >
                            Visão geral
                        </a>
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-200 transition-all duration-300 ease-in-out group-hover:w-full"></span>
                    </li>

                    <li className="relative group">
                        <Link
                            to="/CadastroCliente"
                            className="relative inline-block py-2"
                        >
                            Cadastros clientes
                        </Link>
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-200 transition-all duration-300 ease-in-out group-hover:w-full"></span>
                    </li>

                    <li className="relative group">
                        <a
                            href="/vendas"
                            className="relative inline-block py-2"
                        >
                            Vendas
                        </a>
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-200 transition-all duration-300 ease-in-out group-hover:w-full"></span>
                    </li>

                    <li className="relative group">
                        <a
                            href="/despesas"
                            className="relative inline-block py-2"
                        >
                            Despesas
                        </a>
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-200 transition-all duration-300 ease-in-out group-hover:w-full"></span>
                    </li>
                </ul>
            </nav>
            <div className="flex  justify-end content-end">
                <form className="flex items-center ">
                    <label className="sr-only">Search</label>
                    <div className="relative">
                        <input
                            type="search"
                            id="default-search"
                            className="block w-60 p-3 pl-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-100"
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
        </header>
    );
};

export default Header;
