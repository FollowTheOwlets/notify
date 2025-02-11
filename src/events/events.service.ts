import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MessagesService } from '~src/messages/messages.service';
import { LoggerProvider } from '~src/logger/logger.provider';
import { LoggerService } from '~src/logger/logger.service';
import { MessageEvent } from '~src/events/events/message.event';
import { MessageLevel } from '~src/messages/entity/message-level.enum';

@Injectable()
export class EventsService {
  private log: LoggerService;

  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly messagesService: MessagesService,
    loggerProvider: LoggerProvider,
  ) {
    this.log = loggerProvider.createLogger(this);
  }

  public async message(message: MessageEvent, level: MessageLevel) {
    await this.messagesService.create(message, level);
    await this.log.L(`Emit new message event: ${message}`);
    message.transports.forEach((transport) => {
      this.eventEmitter.emit(`message.${transport}`, message);
    });
  }
}
