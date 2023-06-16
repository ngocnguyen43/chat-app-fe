/// <reference types="vite/client" />
declare const google: any
declare type Prettify<T> = {
  [K in typeof T]: T[K]
} & Record<string, never>
