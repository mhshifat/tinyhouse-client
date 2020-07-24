/// <reference types="react-scripts" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      PUBLIC_URL: string;
      REACT_APP_G_CLIENT_ID: string;
      REACT_APP_API_URI: string;
    }
  }
}

export {};
