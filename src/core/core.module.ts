import { Module } from '@nestjs/common';
import { ConfigModule } from '~src/core/config/config.module';
import { LoggerModule } from '~src/core/logger/logger.module';
import { RequestModule } from '~src/core/request/request.module';
import { SmtpModule } from '~src/core/smtp/smtp.module';
import { TelegramModule } from '~src/core/telegram/telegram.module';
import { EventsModule } from '~src/core/events/events.module';
import { MessagesModule } from '~src/core/messages/messages.module';
import { MongoModule } from '~src/core/mongo/mongo.module';

@Module({
  imports: [
    ConfigModule,
    EventsModule,
    LoggerModule,
    MessagesModule,
    MongoModule,
    RequestModule,
    SmtpModule,
    TelegramModule,
  ],
})
export class CoreModule {}
