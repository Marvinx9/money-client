import styled from "styled-components";

export const Container = styled.form`
    h2 {
        color: var(--green);
        font-size: 1.5rem;
        margin-bottom: 2rem;
    }

    input {
        width: 100%;
        padding: 0 1.5rem;
        height: 4rem;
        border-radius: 0.25rem;

        border: 1px solid #d7d7d7;
        background-color: var(--full-black);

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
        background: var(--green);
        border-radius: 0.25rem;
        border: 0;
        font-size: 1rem;
        margin-top: 1.5rem;
        font-weight: 600;

        transition: 0.2s;

        &:hover {
            filter: brightness(0.9)
        }
    }
`;

export const TransactionTypeContainer = styled.div`
    margin-top: 1.2rem;
    margin-bottom: 1.2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;

    button {
        height: 4rem;
        border: 1px;
        border-radius: 0.25rem;
        width: 100%;
        padding: 0 1.5rem;

        background: var(--gray);

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
            color: var(--gray);
        }
    }
`;