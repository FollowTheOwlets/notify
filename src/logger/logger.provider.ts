import { Reflector } from '@nestjs/core';
import { Injectable } from '@nestjs/common';
import { LoggerService } from '~src/logger/logger.service';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

@Injectable()
export class LoggerProvider {
  private readonly base: string;

  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
  ) {
    this.base = join(__dirname, '../../');
  }

  createLogger(target: unknown): LoggerService {
    const error = new Error();
    const stackLines = error.stack?.split('\n');
    const callerLine = stackLines && stackLines.length > 2 ? stackLines[2] : '';
    const filePath = callerLine.match(/\((.*):\d+:\d+\)/)?.[1] || '';

    return new LoggerService(target.constructor.name, filePath.replace(this.base + 'src/', ''), this.configService);
  }
}
