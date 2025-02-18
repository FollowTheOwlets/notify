import { Injectable } from '@nestjs/common';
import { MessagesRepository } from '~src/core/messages/messages.repository';
import { MessageEvent } from '~src/core/events/events/message.event';
import { MessageLevel } from '~src/core/messages/entity/message-level.enum';

@Injectable()
export class MessagesService {
  constructor(private readonly messagesRepository: MessagesRepository) {}

  public async create(message: MessageEvent) {
    await this.messagesRepository.save({
      rqId: message.rqId,
      text: message.text,
      level: message.level,
    });
  }
}
