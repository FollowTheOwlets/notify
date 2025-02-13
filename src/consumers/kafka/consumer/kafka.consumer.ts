import {
  Consumer,
  ConsumerConfig,
  ConsumerSubscribeTopic,
  ConsumerSubscribeTopics,
  Kafka,
  KafkaMessage,
  Producer,
} from 'kafkajs';
import { Logger } from "@nestjs/common";
import { IConsumer } from '~src/consumers/kafka/consumer/i.consumer';
import { FunctionUtils } from '~src/utils/fun.utils';

export const sleep = (timeout: number) => {
  return new Promise<void>((resolve) => setTimeout(resolve, timeout));
};

export class KafkaConsumer implements IConsumer {
  private readonly kafka: Kafka;
  private readonly consumer: Consumer;
  private readonly logger: Logger;

  constructor(
    private readonly topic: ConsumerSubscribeTopics,
    config: ConsumerConfig,
    brokers: string[]) {
    this.kafka = new Kafka({
      brokers
    })
    this.consumer = this.kafka.consumer(config);
    this.logger = new Logger(`${topic}-${config.groupId}`)
  }
  async consume(onMessage: (message: KafkaMessage) => Promise<void>) {
    await this.consumer.subscribe(this.topic)
    await this.consumer.run({
      eachMessage: async ({ message, partition }) => {
        try {
          await FunctionUtils.repeatable(async () => onMessage(message), 3, (err) => console.log(err));
        } catch (err) {
        }
      },
    })
  }

  async connect() {
    try {
      await this.consumer.connect();
    } catch (err) {
      this.logger.error('Failed to connect to Kafka. trying again ...', err);
      await sleep(5000);
      await this.connect();
    }

  }
  async disconnect() {
    this.consumer.disconnect()
  }
}