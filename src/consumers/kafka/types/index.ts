import { ConsumerConfig, ConsumerSubscribeTopics, KafkaMessage } from 'kafkajs';

export interface KMessage {
  headers: KafkaMessage['headers'];
  message: string;
}

export interface ConsumerOptions {
  topic: ConsumerSubscribeTopics;
  config: ConsumerConfig;
  onMessage: (message: KMessage) => Promise<void>;
}
