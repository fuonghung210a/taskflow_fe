import { useState } from "react";

type Props = {
  onSubmit: (values: {
    email: string;
    password: string;
  }) => Promise<void> | void;
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
        <label>Password</label>
      </div>
    </form>
  );
};
