import { MessageLevel } from '~src/core/messages/entity/message-level.enum';

export class MessageEvent {
  rqId: string;
  text: string;
  level: MessageLevel;
  transports: string[] | string;

  constructor(rqId: string, text: string, level: MessageLevel, transports: string[]) {
    this.rqId = rqId;
    this.text = text;
    this.level = level;
    this.transports = transports;
  }

  toString() {
    return `Level: ${MessageLevel[this.level]}!
    Message: ${this.text}.`;
  }
}
