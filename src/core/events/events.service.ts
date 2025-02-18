import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { LoggerProvider } from '~src/core/logger/logger.provider';
import { MessageEvent } from '~src/core/events/events/message.event';

@Injectable()
export class EventsService {
  private log: Logger;

  constructor(
    private readonly eventEmitter: EventEmitter2,
    loggerProvider: LoggerProvider,
  ) {
    this.log = loggerProvider.createLogger(this);
  }

  public async message(message: MessageEvent) {
    this.log.log(`Emit new message event: `, message);
    message.transports.forEach((transport) => {
      this.eventEmitter.emit(`message.${transport}`, message);
    });
  }
}
