const Header = () => {
    return (
        <header className=" flex  h-23 w-full bg-black">
            <nav className="flex w-full text-lg items-center justify-center  text-gray-200">
                <ul className="flex gap-15">
                    <li className="relative group">
                        <a href="#" className=" relative inline-block py-2">
                            Visão geral
                        </a>
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-200 transition-all duration-300 ease-in-out group-hover:w-full"></span>
                    </li>

                    <li className="relative group">
                        <a href="#" className="relative inline-block py-2">
                            Cadastros clientes
                        </a>
                        <span className=" absolute bottom-0 left-0 w-0 h-0.5 bg-gray-200 transition-all duration-300 ease-in-out group-hover:w-full"></span>
                    </li>
                    <li className="relative group">
                        <a href="#" className="relative inline-block py-2">
                            Vendas
                        </a>
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-200 transition-all duration-300 ease-in-out group-hover:w-full"></span>
                    </li>
                    <li className="relative group">
                        <a href="#" className="relative inline-block py-2">
                            Despesas
                        </a>
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-200 transition-all duration-300 ease-in-out group-hover:w-full"></span>
                    </li>
                </ul>
            </nav>
            <form className="flex w-[100%] not-even:justify-center items-center ">
                <label className="mb-2 text-sm font-medium  sr-only">
                    Search
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-black "
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className="block w-full  p-4 ps-10 text-sm text-gray-900 border bg-b border-gray-300 rounded-lg bg-gray-300"
                        placeholder="Clientes..."
                        required
                    />
                    <button
                        type="submit"
                        className="text-white absolute end-2.5 bottom-2.5 bg-black hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
                    >
                        Pesquisar
                    </button>
                </div>
            </form>
        </header>
    );
};

export default Header;
