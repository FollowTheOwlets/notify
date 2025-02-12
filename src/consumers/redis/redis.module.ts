import { Module } from '@nestjs/common';
import { ConfigModule } from '~src/config/config.module';
import { LoggerModule } from '~src/logger/logger.module';
import { EventsModule } from '~src/events/events.module';
import { RedisController } from './redis.controller';

@Module({
  imports: [ConfigModule, LoggerModule, EventsModule],
  controllers: [RedisController],
})
export class RedisModule {}
