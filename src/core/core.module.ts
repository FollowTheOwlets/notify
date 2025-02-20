import { Module } from '@nestjs/common';
import { ConfigModule } from '~src/core/config/config.module';
import { LoggerModule } from '~src/core/logger/logger.module';
import { RequestModule } from '~src/core/request/request.module';
import { EventsModule } from '~src/core/events/events.module';
import { MessagesModule } from '~src/core/messages/messages.module';
import { MongoModule } from '~src/core/mongo/mongo.module';

@Module({
  imports: [ConfigModule, EventsModule, LoggerModule, MessagesModule, MongoModule, RequestModule],
  exports: [ConfigModule, EventsModule, LoggerModule, MessagesModule, MongoModule, RequestModule],
})
export class CoreModule {}
