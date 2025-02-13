import { Module } from '@nestjs/common';
import { ConfigModule } from '~src/config/config.module';
import { LoggerModule } from '~src/logger/logger.module';
import { EventsModule } from '~src/events/events.module';
import { KafkaConsumer } from '~src/consumers/kafka/consumer/kafka.consumer';

@Module({
  imports: [ConfigModule, LoggerModule, EventsModule],
  providers: [KafkaConsumer],
})
export class KafkaModule {}
