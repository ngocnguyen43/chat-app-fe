/// <reference types="vite/client" />
declare type Prettify<T> = {
  [K in typeof T]: T[K];
} & Record<string, never>;
