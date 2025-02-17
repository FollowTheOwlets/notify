import { Injectable, Logger } from '@nestjs/common';
import { LoggerProvider } from '~src/logger/logger.provider';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { MessageEvent } from '~src/events/events/message.event';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class SmtpService {
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
  async send(message: MessageEvent): Promise<any> {
    const from = this.configService.get<string>('smtp.mail.user');
    const sendTo = this.configService.get<string>('smtp.mail.to');

    try {
      const request = {
        from: `<${from}>`,
        to: sendTo,
        subject: `NOTIFY`,
        html: this.messageFromEvent(message),
      };

      await this.log.debug(`Smtp create request: ${request}`);

      const res = await this.mailerService.sendMail(request);

      await this.log.debug(`Smtp result: ${res}`);

      return res;
    } catch (e) {
      await this.log.error(`Smtp error: ${e}`);
    }
  }

  messageFromEvent(message: MessageEvent) {
    return `Level: ${message.level}!
    Message: ${message.text}.`;
  }
}
