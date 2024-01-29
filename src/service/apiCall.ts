import axios, { AxiosRequestConfig } from 'axios';

interface IBuilder {}
export class AxiosBuilder<T> implements IBuilder {
  constructor(
    private readonly method: string,
    private readonly config: AxiosRequestConfig,
  ) {
    this.method = method;
    this.config = config;
  }

  public async call() {
    return await axios<T>({
      ...this.config,
      method: this.method,
    });
  }
}
