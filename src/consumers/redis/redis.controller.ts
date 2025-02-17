import { Controller, Logger, UseGuards } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RedisContext } from '@nestjs/microservices';
import { EventsService } from '~src/events/events.service';
import { ConfigService } from '@nestjs/config';
import { LoggerProvider } from '~src/logger/logger.provider';
import { RedisMessageDto } from '~src/consumers/redis/dto/redis-message.dto';
import { MessageLevel } from '~src/messages/entity/message-level.enum';
import { RedisSystemIncludeGuard } from '~src/consumers/redis/guard/redis-system-include.guard';
import { RedisValidationPipe } from '~src/consumers/redis/pipe/redis-validation.pipe';

@Controller('redis')
@UseGuards(RedisSystemIncludeGuard)
export class RedisController {
  private log: Logger;

  constructor(
    private readonly eventsService: EventsService,
    private readonly config: ConfigService,
    loggerProvider: LoggerProvider,
  ) {
    this.log = loggerProvider.createLogger(this);
  }

  @MessagePattern('notify-warning.*')
  async handleCompleteRedisEvent(@Payload(RedisValidationPipe) dto: RedisMessageDto, @Ctx() context: RedisContext) {
    const systemCode = context.getArgByIndex(0).split('.')[1];

    await this.eventsService.message({
      text: dto.text,
      rqId: dto.rqId,
      level: MessageLevel.WARNING,
      transports: this.config.get(`service.producers.${systemCode}.transports`),
    });
  }
}
