import { useState } from "react";
import type { LoginRequest } from "../../types/auth";

type Props = {
  onSubmit: (LoginRequest) => Promise<void> | void;
  loading?: boolean;
  serverError?: string | null;
};

const LoginForm: React.FC<Props> = ({ onSubmit, loading, serverError }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={submit} noValidate>
      <h1>Create your account</h1>

      <div style={{ marginBottom: 12 }}>
        <label>Work Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%" }}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          style={{ width: "100%" }}
        />
        <small>At least 8 characters</small>
      </div>

      {serverError && (
        <div role="alert" style={{ color: "red", marginBottom: 12 }}>
          {serverError}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        style={{ width: "100%", padding: "10px 16px" }}
      >
        {loading ? "Loading..." : "Create account"}
      </button>
    </form>
  );
};

export default LoginForm;
