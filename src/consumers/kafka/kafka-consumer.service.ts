import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { IConsumer } from '~src/consumers/kafka/consumer/i.consumer';
import { ConfigService } from '@nestjs/config';
import { ConsumerOptions } from '~src/consumers/kafka/options/consumer.options';

@Injectable()
export class KafkaConsumerService implements OnApplicationShutdown {
  private readonly consumers: IConsumer[] = [];

  constructor(
    private readonly configService: ConfigService,
  ) { }

  async consume({ topic, config, onMessage }: ConsumerOptions) {
    // const consumer = new KafkaConsumer(topic, config, this.configService.get('clients.kafka.client.brokers'));
    // await consumer.connect();
    // await consumer.consume(onMessage);
    // this.consumers.push(consumer);
  }

  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}
