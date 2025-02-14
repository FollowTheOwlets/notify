import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { Consumer, Kafka } from 'kafkajs';
import { CreateConsumerPacket } from '~src/consumers/kafka/factory/create-consumer.packet';
import { MessageHandler } from '~src/consumers/kafka/factory/message.handler';
import { LoggerProvider } from '~src/logger/logger.provider';
import { LoggerService } from '~src/logger/logger.service';
import { FunctionUtils } from '~src/utils/fun.utils';

@Injectable
export class ConsumerFactory implements OnModuleDestroy {
  private log: LoggerService;
  private consumers: Consumer[];

  constructor(
    @Inject('Kafka') private readonly kafka: Kafka,
    private readonly messageHandler: MessageHandler,
    private readonly loggerProvider: LoggerProvider,
  ) {
    this.log = loggerProvider.createLogger(this);
    this.consumers = [];
  }

  async getConsumer(packet: CreateConsumerPacket) {
    const consumer = this.kafka.consumer(packet.config);
    await consumer.subscribe(packet.topics);
    await consumer.run({
      eachMessage: this.messageHandler.messageHandlerWrapper(packet.onMessage),
    });
    await this.connect(consumer);
  }

  private async connect(consumer: Consumer) {
    try {
      await consumer.connect();
      this.consumers.push(consumer);
    } catch (err) {
      this.log.E('Failed to connect to Kafka. trying again ...');
      // await this.connect(consumer);
    }
  }

  onModuleDestroy() {
    this.consumers.forEach((e) => e.disconnect());
  }
}
