import { Module, Scope } from '@nestjs/common';
import { ConfigModule } from '~src/config/config.module';
import { LoggerModule } from '~src/logger/logger.module';
import { EventsModule } from '~src/events/events.module';
import { KafkaConsumerService } from '~src/consumers/kafka/kafka-consumer.service';
import { KafkaProducerService } from '~src/consumers/kafka/kafka-producer.service';
import { Kafka, KafkaConfig } from 'kafkajs';
import { ConfigService } from '@nestjs/config';
import { LoggerProvider } from '~src/logger/logger.provider';
import { MessageHandler } from '~src/consumers/kafka/factory/message.handler';

@Module({
  imports: [ConfigModule, LoggerModule, EventsModule],
  providers: [
    KafkaConsumerService,
    KafkaProducerService,
    {
      provide: 'Kafka',
      inject: [ConfigService],
      useFactory: (config: ConfigService) => new Kafka(config.get<KafkaConfig>('clients.kafka.client')),
      scope: Scope.DEFAULT,
    },
    {
      provide: 'MessageHandler',
      inject: [LoggerProvider],
      useFactory: (loggerProvider) => new MessageHandler(loggerProvider),
    },
  ],
})
export class KafkaModule {}
