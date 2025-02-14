import { Injectable, OnApplicationShutdown, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { IConsumer } from '~src/consumers/kafka/consumer/i.consumer';
import { ConfigService } from '@nestjs/config';
import { ConsumerOptions } from '~src/consumers/kafka/types';
import { KafkaConsumer } from '~src/consumers/kafka/consumer/kafka.consumer';
import * as console from 'console';

@Injectable()
export class KafkaConsumerService implements OnApplicationShutdown, OnModuleInit {
  private readonly consumers: IConsumer[] = [];

  constructor(
    private readonly configService: ConfigService,
  ) { }



  async consume({ topic, config, onMessage }: ConsumerOptions) {
    const consumer = new KafkaConsumer(topic, config, this.configService.get('clients.kafka.client.brokers'));
    await consumer.connect();
    await consumer.consume(onMessage);
    this.consumers.push(consumer);
  }

  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }

  onModuleInit(): any {
    this.consume({
      topic: { topics: ['test-topic'], fromBeginning: true },
      config: {
        groupId: 'group-id'
      },
      onMessage: (data) => {
        console.log(data);
      }
    } as ConsumerOptions);
  }

}
