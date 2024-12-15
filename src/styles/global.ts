import {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
:root {
    --full-black: #121214;
    --shape: #323240;
    --background: #1F1F23;
    --red: #F75A68;
    --green: #015F43;
    --gray: #E1E1E6;
    --light-gray: #C4C4CC;
    --button-modal: #E1E1E6;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    @media (max-width: 100px) {
        front-size: 93.75%;
    }

    @media (max-width: 720px) {
        font-size: 87.5%;
    }
}

body {
    background: var(--background);
    -webkit-font-smoothing: antialiased;
}

body, input, textarea, button {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
}

h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
}

button {
    cursor: pointer;
}

[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
}

.react-modal-overlay {
    background: rgb(0, 0, 0, 0.5);
    
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;
}

.react-modal-content {
    width: 100%;
    max-width: 576px;
    background: var(--background);
    padding: 3rem;
    position: relative;
    border-radius: 0.24rem;
}

.react-modal-close {
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    border: 0;
    background: transparent;

    &:hover {
        filter: brightness(0.9);
        transition: 0.2s;
    }
}
`
