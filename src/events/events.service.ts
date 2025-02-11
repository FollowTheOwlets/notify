import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { LoggerProvider } from '~src/logger/logger.provider';
import { LoggerService } from '~src/logger/logger.service';
import { MessageEvent } from '~src/events/events/message.event';

@Injectable()
export class EventsService {
  private log: LoggerService;

  constructor(
    private readonly eventEmitter: EventEmitter2,
    loggerProvider: LoggerProvider,
  ) {
    this.log = loggerProvider.createLogger(this);
  }

  public async message(message: MessageEvent) {
    await this.log.L(`Emit new message event: ${message}`);
    message.transports.forEach((transport) => {
      this.eventEmitter.emit(`message.${transport}`, message);
    });
  }
}
