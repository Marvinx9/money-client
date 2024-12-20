import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, SwitchButton } from "./style";
import { loginService } from "../services/login.service";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await loginService.execute({
        username,
        password,
      });

      if (response?.access_token) {
        localStorage.setItem("access_token", response.access_token);
        navigate("/dashboard");
      } else {
        setErrorMessage("Credenciais inválidas.");
      }
    } catch (error) {
      setErrorMessage("Erro ao realizar login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Entrando..." : "Entrar"}
        </button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </Form>
      <SwitchButton onClick={() => navigate("/register")}>
        Não tem uma conta? Cadastre-se
      </SwitchButton>
    </Container>
  );
};

export default Login;
