import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message, MessageSchema } from '~src/messages/entity/message.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesRepository } from '~src/messages/messages.repository';
import { LoggerModule } from '~src/logger/logger.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Message.name,
        schema: MessageSchema,
      },
    ]),
    LoggerModule,
  ],
  providers: [MessagesService, MessagesRepository],
  exports: [MessagesService],
})
export class MessagesModule {}
