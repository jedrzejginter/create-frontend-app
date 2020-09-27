declare namespace NodeJS {
  // For explanation of those env variables see .env.example
  interface ProcessEnv {
    API_URL: string;
    DEFAULT_USER_EMAIL?: string;
    DEFAULT_USER_PASSWORD?: string;
  }
}
