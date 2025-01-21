import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { LoggerModule } from './logger/logger.module';
import { SmtpModule } from './smtp/smtp.module';
import { TelegramService } from './telegram/telegram.service';
import { TelegramModule } from './telegram/telegram.module';
import { ConfigModule } from './config/config.module';
import { RequestModule } from './request/request.module';

@Module({
  imports: [
    HealthModule,
    LoggerModule,
    SmtpModule,
    TelegramModule,
    ConfigModule,
    RequestModule,
  ],
  controllers: [AppController],
  providers: [AppService, TelegramService],
})
export class AppModule {}
