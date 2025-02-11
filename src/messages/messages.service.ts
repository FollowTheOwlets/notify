import { Injectable } from '@nestjs/common';
import { MessagesRepository } from '~src/messages/messages.repository';
import { MessageEvent } from '~src/events/events/message.event';
import { MessageLevel } from '~src/messages/entity/message-level.enum';

@Injectable()
export class MessagesService {
  constructor(private readonly messagesRepository: MessagesRepository) {}

  public async create(message: MessageEvent, level: MessageLevel) {
    await this.messagesRepository.save({
      rqId: message.rqId,
      text: message.text,
      level,
    });
  }
}
