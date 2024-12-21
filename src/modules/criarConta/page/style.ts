import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #121214;

  h2 {
    color: #015f43;
    margin-bottom: 2rem;
    font-size: 2rem;
  }

  p {
    font-size: 1rem;
    margin-top: 1rem;
    text-align: center;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;

  input {
    width: 100%;
    padding: 1rem;
    margin-bottom: 1rem;
    border: 1px solid #d7d7d7;
    border-radius: 0.25rem;
    font-size: 1rem;
    background: #fff;
    color: #121214;

    &::placeholder {
      color: #a8a8b3;
    }
  }

  button {
    width: 100%;
    padding: 1rem;
    background: #015f43;
    color: #fff;
    border: none;
    border-radius: 0.25rem;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: #016f4c;
    }

    &:disabled {
      background: #9e9e9e;
      cursor: not-allowed;
    }
  }
`;

export const SwitchButton = styled.button`
  margin-top: 1rem;
  background: none;
  color: #ffffff;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: underline;
  transition: color 0.2s;

  &:hover {
    color: #c4c4cc;
  }
`;
