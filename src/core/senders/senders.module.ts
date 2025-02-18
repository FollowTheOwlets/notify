import { Module } from '@nestjs/common';
import { SmtpModule } from '~src/core/senders/smtp/smtp.module';
import { TelegramModule } from '~src/core/senders/telegram/telegram.module';
import { ISenderService } from '~src/core/senders/interface/i.sender.service';
import { SmtpService } from '~src/core/senders/smtp/smtp.service';
import { TelegramService } from '~src/core/senders/telegram/telegram.service';
import { ConfigModule } from '~src/core/config/config.module';
import { LoggerModule } from '~src/core/logger/logger.module';

@Module({
  imports: [SmtpModule, TelegramModule, ConfigModule, LoggerModule],
  providers: [
    {
      provide: Array<ISenderService>,
      inject: [SmtpService, TelegramService],
      useFactory: (smtp, telegram) => [smtp, telegram],
    },
  ],
  exports: [SmtpModule, TelegramModule, Array<ISenderService>],
})
export class SendersModule {}
