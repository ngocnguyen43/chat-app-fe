/// <reference types="vite/client" />
declare type Prettify<T> = {
  [K in typeof T]: T[K];
} & Record<string, never>;

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
  readonly VITE_SOCKET_URL: string;
  readonly VITE_BASE_RESOURCE: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
