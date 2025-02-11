import { Module } from '@nestjs/common';
import { SmtpService } from './smtp.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { options } from '~src/smtp/options';
import { ConfigModule } from '~src/config/config.module';
import { LoggerModule } from '~src/logger/logger.module';

@Module({
  imports: [MailerModule.forRootAsync(options()), ConfigModule, LoggerModule],
  providers: [SmtpService],
  exports: [SmtpService],
})
export class SmtpModule {}
