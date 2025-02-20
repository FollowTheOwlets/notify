import { Injectable, Logger } from '@nestjs/common';
import { LoggerProvider } from '~src/core/logger/logger.provider';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { MessageEvent } from '~src/core/events/events/message.event';
import { OnEvent } from '@nestjs/event-emitter';
import { ISenderService } from '~src/core/senders/interface/i.sender.service';

@Injectable()
export class SmtpService implements ISenderService {
  private log: Logger;

  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    loggerProvider: LoggerProvider,
  ) {
    this.log = loggerProvider.createLogger(this);
  }

  /**
   * Send email
   * @return {any} - nodemailer response
   */
  @OnEvent('message.smtp')
  async send(message: MessageEvent): Promise<void> {
    const from = this.configService.get<string>('smtp.mail.user');
    const sendToList = this.configService.get<string>('smtp.mail.to-join-list').split(',');

    for (const sendTo of sendToList) {
      try {
        const request = {
          from: `<${from}>`,
          to: sendTo,
          subject: `NOTIFY`,
          html: MessageEvent.stringifySmtp(message),
        };

        await this.mailerService.sendMail(request);
      } catch (e) {
        await this.log.error(`Smtp error:`, e);
      }
    }
  }
}
