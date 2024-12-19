import { Form } from "react-router-dom";
import { Container } from "../../../shared/components/Summary/styles";

function Login() {
  return (
    <Container>
      <h2>{isRegister ? "Criar Conta" : "Login"}</h2>
      <Form onSubmit={handleSubmit}>
        <input
          type="username"
          placeholder="Digite seu usuario"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isRegister ? "Registrar" : "Entrar"}</button>
      </Form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <SwitchButton onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Já possui conta? Faça login" : "Criar uma nova conta"}
      </SwitchButton>
    </Container>
  );
}

export { Login };
