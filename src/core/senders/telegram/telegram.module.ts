import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule } from '~src/core/config/config.module';
import { options } from '~src/core/senders/telegram/options';
import { TelegramService } from '~src/core/senders/telegram/telegram.service';
import { LoggerModule } from '~src/core/logger/logger.module';

@Module({
  imports: [ConfigModule, TelegrafModule.forRootAsync(options()), LoggerModule],
  providers: [TelegramService],
  exports: [TelegramService],
})
export class TelegramModule {}
