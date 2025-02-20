import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Home from "./Home.tsx";
import Header from "./Components/header.tsx";
import Footer from "./Components/Footer.tsx";
import CadastroClientes from "./Components/CadastroClientes.tsx";

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
    <BrowserRouter>
        <main className="min-h-screen flex flex-col">
            {" "}
            <Header />
            <Routes>
                <Route path="/" element={<Navigate to={"/Home"} />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/CadastroCliente" element={<CadastroClientes />} />
            </Routes>
            <Footer />
        </main>
    </BrowserRouter>
);
