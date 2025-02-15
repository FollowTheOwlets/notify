import { KafkaMessage } from 'kafkajs';
import headers from '~src/api/headers';
import { KafkaMessageDto } from '~src/consumers/kafka/dto/kafka-message.dto';

export class KMessage extends KafkaMessageDto {
  headers: Record<(typeof headers)[keyof typeof headers], string>;
  message: string;

  static of(kafkaMessage: KafkaMessage): KMessage {
    const headers: Record<string, string> = {};
    Object.keys(kafkaMessage.headers).forEach((e) => (headers[e] = kafkaMessage.headers[e].toString()));
    const message = kafkaMessage.value.toString();
    return {
      headers,
      message,
    };
  }
}
