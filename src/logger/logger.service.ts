import { ConfigService } from '@nestjs/config';
import { ConsoleLogger } from '@nestjs/common';
import * as fs from 'fs';

interface IOptions {
  enabled: boolean;
  fileLogEnabled: boolean;
  externalLogServerUrl: string;
  externalLogServerEnabled: boolean;
}

export class LoggerService {
  private static readonly LOG_DIR = './logs';
  private static readonly FILENAME: string = `${LoggerService.LOG_DIR}/${new Date().getTime()}.log`;
  private configuration: IOptions;
  private consoleLogger: ConsoleLogger;

  constructor(
    private readonly serviceName: string,
    private readonly path: string,
    private readonly configService: ConfigService,
  ) {
    this.consoleLogger = new ConsoleLogger(serviceName, { timestamp: true });
    this.configuration = this.configService.get('logging');
    this.createDir();
  }

  public async W(msg: string) {
    if (this.configuration.enabled) {
      this.extLog(msg, 'WARN');
      this.consoleLogger.warn(msg);
    }
  }

  public async D(msg: string) {
    if (this.configuration.enabled) {
      this.extLog(msg, 'DEBUG');
      this.consoleLogger.debug(msg);
    }
  }

  public async L(msg: string) {
    if (this.configuration.enabled) {
      this.extLog(msg, 'LOG');
      this.consoleLogger.log(msg);
    }
  }

  public async E(msg: string) {
    if (this.configuration.enabled) {
      this.extLog(msg, 'ERROR');
      this.consoleLogger.error(msg);
    }
  }

  private format(msg: string, logLevel: string) {
    const time = `[ ${new Date().toLocaleString().padEnd(20, ' ')} ]`;
    const level = logLevel.padStart(6, ' ');
    return `${time} ${level} [${this.serviceName}] ${msg}`;
  }

  private extLog(msg: string, logLevel: string) {
    const pattern = this.format(msg, logLevel);
    this.file(pattern);
  }

  private file(msg: string) {
    if (this.configuration.fileLogEnabled) {
      fs.appendFileSync(LoggerService.FILENAME, msg, 'utf-8');
    }
  }

  private externalServer(msg: string) {
    if (this.configuration.externalLogServerEnabled) {
    }
  }

  private createDir() {
    if (!fs.existsSync(LoggerService.LOG_DIR)) {
      fs.mkdirSync(LoggerService.LOG_DIR, { recursive: true });
    }
  }
}
