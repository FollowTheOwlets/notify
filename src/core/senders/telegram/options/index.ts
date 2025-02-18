import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModuleOptions } from 'nestjs-telegraf';

const telegramOptions = (config: ConfigService) => config.get<TelegrafModuleOptions>('telegram');
export const options = () => {
  return {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => telegramOptions(config),
  };
};
