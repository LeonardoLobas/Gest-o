const Header = () => {
    return (
        <header className=" flex line- h-23 w-full bg-black">
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
        </header>
    );
};

export default Header;
