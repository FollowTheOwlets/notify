import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { LoggerProvider } from '~src/core/logger/logger.provider';
import { MessageEvent } from '~src/core/events/events/message.event';
import { MessagesService } from '~src/core/messages/messages.service';
import { ISenderService } from '~src/core/senders/interface/i.sender.service';

@Injectable()
export class EventsService {
  private log: Logger;

  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly messagesService: MessagesService,
    private readonly senders: ISenderService[],
    loggerProvider: LoggerProvider,
  ) {
    this.log = loggerProvider.createLogger(this);
  }

  public async message(message: MessageEvent) {
    this.log.log(`Emit new message event: `, message);
    await this.messagesService.create(message);

    if (typeof message.transports === 'string' && message.transports === 'all') {
      this.senders.forEach((e) => e.send(message));
    }

    if (typeof message.transports !== 'string') {
      message.transports.forEach((transport) => {
        this.eventEmitter.emit(`message.${transport}`, message);
      });
    }
  }
}
