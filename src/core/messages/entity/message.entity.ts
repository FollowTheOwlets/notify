import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MessageLevel } from '~src/core/messages/entity/message-level.enum';

const DAY = 60 * 60 * 24;

export class MessageEntity {
  text: string;
  rqId: string;
  level: MessageLevel;
}

@Schema({ timestamps: true, expires: DAY })
export class Message implements MessageEntity {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true, unique: true })
  rqId: string;

  @Prop({ enum: MessageLevel, default: MessageLevel.ALERT })
  level: MessageLevel;
}

export type TMessageEntity = HydratedDocument<MessageEntity>;
export const MessageSchema = SchemaFactory.createForClass(Message);
