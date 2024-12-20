const pathBuilder = (mode: string) => {
  const production = process.env.API_URL_PRODUCTION;
  const development = process.env.API_URL_DEVELOPMENT;

  return mode === "production" ? production : development;
};

// const baseURL = pathBuilder(process.env.MODE);
const baseURL = 'http://localhost:8080/'


export { baseURL };
