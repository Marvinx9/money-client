<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <header>
    <h1>Administração de Finanças - Front-End</h1>
    <p>
      Este projeto é o front-end de uma aplicação web para administração de finanças, 
      onde os usuários podem gerenciar transações, acompanhar um resumo financeiro e criar uma conta para acessar o sistema. 
      A aplicação foi desenvolvida com <strong>React</strong>, utilizando <strong>styled-components</strong> para a estilização, 
      <strong>React Router</strong> para navegação e integrações com APIs back-end.
    </p>
  </header>

  <nav>
    <h2>Índice</h2>
    <ul>
      <li><a href="#demonstração">Demonstração</a></li>
      <li><a href="#funcionalidades">Funcionalidades</a></li>
      <li><a href="#pré-requisitos">Pré-requisitos</a></li>
      <li><a href="#instalação-e-configuração">Instalação e Configuração</a></li>
      <li><a href="#scripts-disponíveis">Scripts Disponíveis</a></li>
      <li><a href="#estrutura-do-projeto">Estrutura do Projeto</a></li>
      <li><a href="#tecnologias-utilizadas">Tecnologias Utilizadas</a></li>
      <li><a href="#contribuições">Contribuições</a></li>
      <li><a href="#licença">Licença</a></li>
    </ul>
  </nav>

  <section id="demonstração">
    <h2>Demonstração</h2>
    <p>Adicione um link ou captura de tela da aplicação hospedada (exemplo: Vercel, Netlify).</p>
  </section>

  <section id="funcionalidades">
    <h2>Funcionalidades</h2>
    <ul>
      <li><strong>Autenticação</strong>: Login de usuários com armazenamento seguro de tokens de acesso.</li>
      <li><strong>Gerenciamento de Transações</strong>: Adicionar, visualizar e excluir transações financeiras.</li>
      <li><strong>Resumo Financeiro</strong>: Visualizar total de entradas, saídas e saldo.</li>
      <li><strong>Criação de Conta</strong>: Cadastro de novos usuários para acesso à aplicação.</li>
      <li><strong>Design Responsivo</strong>: Experiência otimizada para dispositivos móveis e desktop.</li>
    </ul>
  </section>

  <section id="pré-requisitos">
    <h2>Pré-requisitos</h2>
    <p>Antes de começar, você precisará ter instalado em sua máquina:</p>
    <ul>
      <li><strong>Node.js</strong> (versão >= 16)</li>
      <li><strong>npm</strong> ou <strong>yarn</strong></li>
      <li>Um navegador web moderno (ex.: Google Chrome).</li>
    </ul>
  </section>

  <section id="instalação-e-configuração">
    <h2>Instalação e Configuração</h2>
    <ol>
      <li><strong>Clone o repositório:</strong>
        <pre><code>git clone https://github.com/Marvinx9/money-client</code></pre>
      </li>
      <li><strong>Instale as dependências:</strong>
        <pre><code>npm install # ou yarn install</code></pre>
      </li>
      <li><strong>Configure o arquivo <code>.env</code>:</strong>
        <p>Crie um arquivo <code>.env</code> na raiz do projeto com as seguintes variáveis:</p>
        <pre><code>REACT_APP_API_BASE_URL=http://localhost:4000</code></pre>
      </li>
      <li><strong>Inicie o projeto:</strong>
        <pre><code>npm start
# ou
yarn start</code></pre>
      </li>
      <li><strong>Acesse a aplicação:</strong> Abra <a href="http://localhost:3000">http://localhost:3000</a> no navegador.</li>
    </ol>
  </section>

  <section id="scripts-disponíveis">
    <h2>Scripts Disponíveis</h2>
    <ul>
      <li><code>npm start</code>: Inicia o servidor de desenvolvimento.</li>
      <li><code>npm test</code>: Roda os testes unitários.</li>
      <li><code>npm build</code>: Cria a versão de produção do aplicativo.</li>
      <li><code>npm eject</code>: Expõe a configuração do Create React App (use com cuidado).</li>
    </ul>
  </section>

  <section id="estrutura-do-projeto">
    <h2>Estrutura do Projeto</h2>
    <pre><code>src/
├── components/        # Componentes reutilizáveis (Header, Summary, etc.)
├── hooks/             # Hooks customizados (useTransactions, etc.)
├── pages/             # Páginas da aplicação (Login, Dashboard, etc.)
├── services/          # Integrações com a API (loginService, criarContaService)
├── styles/            # Configuração global de estilos
├── utils/             # Utilitários auxiliares (formatadores, helpers, etc.)
└── App.tsx            # Arquivo principal do React
    </code></pre>
  </section>

  <section id="tecnologias-utilizadas">
    <h2>Tecnologias Utilizadas</h2>
    <ul>
      <li><strong>React</strong>: Biblioteca para criação de interfaces de usuário.</li>
      <li><strong>React Router</strong>: Gerenciamento de rotas.</li>
      <li><strong>styled-components</strong>: Estilização com CSS-in-JS.</li>
      <li><strong>Axios</strong>: Cliente HTTP para comunicação com a API.</li>
      <li><strong>TypeScript</strong>: Tipagem estática para um código mais robusto.</li>
    </ul>
  </section>

  <section id="contribuições">
    <h2>Contribuições</h2>
    <p>Contribuições são bem-vindas! Siga os passos abaixo para contribuir:</p>
    <ol>
      <li>Faça um fork do projeto.</li>
      <li>Crie uma branch para sua feature ou correção:
        <pre><code>git checkout -b minha-feature</code></pre>
      </li>
      <li>Faça commit das suas alterações:
        <pre><code>git commit -m "Adiciona nova funcionalidade"</code></pre>
      </li>
      <li>Envie para o repositório remoto:
        <pre><code>git push origin minha-feature</code></pre>
      </li>
      <li>Abra um pull request no GitHub.</li>
    </ol>
  </section>

  <section id="licença">
    <h2>Licença</h2>
    <p>Este projeto está licenciado sob a <a href="./LICENSE">MIT License</a>.</p>
  </section>
</body>
</html>
