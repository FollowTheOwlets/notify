import { ConfigModule, ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

export default {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    transport: Transport.REDIS,
    options: config.get<Record<string, any>>('clients.redis'),
  }),
  name: 'NOTIFY_SERVICE',
};
