import { Module } from '@nestjs/common';
import { ConfigModule } from '~src/config/config.module';
import { LoggerModule } from '~src/logger/logger.module';
import { EventsModule } from '~src/events/events.module';
import { KafkaController } from '~src/consumers/kafka/kafka.controller';

@Module({
  imports: [ConfigModule, LoggerModule, EventsModule],
  controllers: [KafkaController],
})
export class KafkaModule {}
