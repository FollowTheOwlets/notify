import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';
import { LoggerService } from '~src/logger/logger.service';
import { LoggerProvider } from '~src/logger/logger.provider';

@Controller('health')
export class HealthController {
  private log: LoggerService;

  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    loggerProvider: LoggerProvider,
  ) {
    this.log = loggerProvider.createLogger(this);
  }

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([() => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com')]);
  }
}
