import { MessageEvent } from '~src/core/events/events/message.event';

export interface ISenderService {
  send(message: MessageEvent): Promise<void>;
}
