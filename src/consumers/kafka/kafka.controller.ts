import { Controller, UseGuards, UsePipes } from '@nestjs/common';
import { KafkaSystemIncludeGuard } from '~src/consumers/kafka/guard/kafka-system-include.guard';
import { EventsService } from '~src/events/events.service';
import { ConfigService } from '@nestjs/config';
import { Ctx, MessagePattern } from '@nestjs/microservices';
import { KafkaParseMessagePipe } from '~src/consumers/kafka/pipe/kafka-parse-message.pipe';
import { KafkaMessageDto } from '~src/consumers/kafka/dto/kafka-message.dto';

@Controller('kafka')
@UseGuards(KafkaSystemIncludeGuard)
export class KafkaController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly config: ConfigService,
  ) {}

  @MessagePattern('notify')
  @UsePipes(KafkaParseMessagePipe)
  async messageHandler2(@Ctx() { message, headers, level }: KafkaMessageDto) {
    await this.eventsService.message({
      text: message,
      rqId: headers[headers.X_REQUEST_ID],
      level: level,
      transports: this.config.get(`service.producers.${headers[headers.X_SYSTEM_SOURCE_ID]}.transports`),
    });
  }
}
