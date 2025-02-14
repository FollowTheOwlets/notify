import { ConsumerConfig, ConsumerSubscribeTopics } from 'kafkajs';
import { KMessage } from '~src/consumers/kafka/types';

export interface CreateConsumerPacket {
  topics: ConsumerSubscribeTopics;
  config: ConsumerConfig;
  onMessage: (message: KMessage) => Promise<void>;
}
