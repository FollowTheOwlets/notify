import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { LoggerModule } from './logger/logger.module';
import { SmtpModule } from './smtp/smtp.module';
import { TelegramModule } from './telegram/telegram.module';
import { ConfigModule } from './config/config.module';
import { RequestModule } from './request/request.module';
import { EventsModule } from './events/events.module';
import { MessagesModule } from './messages/messages.module';
import { MongoModule } from './mongo/mongo.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    HealthModule,
    LoggerModule,
    SmtpModule,
    TelegramModule,
    ConfigModule,
    RequestModule,
    EventsModule,
    MessagesModule,
    MongoModule,
    ApiModule,
  ],
})
export class AppModule {}
