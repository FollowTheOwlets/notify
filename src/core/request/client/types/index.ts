import { AxiosRequestConfig, Method } from 'axios';

export type IRequestConfig = Omit<AxiosRequestConfig, 'method'> & {
  host: string;
  url: string;
  timeout: number;
  method: Method;
  withAuth?: boolean;
  databaseCode?: string;
};

export interface IAxiosClientConfig {
  repeats: number;
}
