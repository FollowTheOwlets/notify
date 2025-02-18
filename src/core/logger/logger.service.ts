import { ConsoleLogger, Injectable, Logger } from '@nestjs/common';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { IOptions } from '~src/core/logger/options';
import { JsonUtils } from '~src/utils/json.utils';

@Injectable()
export class CustomLoggerService extends Logger {
  private static readonly logFile: string = CustomLoggerService.createLogFile();
  private consoleLogger: ConsoleLogger;
  private readonly enable: boolean;

  constructor(
    private readonly configuration: IOptions,
    private readonly serviceName: string,
    pathName: string,
  ) {
    super(serviceName);
    this.consoleLogger = new ConsoleLogger(serviceName, { timestamp: true });
    this.enable = this.configuration.enabled.includes(pathName);
  }

  log(message: string, ...args: any[]) {
    if (this.enable) {
      super.log(message, args);
      this.extLog('LOG', message, args);
    }
  }

  warn(message: string, ...args: any[]) {
    if (this.enable) {
      super.warn(message, args);
      this.extLog('WARN', message, args);
    }
  }

  debug(message: string, ...args: any[]) {
    if (this.enable) {
      super.debug(message, args);
      this.extLog('DEBUG', message, args);
    }
  }

  error(message: string, ...args: any[]) {
    if (this.enable) {
      super.error(message, args);
      this.extLog('ERROR', message, args);
    }
  }

  private format(logLevel: string, msg: string, ...args: any[]) {
    const time = `[ ${new Date().toLocaleString()} ]`;
    const level = logLevel.padStart(6, ' ');
    const argsStr = args.map((arg) => JsonUtils.stringify(arg, this.configuration.jsonSerializeLevel));
    return `${time} ${level} [${this.serviceName}] ${msg} ${argsStr}`;
  }

  private extLog(logLevel: string, msg: string, ...args: any[]) {
    const formattedMsg = this.format(logLevel, msg, args);
    this.fileLog(formattedMsg);
    this.externalServerLog(formattedMsg);
  }

  private fileLog(msg: string) {
    if (this.configuration.fileLogEnabled) {
      fs.appendFileSync(CustomLoggerService.logFile, msg + '\n', 'utf-8');
    }
  }

  private async externalServerLog(msg: string) {
    if (this.configuration.externalLogServerEnabled && this.configuration.externalLogServerUrl) {
      try {
        //await axios.default.post(this.configuration.externalLogServerUrl, { message: msg });
      } catch (error) {
        this.consoleLogger.error(`Failed to send log to external server: ${error.message}`);
      }
    }
  }

  private static createLogFile() {
    const logDir = './logs';
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    return path.join(logDir, `${Date.now()}.log`);
  }
}
