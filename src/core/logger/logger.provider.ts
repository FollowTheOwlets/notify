import { Inject, Injectable, Logger } from '@nestjs/common';
import { join } from 'path';
import { CustomLoggerService } from '~src/core/logger/logger.service';
import { IOptions } from '~src/core/logger/options';

@Injectable()
export class LoggerProvider {
  private readonly base: string;

  constructor(@Inject('LOGGER_CONFIG') private readonly configuration: IOptions) {
    this.base = join(__dirname, '../../');
  }

  createLogger(target: unknown): Logger {
    const error = new Error();
    const stackLines = error.stack?.split('\n');
    const callerLine = stackLines && stackLines.length > 2 ? stackLines[2] : '';
    const filePath = callerLine.match(/\((.*):\d+:\d+\)/)?.[1] || '';

    return new CustomLoggerService(
      this.configuration,
      target.constructor.name,
      filePath.replace(this.base + 'src/', ''),
    );
  }
}
