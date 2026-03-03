import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useLayoutEffect, useState } from "react";
import type { LoginRequest } from "../types/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthSchema } from "../schemas/auth.schema";
import { AxiosError } from "axios";
import AuthLayout from "../layouts/AuthLayout";
import LoginForm from "../components/auth/LoginForm";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { login, user } = useAuth();
  const [redirecting, setRedirecting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(AuthSchema),
  });

  const onSubmit = async (data: LoginRequest) => {
    setError("");
    setIsLoading(true);

    try {
      await login(data);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(err.response?.data || "Lỗi kết nối");
      } else {
        setError("Đã xảy ra lỗi không mong muốn");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // If already logged in, redirect user to dashboard page
  useLayoutEffect(() => {
    if (user) {
      setRedirecting(true);
      navigate("/");
    }
  }, [user, navigate]);
  if (redirecting) return null;

  return (
    <AuthLayout>
      <LoginForm
        onSubmit={handleSubmit}
        loading={isLoading}
        serverError={error}
      ></LoginForm>
    </AuthLayout>
  );
};
