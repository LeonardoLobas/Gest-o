import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./Home.tsx";
import Header from "./Components/header.tsx";
import Footer from "./Components/Footer.tsx";
import CadastroClientes from "./Components/CadastroClientes.tsx";

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/CadastroCliente" element={<CadastroClientes />} />
        </Routes>
        <Footer />
    </BrowserRouter>
);
