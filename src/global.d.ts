/// <reference types="vite/client" />
type RequireOnly<T, P extends keyof T> = Pick<T, P> & Partial<Omit<T, P>>;
type ArrayElementType<T> = T extends (infer U)[] ? U : never;
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
