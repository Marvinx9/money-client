import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Form, SwitchButton } from './styles';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isRegister) {
        console.log('Registro:', { email, password });
        return;
      }

      const response = await axios.post('http://localhost:8080/auth/login', {
        username: email,
        password,
      });

      console.log('Resposta da API:', response.data);

      const { access_token, id, e_mail } = response.data;
      localStorage.setItem('authToken', access_token);
      localStorage.setItem('userId', id.toString());
      localStorage.setItem('userEmail', e_mail);

      onLogin();
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Erro ao fazer login:', error);
      setErrorMessage(
        error.response?.data?.message || 'Erro ao realizar login. Tente novamente.'
      );
    }
  };

  return (
    <Container>
      <h2>{isRegister ? 'Criar Conta' : 'Login'}</h2>
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
        <button type="submit">
          {isRegister ? 'Registrar' : 'Entrar'}
        </button>
      </Form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <SwitchButton onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? 'Já possui conta? Faça login' : 'Criar uma nova conta'}
      </SwitchButton>
    </Container>
  );
};
