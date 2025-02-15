import { TopicListener } from '~src/consumers/kafka/metadata/decorator/topic-listener.decorator';
import { KController } from '~src/consumers/kafka/metadata/decorator/k-controller.decorator';
import { KMessage } from '~src/consumers/kafka/types';
import { UseGuards } from '@nestjs/common';
import { KafkaSystemIncludeGuard } from '~src/consumers/kafka/guard/kafka-system-include.guard';
import { EventsService } from '~src/events/events.service';
import { ConfigService } from '@nestjs/config';
import { MessageLevel } from '~src/messages/entity/message-level.enum';
import headers from '~src/api/headers';
import { EachMessagePayload } from 'kafkajs';

@KController()
export class KafkaController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly config: ConfigService,
  ) {}

  @TopicListener({
    topics: ['test-topic'],
    groupId: 'groupId',
  })
  @UseGuards(KafkaSystemIncludeGuard)
  async messageHandler(payload: EachMessagePayload) {
    const message = KMessage.of(payload.message);
    console.log('📩 Обработано сообщение Kafka:', message);
    await this.eventsService.message({
      text: message.message,
      rqId: message.headers[headers.X_REQUEST_ID],
      level: MessageLevel.ERROR,
      transports: this.config.get(`service.producers.${message.headers[headers.X_SYSTEM_SOURCE_ID]}.transports`),
    });
  }
}
