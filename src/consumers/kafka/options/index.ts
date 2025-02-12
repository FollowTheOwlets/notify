import { ConfigModule, ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

export default {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    transport: Transport.KAFKA,
    options: config.get<Record<string, any>>('clients.kafka'),
  }),
  name: 'NOTIFY_SERVICE',
};
