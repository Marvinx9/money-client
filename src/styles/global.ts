import {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
:root {
    --full-black: #121214;
    --background: #323238;
    --red: #F75A68;
    --green: #015F43;
    --gray: #E1E1E6;
    --light-gray: #C4C4CC
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

button {
    cursor: pointer;
}

[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
}
`
