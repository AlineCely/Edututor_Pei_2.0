import Pagination from "../Table/Pagination";

interface Disciplina {
    nome: string;
    descricao: string;
    ativo: boolean;
    cadastro: string;
}

const disciplinas: Disciplina[] = Array.from({ length: 10 }).map(() => ({
    nome: "Fundamentos de Informática",
    descricao: "Descrição",
    ativo: true,
    cadastro: "29 Dec 2022"
}));

export default function DisciplinasTable() {
    return (
        <div
            style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "16px",
                color: "#333",
            }}
        >
            {/* Filtros */}
            <div style={{ display: "flex", gap: "12px", marginBottom: "16px", }}>
                <select style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc", backgroundColor: "#f9f9f9", color: "#555" }}>
                    <option>Status</option>
                    <option>Ativo</option>
                    <option>Inativo</option>
                </select>

                <select style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc", backgroundColor: "#f9f9f9", color: "#555" }}>
                    <option>Selecionar CID</option>
                </select>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ borderBottom: "1px solid #eee", textAlign: "left" }}>
                        <th>Nome da Disciplina</th>
                        <th>Descrição</th>
                        <th>Ativo</th>
                        <th>Cadastrado em</th>
                        <th>Ação</th>
                    </tr>
                </thead>

                <tbody>
                    {disciplinas.map((d, index) => (
                        <tr key={index} style={{ borderBottom: "1px solid #f1f1f1" }}>
                            <td style={{ padding: "12px" }}>{d.nome}</td>
                            <td>{d.descricao}</td>
                            <td>
                                <span
                                    style={{
                                        color: d.ativo ? "#16a34a" : "#dc2626",
                                        fontWeight: 500
                                    }}
                                >
                                    {d.ativo ? "Ativo" : "Inativo"}
                                </span>
                            </td>
                            <td>{d.cadastro}</td>
                            <div style={{ display: "flex", gap: "8px", marginTop: "6px" }}>
                                <button
                                    style={{
                                        padding: "8px 12px",
                                        borderRadius: "6px",
                                        border: "1px solid #d1d5db",
                                        backgroundColor: "white",
                                        cursor: "pointer",
                                        fontSize: "14px",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "4px",
                                        transition: "all 0.2s",
                                        color: "#374151"
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = "#f3f4f6";
                                        e.currentTarget.style.borderColor = "#9ca3af";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = "white";
                                        e.currentTarget.style.borderColor = "#d1d5db";
                                    }}
                                >
                                    👁️ Ver
                                </button>
                                <button
                                    style={{
                                        padding: "8px 12px",
                                        borderRadius: "6px",
                                        border: "1px solid #d1d5db",
                                        backgroundColor: "white",
                                        cursor: "pointer",
                                        fontSize: "14px",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "4px",
                                        transition: "all 0.2s",
                                        color: "#374151"
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = "#f3f4f6";
                                        e.currentTarget.style.borderColor = "#9ca3af";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = "white";
                                        e.currentTarget.style.borderColor = "#d1d5db";
                                    }}
                                >
                                    ✏️ Editar
                                </button>
                            </div>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination />
        </div>
    );
}
