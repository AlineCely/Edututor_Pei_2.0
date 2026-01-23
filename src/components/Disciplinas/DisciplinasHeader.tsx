export default function DisciplinasHeader() {
  return (
    <div style={{ marginBottom: "24px" }}>
      <h1>Gestão de Disciplinas</h1>
      <p style={{ color: "#666" }}>17 disciplina(s) cadastrada(s)</p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "16px",
          gap: "12px"
        }}
      >
        {/* Busca */}
        <input
          type="text"
          placeholder="Buscar por nome da disciplina"
          style={{
            width: "320px",
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            background: "#f9f9f9",
            color: "#333"
          }}
        />

        {/* Ações */}
        <div style={{ display: "flex", gap: "12px" }}>
          <button>Exportar</button>
          <button
            style={{
              background: "#2563eb",
              color: "#fff",
              borderRadius: "8px",
              padding: "8px 16px",
              border: "none"
            }}
          >
            Nova Disciplina
          </button>
        </div>
      </div>
    </div>
  );
}
