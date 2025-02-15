import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';
import HEADERS from '~src/api/headers';

@Injectable()
export class KafkaProducerService implements OnModuleInit, OnModuleDestroy {
  private kafka: Kafka;
  private producer: Producer;

  constructor() {
    this.kafka = new Kafka({
      clientId: 'my-app',
      brokers: ['notify-kafka:9092'],
    });

    this.producer = this.kafka.producer();
  }

  async onModuleInit() {
    try {
      await this.producer.connect();
      const headers = {};
      headers[HEADERS.X_SYSTEM_SOURCE_ID] = 'gasu-dev-service';
      headers[HEADERS.X_REQUEST_ID] = '2bfb68bb-893a-423b-a7fa-7b568cad5b67';

      await this.sendMessage({
        topic: 'test-topic',
        value: 'Hello Kafka with headers from NestJS!',
        headers,
      });

      console.log('Message sent to Kafka!');
    } catch (error) {
      console.error('Failed to connect or send message to Kafka:', error);
    }
  }

  async sendMessage(message: { topic: string; value: string; headers: Record<string, string> }) {
    await this.producer.send({
      topic: message.topic,
      messages: [
        {
          value: message.value,
          headers: message.headers,
        },
      ],
    });
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
  }
}
