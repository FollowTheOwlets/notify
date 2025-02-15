import { Injectable } from '@nestjs/common';
import { FunctionUtils } from '~src/utils/fun.utils';
import { CreateConsumerPacket } from '~src/consumers/kafka/factory/create-consumer.packet';
import { LoggerProvider } from '~src/logger/logger.provider';
import { LoggerService } from '~src/logger/logger.service';
import { EachMessageHandler, EachMessagePayload } from 'kafkajs';

@Injectable()
export class MessageHandler {
  private log: LoggerService;

  constructor(private readonly loggerProvider: LoggerProvider) {
    this.log = loggerProvider.createLogger(this);
  }

  messageHandlerWrapper(onMessage: CreateConsumerPacket['onMessage']): EachMessageHandler {
    return async (message: EachMessagePayload) => {
      try {
        await FunctionUtils.repeatable(
          async () => onMessage(message),
          3,
          (err) => console.log(err),
        );
      } catch (err) {}
    };
  }
}
