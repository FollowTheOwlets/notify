import { KafkaMessage } from 'kafkajs';
import headers from '~src/api/headers';
import { MessageLevel } from '~src/core/messages/entity/message-level.enum';

export class KafkaMessageDto {
  headers: Record<(typeof headers)[keyof typeof headers], string>;
  level: MessageLevel;
  message: string;

  static of(kafkaMessage: KafkaMessage): KafkaMessageDto {
    const headers: Record<string, string> = {};
    Object.keys(kafkaMessage.headers).forEach((e) => (headers[e] = kafkaMessage.headers[e].toString()));
    const message = kafkaMessage.value.toString();
    const level = MessageLevel[kafkaMessage.key.toString()] || MessageLevel.ALERT;

    return {
      headers,
      level,
      message,
    };
  }
}
