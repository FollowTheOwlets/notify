import { Module } from '@nestjs/common';
import { ConfigModule } from '~src/config/config.module';
import { LoggerModule } from '~src/logger/logger.module';
import { EventsModule } from '~src/events/events.module';
import { KafkaConsumerService } from '~src/consumers/kafka/kafka-consumer.service';

@Module({
  imports: [ConfigModule, LoggerModule, EventsModule],
  providers: [KafkaConsumerService],
})
export class KafkaModule {}
