import { ConsumerConfig, ConsumerSubscribeTopics, EachMessagePayload } from 'kafkajs';

export interface CreateConsumerPacket {
  topics: ConsumerSubscribeTopics;
  config: ConsumerConfig;
  onMessage: (message: EachMessagePayload) => Promise<void>;
}
