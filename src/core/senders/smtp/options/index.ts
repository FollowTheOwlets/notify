import { ConfigModule, ConfigService } from '@nestjs/config';

const nodeMailerOptions = (config: ConfigService) => ({
  transport: {
    service: 'mail',
    host: config.get<string>('smtp.mail.host'),
    port: config.get<string>('smtp.mail.port'),
    auth: {
      user: config.get<string>('smtp.mail.user'),
      pass: config.get<string>('smtp.mail.pass'),
    },
    tls: {
      rejectUnauthorized: false,
    },
  },
  imports: {},
  defaults: {
    from: config.get<string>('smtp.mail.user'),
  },
});

export const options = () => {
  return {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => nodeMailerOptions(config),
  };
};
