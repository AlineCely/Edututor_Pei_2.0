export default function PEIHeader() {
  return (
    <div style={{ marginBottom: "24px" }}>
      <h1>Planos de Ensino Individualizado</h1>
      <p style={{ color: "#666" }}>
        Gerencie os PEIs dos estudantes com autismo
      </p>

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
          placeholder="Buscar por estudante"
          style={{
            width: "360px",
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            backgroundColor: "#f9f9f9",
            color: "#555"
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
            Novo PEI
          </button>
        </div>
      </div>
    </div>
  );
}
