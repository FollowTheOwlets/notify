import { Controller, UseGuards } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { EventsService } from '~src/events/events.service';
import { ConfigService } from '@nestjs/config';
import { LoggerProvider } from '~src/logger/logger.provider';
import { LoggerService } from '~src/logger/logger.service';
import { KafkaMessageDto } from '~src/consumers/kafka/dto/kafka-message.dto';
import { MessageLevel } from '~src/messages/entity/message-level.enum';
import { KafkaSystemIncludeGuard } from '~src/consumers/kafka/guard/kafka-system-include.guard';
import { KafkaValidationPipe } from '~src/consumers/kafka/pipe/kafka-validation.pipe';

@Controller('kafka')
@UseGuards(KafkaSystemIncludeGuard)
export class KafkaController {
  private log: LoggerService;

  constructor(
    private readonly eventsService: EventsService,
    private readonly config: ConfigService,
    loggerProvider: LoggerProvider,
  ) {
    this.log = loggerProvider.createLogger(this);
  }

  @MessagePattern('notify-warning.*')
  async handleCompleteRedisEvent(@Payload(KafkaValidationPipe) dto: KafkaMessageDto, @Ctx() context: KafkaContext) {
    const systemCode = context.getArgByIndex(0).split('.')[1];

    await this.eventsService.message({
      text: dto.text,
      rqId: dto.rqId,
      level: MessageLevel.WARNING,
      transports: this.config.get(`service.producers.${systemCode}.transports`),
    });
  }
}
