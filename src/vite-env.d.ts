/// <reference types="vite/client" />
declare type Prettify<T> = {
  [K in typeof T]: T[K];
} & Record<string, never>;

interface ImportMetaEnv {
  readonly VITE_GOOGLE_CLIENT_ID: string;
  readonly VITE_BACKEND_URL: string;
  readonly VITE_SOCKET_URL: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
