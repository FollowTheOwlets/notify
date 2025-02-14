import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';

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

      await this.sendMessage({
        topic: 'test-topic',
        key: 'key1',
        value: 'Hello Kafka with headers from NestJS!',
        headers: {
          'correlation-id': '2bfb68bb-893a-423b-a7fa-7b568cad5b67',
          'system-id': 'my-system',
          'content-type': 'application/json',
        },
      });

      console.log('Message sent to Kafka!');
    } catch (error) {
      console.error('Failed to connect or send message to Kafka:', error);
    }
  }

  async sendMessage(message: {
    topic: string;
    key: string;
    value: string;
    headers: Record<string, string>;
  }) {
    await this.producer.send({
      topic: message.topic,
      messages: [
        {
          key: message.key,
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
