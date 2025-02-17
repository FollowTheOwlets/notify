import { Controller, Logger, UseGuards, UsePipes } from '@nestjs/common';
import { KafkaSystemIncludeGuard } from '~src/consumers/kafka/guard/kafka-system-include.guard';
import { EventsService } from '~src/events/events.service';
import { ConfigService } from '@nestjs/config';
import { Ctx, MessagePattern } from '@nestjs/microservices';
import { KafkaParseMessagePipe } from '~src/consumers/kafka/pipe/kafka-parse-message.pipe';
import { KafkaMessageDto } from '~src/consumers/kafka/dto/kafka-message.dto';
import { LoggerProvider } from '~src/logger/logger.provider';
import HEADERS from '~src/api/headers';

@Controller('kafka')
@UseGuards(KafkaSystemIncludeGuard)
export class KafkaController {
  private log: Logger;

  constructor(
    private readonly eventsService: EventsService,
    private readonly config: ConfigService,
    loggerProvider: LoggerProvider,
  ) {
    this.log = loggerProvider.createLogger(this);
  }

  @MessagePattern('notify')
  @UsePipes(KafkaParseMessagePipe)
  async messageHandler(@Ctx() dto: KafkaMessageDto) {
    await this.log.debug(`messageHandler KafkaMessageDto: `, dto);
    const { message, headers, level } = dto;
    await this.eventsService.message({
      text: message,
      rqId: headers[HEADERS.X_REQUEST_ID],
      level: level,
      transports: this.config.get(`service.producers.${headers[HEADERS.X_SYSTEM_SOURCE_ID]}.transports`),
    });
  }
}
