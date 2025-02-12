import { Controller, UseGuards } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RedisContext } from '@nestjs/microservices';
import { EventsService } from '~src/events/events.service';
import { ConfigService } from '@nestjs/config';
import { LoggerProvider } from '~src/logger/logger.provider';
import { LoggerService } from '~src/logger/logger.service';
import { RedisMessageDto } from '~src/consumers/redis/dto/redis-message.dto';
import { MessageLevel } from '~src/messages/entity/message-level.enum';
import { RedisSystemIncludeGuard } from '~src/consumers/redis/guard/redis-system-include.guard';
import { RedisValidationPipe } from '~src/consumers/redis/pipe/redis-validation.pipe';

@Controller('redis')
@UseGuards(RedisSystemIncludeGuard)
export class RedisController {
  private log: LoggerService;
  constructor(
    private readonly eventsService: EventsService,
    private readonly config: ConfigService,
    loggerProvider: LoggerProvider,
  ) {
    this.log = loggerProvider.createLogger(this);
  }
  @EventPattern('notify.complete.*')
  async handleCompleteRedisEvent(@Payload(RedisValidationPipe) dto: RedisMessageDto, @Ctx() context: RedisContext) {
    const systemCode = context.getArgByIndex(0).split('.')[2];

    await this.eventsService.message({
      text: dto.text,
      rqId: dto.rqId,
      level: MessageLevel.COMPLETED,
      transports: this.config.get(`service.producers.${systemCode}.transports`),
    });
  }

  @EventPattern('notify.warning.*')
  async handleWarningRedisEvent(@Payload(RedisValidationPipe) dto: RedisMessageDto, @Ctx() context: RedisContext) {
    const systemCode = context.getArgByIndex(0).split('.')[2];

    await this.eventsService.message({
      text: dto.text,
      rqId: dto.rqId,
      level: MessageLevel.WARNING,
      transports: this.config.get(`service.producers.${systemCode}.transports`),
    });
  }

  @EventPattern('notify.error.*')
  async handleErrorRedisEvent(@Payload(RedisValidationPipe) dto: RedisMessageDto, @Ctx() context: RedisContext) {
    const systemCode = context.getArgByIndex(0).split('.')[2];

    await this.eventsService.message({
      text: dto.text,
      rqId: dto.rqId,
      level: MessageLevel.ERROR,
      transports: this.config.get(`service.producers.${systemCode}.transports`),
    });
  }

  @EventPattern('notify.alert.*')
  async handleAlertRedisEvent(@Payload(RedisValidationPipe) dto: RedisMessageDto, @Ctx() context: RedisContext) {
    const systemCode = context.getArgByIndex(0).split('.')[2];

    await this.eventsService.message({
      text: dto.text,
      rqId: dto.rqId,
      level: MessageLevel.ALERT,
      transports: this.config.get(`service.producers.${systemCode}.transports`),
    });
  }
}
