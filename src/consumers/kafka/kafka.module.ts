import { Module, Scope } from '@nestjs/common';
import { ConfigModule } from '~src/config/config.module';
import { LoggerModule } from '~src/logger/logger.module';
import { EventsModule } from '~src/events/events.module';
import { KafkaProducerService } from '~src/consumers/kafka/kafka-producer.service';
import { Kafka, KafkaConfig } from 'kafkajs';
import { ConfigService } from '@nestjs/config';
import { LoggerProvider } from '~src/logger/logger.provider';
import { MessageHandler } from '~src/consumers/kafka/factory/message.handler';
import { ConsumerFactory } from '~src/consumers/kafka/factory/consumer.factory';
import { KafkaController } from '~src/consumers/kafka/kafka.controller';
import { KafkaConsumersInitializer } from '~src/consumers/kafka/metadata/kafka-consumers.initializer';
import { KafkaControllersScanner } from '~src/consumers/kafka/metadata/kafka-controllers.scanner';

@Module({
  imports: [ConfigModule, LoggerModule, EventsModule],
  providers: [
    ConsumerFactory,
    KafkaProducerService,
    KafkaConsumersInitializer,
    KafkaControllersScanner,
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
  controllers: [KafkaController],
})
export class KafkaModule {}
