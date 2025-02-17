import { Body, Controller, Headers, Logger, Post, UseGuards } from '@nestjs/common';
import { EventsService } from '~src/events/events.service';
import { MessageDto } from '~src/api/v1/dto/message.dto';
import { LoggerProvider } from '~src/logger/logger.provider';
import { ConfigService } from '@nestjs/config';
import { MessageLevel } from '~src/messages/entity/message-level.enum';
import { SystemIncludeGuard } from '~src/api/guard/system-include.guard';
import headers from '~src/api/headers';

@Controller('api/v1')
@UseGuards(SystemIncludeGuard)
export class ApiController {
  private log: Logger;

  constructor(
    private readonly eventsService: EventsService,
    private readonly config: ConfigService,
    loggerProvider: LoggerProvider,
  ) {
    this.log = loggerProvider.createLogger(this);
  }

  @Post('/warning')
  public async warning(
    @Body() dto: MessageDto,
    @Headers(headers.X_REQUEST_ID) rqId: string,
    @Headers(headers.X_SYSTEM_SOURCE_ID) systemSourceId: string,
  ) {
    await this.eventsService.message({
      ...dto,
      rqId,
      level: MessageLevel.WARNING,
      transports: this.config.get(`service.producers.${systemSourceId}.transports`),
    });
  }

  @Post('/error')
  public async error(
    @Body() dto: MessageDto,
    @Headers(headers.X_REQUEST_ID) rqId: string,
    @Headers(headers.X_SYSTEM_SOURCE_ID) systemSourceId: string,
  ) {
    await this.eventsService.message({
      ...dto,
      rqId,
      level: MessageLevel.ERROR,
      transports: this.config.get(`service.producers.${systemSourceId}.transports`),
    });
  }

  @Post('/completed')
  public async completed(
    @Body() dto: MessageDto,
    @Headers(headers.X_REQUEST_ID) rqId: string,
    @Headers(headers.X_SYSTEM_SOURCE_ID) systemSourceId: string,
  ) {
    await this.eventsService.message({
      ...dto,
      rqId,
      level: MessageLevel.COMPLETED,
      transports: this.config.get(`service.producers.${systemSourceId}.transports`),
    });
  }

  @Post('/alert')
  public async alert(
    @Body() dto: MessageDto,
    @Headers(headers.X_REQUEST_ID) rqId: string,
    @Headers(headers.X_SYSTEM_SOURCE_ID) systemSourceId: string,
  ) {
    await this.eventsService.message({
      ...dto,
      rqId,
      level: MessageLevel.ALERT,
      transports: this.config.get(`service.producers.${systemSourceId}.transports`),
    });
  }
}
