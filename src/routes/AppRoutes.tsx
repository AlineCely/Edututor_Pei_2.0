import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Alunos from "../pages/Alunos";
import Profissionais from "../pages/Profissionais";
import Disciplinas from "../pages/Disciplinas";
import Anamnese from "../pages/Anamnese";
import PEI from "../pages/PEI";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/alunos" element={<Alunos />} />
                {/* <Route path="/agenda" element={<Agenda />} /> */}
                <Route path="/profissionais" element={<Profissionais />} />
                <Route path="/disciplina" element={<Disciplinas />} />
                <Route path="/anamnese" element={<Anamnese />} />
                <Route path="/pei" element={<PEI />} />
                {/* <Route path="/relatorios" element={<Relatorios />} /> */}

                {/* rota 404 */}
                <Route path="*" element={<h1>Página não encontrada</h1>} />
            </Routes>
        </BrowserRouter>
    );
}
