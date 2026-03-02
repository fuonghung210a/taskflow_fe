import React from "react";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        style={{
          flex: 1,
          background: "#f5f8fb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 420,
            padding: 24,
            background: "white",
            borderRadius: 8,
            boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
          }}
        >
          {/* marketing card: ảnh + text */}
          <h3>Ship faster with shared boards</h3>
          <p>
            Organize tasks, track progress and celebrate milestones together.
          </p>
        </div>
      </aside>

      <main
        style={{
          width: 480,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 32,
        }}
      >
        <div style={{ width: "100%", maxWidth: 420 }}>{children}</div>
      </main>
    </div>
  );
};

export default AuthLayout;