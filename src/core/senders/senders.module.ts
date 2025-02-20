import { Module } from '@nestjs/common';
import { SmtpModule } from '~src/core/senders/smtp/smtp.module';
import { TelegramModule } from '~src/core/senders/telegram/telegram.module';

@Module({
  imports: [SmtpModule, TelegramModule],
})
export class SendersModule {}
