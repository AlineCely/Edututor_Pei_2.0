import Pagination from "../Table/Pagination";

interface Anamnese {
  crianca: string;
  aluno: string;
  profissional: string;
  dataAvaliacao: string;
  status: string;
  criadoEm: string;
}

const anamneses: Anamnese[] = Array.from({ length: 10 }).map(() => ({
  crianca: "Nome Criança",
  aluno: "Aluno",
  profissional: "Profissional",
  dataAvaliacao: "29/12/2022",
  status: "Ativo",
  criadoEm: "29/12/2022"
}));

export default function AnamneseTable() {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "16px",
        color: "#333"
      }}
    >
      {/* Filtros */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
        <select style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc", backgroundColor: "#f9f9f9", color: "#555" }}>
          <option>Todos status</option>
          <option>Ativo</option>
          <option>Inativo</option>
        </select>

        <input type="date" style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc", backgroundColor: "#f9f9f9", color: "#555" }}/>
        <input type="date" style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc", backgroundColor: "#f9f9f9", color: "#555" }}/>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #eee", textAlign: "left" }}>
            <th>Criança</th>
            <th>Aluno</th>
            <th>Profissional</th>
            <th>Data Avaliação</th>
            <th>Status</th>
            <th>Criado em</th>
            <th>Ação</th>
          </tr>
        </thead>

        <tbody>
          {anamneses.map((a, index) => (
            <tr key={index} style={{ borderBottom: "1px solid #f1f1f1" }}>
              <td style={{ padding: "12px" }}>{a.crianca}</td>
              <td>{a.aluno}</td>
              <td>{a.profissional}</td>
              <td>{a.dataAvaliacao}</td>
              <td>
                <span
                  style={{
                    color: a.status === "Ativo" ? "#16a34a" : "#dc2626",
                    fontWeight: 500
                  }}
                >
                  {a.status}
                </span>
              </td>
              <td>{a.criadoEm}</td>
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
