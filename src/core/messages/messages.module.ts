import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message, MessageSchema } from '~src/core/messages/entity/message.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesRepository } from '~src/core/messages/messages.repository';
import { LoggerModule } from '~src/core/logger/logger.module';

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
