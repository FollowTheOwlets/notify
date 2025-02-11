import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisOptions, Transport } from '@nestjs/microservices';

const redisOptions = (config: ConfigService): RedisOptions => ({
  transport: Transport.REDIS,
  options: config.get<Record<string, any>>('clients.redis'),
});

export default {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => redisOptions(config),
  name: 'NOTIFY_SERVICE',
};
