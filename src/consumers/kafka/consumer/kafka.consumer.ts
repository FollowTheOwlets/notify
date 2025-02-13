import { ClientKafka, Ctx, EventPattern, KafkaContext, KafkaOptions, Payload } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Injectable, UseGuards } from '@nestjs/common';
import { KafkaValidationPipe } from '~src/consumers/kafka/pipe/kafka-validation.pipe';
import { KafkaMessageDto } from '~src/consumers/kafka/dto/kafka-message.dto';
import { KafkaSystemIncludeGuard } from '~src/consumers/kafka/guard/kafka-system-include.guard';

@Injectable()
@UseGuards(KafkaSystemIncludeGuard)
export class KafkaConsumer {
  private readonly kafkaClient: ClientKafka;

  constructor(private readonly configService: ConfigService) {
    //this.kafkaClient = new ClientKafka(configService.get<KafkaOptions['options']>('clients.kafka'));
  }

  @EventPattern('topic-test')
  async handleEvent(@Payload(KafkaValidationPipe) dto: KafkaMessageDto, @Ctx() context: KafkaContext) {
    const originalMessage = context.getMessage();
    const partition = context.getPartition();
    console.log('partition', partition);
    const { headers, timestamp } = originalMessage;
    console.log('headers', headers);
    console.log('timestamp', timestamp);
  }
}
