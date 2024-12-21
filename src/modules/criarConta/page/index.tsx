import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, SwitchButton } from "./style";
import { criarContaService } from "../service/criarConta.service";

const CriarContaModal = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    e_mail: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCreateAccount = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await criarContaService.execute(formData);
      setSuccessMessage("Conta criada com sucesso! Você será redirecionado.");
      setTimeout(() => navigate("/"), 2000); // Redireciona após 2 segundos
    } catch (error) {
      setIsLoading(false);
      setErrorMessage("Erro ao criar conta. Tente novamente.");
    }
  };

  return (
    <Container>
      <h2>Criar Conta</h2>
      <Form onSubmit={handleCreateAccount}>
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="surname"
          placeholder="Sobrenome"
          value={formData.surname}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="e_mail"
          placeholder="E-mail"
          value={formData.e_mail}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Criando..." : "Criar Conta"}
        </button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      </Form>
      <SwitchButton onClick={() => navigate("/")}>
        Já tem uma conta? Faça login
      </SwitchButton>
    </Container>
  );
};

export default CriarContaModal;
