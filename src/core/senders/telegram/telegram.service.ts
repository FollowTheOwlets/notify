import { Injectable, Logger } from '@nestjs/common';
import { MessageEvent } from '~src/core/events/events/message.event';
import { ConfigService } from '@nestjs/config';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { LoggerProvider } from '~src/core/logger/logger.provider';
import { ISenderService } from '~src/core/senders/interface/i.sender.service';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class TelegramService implements ISenderService {
  private log: Logger;
  constructor(
    private readonly configService: ConfigService,
    @InjectBot() private readonly bot: Telegraf,
    loggerProvider: LoggerProvider,
  ) {
    this.log = loggerProvider.createLogger(this);
  }

  @OnEvent('message.telegram')
  async send(message: MessageEvent): Promise<any> {
    const sendToList = this.configService.get<string>('smtp.mail.users-id-join-list').split(',');
    for (const sendTo of sendToList) {
      try {
        await this.bot.telegram.sendMessage(sendTo, message.toString());
      } catch (e) {
        await this.log.error(`Telegram error: `, e);
      }
    }
  }
}
