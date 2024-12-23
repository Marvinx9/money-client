import styled from "styled-components";
import { transparentize } from "polished";

export const Container = styled.form`
  h2 {
    color: #015f43;
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  input {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    border-radius: 0.25rem;

    border: 1px solid #d7d7d7;
    background-color: #121214;
    color: #d7d7d7;

    font-weight: 400;
    font-size: 1rem;

    & + input {
      margin-top: 1rem;
    }
  }

  button[type="submit"] {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    background: #015f43;
    border-radius: 0.25rem;
    border: 0;
    font-size: 1rem;
    margin-top: 1.5rem;
    font-weight: 600;

    transition: 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;

export const TransactionTypeContainer = styled.div`
  margin-top: 1.2rem;
  margin-bottom: 1.2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

interface RadioBoxProps {
  isActive: boolean;
  activeColor: "green" | "red";
}

const colors = {
  green: "#015F43",
  red: "#F75A68",
};

export const RadioBox = styled.button<RadioBoxProps>`
  height: 4rem;
  border: 1px;
  border-radius: 0.25rem;
  width: 100%;
  padding: 0 1.5rem;

  background: ${(props) =>
    props.isActive
      ? transparentize(0.7, colors[props.activeColor])
      : "#323240"};

  display: flex;
  align-items: center;
  justify-content: center;

  transition: 0.2s;

  &:hover {
    filter: brightness(0.9);
  }

  img {
    width: 20px;
    height: 20px;
  }

  span {
    display: inline-block;
    margin-left: 1rem;
    font-size: 1rem;
    color: #e1e1e6;
  }
`;
