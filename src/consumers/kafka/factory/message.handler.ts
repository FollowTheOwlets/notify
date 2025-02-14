import { Injectable } from '@nestjs/common';
import { FunctionUtils } from '~src/utils/fun.utils';
import { KafkaMessage } from 'kafkajs';
import { KMessage } from '~src/consumers/kafka/types';
import { CreateConsumerPacket } from '~src/consumers/kafka/factory/create-consumer.packet';
import { LoggerProvider } from '~src/logger/logger.provider';
import { LoggerService } from '~src/logger/logger.service';

@Injectable
export class MessageHandler {
  private log: LoggerService;

  constructor(private readonly loggerProvider: LoggerProvider) {
    this.log = loggerProvider.createLogger(this);
  }

  messageHandlerWrapper(onMessage: CreateConsumerPacket['onMessage']) {
    return async ({ message, partition }) => {
      this.log.D(`${{ message, partition }}`);
      try {
        await FunctionUtils.repeatable(
          async () => onMessage(this.extractMessage(message)),
          3,
          (err) => console.log(err),
        );
      } catch (err) {}
    };
  }

  private extractMessage(kafkaMessage: KafkaMessage): KMessage {
    const headers: Record<string, string> = {};
    Object.keys(kafkaMessage.headers).forEach((e) => (headers[e] = kafkaMessage.headers[e].toString()));

    const message = kafkaMessage.value.toString();
    return {
      headers,
      message,
    };
  }
}
