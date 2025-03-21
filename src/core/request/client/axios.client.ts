import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { LoggerProvider } from '~src/core/logger/logger.provider';
import { ConfigService } from '@nestjs/config';
import { FunctionUtils } from '~src/utils/fun.utils';
import { IAxiosClientConfig } from '~src/core/request/client/types';

@Injectable()
export class AxiosClient {
  private log: Logger;
  private client: AxiosInstance;
  private config: IAxiosClientConfig;

  constructor(
    private readonly configService: ConfigService,
    loggerProvider: LoggerProvider,
  ) {
    this.log = loggerProvider.createLogger(this);
    this.config = this.configService.get('axios.config');
    this.client = axios.create(this.configService.get('axios.client'));
  }

  get<T>(path: string): Promise<AxiosResponse<T>> {
    return FunctionUtils.repeatable(
      () => this.client.get(path),
      this.config.repeats,
      (err) => this.log.error(err.message),
    ) as Promise<AxiosResponse<T>>;
  }

  post<T>(path: string, body: NonNullable<unknown>): Promise<AxiosResponse<T>> {
    return FunctionUtils.repeatable(
      () => this.client.post(path, body),
      this.config.repeats,
      (err) => this.log.error(err.message),
    ) as Promise<AxiosResponse<T>>;
  }

  put<T>(path: string, body: NonNullable<unknown>): Promise<AxiosResponse<T>> {
    return FunctionUtils.repeatable(
      () => this.client.put(path, body),
      this.config.repeats,
      (err) => this.log.error(err.message),
    ) as Promise<AxiosResponse<T>>;
  }

  delete<T>(path: string, body: NonNullable<unknown>): Promise<AxiosResponse<T>> {
    return FunctionUtils.repeatable(
      () => this.client.put(path, body),
      this.config.repeats,
      (err) => this.log.error(err.message),
    ) as Promise<AxiosResponse<T>>;
  }
}
