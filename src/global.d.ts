type RequireOnly<T, P extends keyof T> = Pick<T, P> & Partial<Omit<T, P>>
