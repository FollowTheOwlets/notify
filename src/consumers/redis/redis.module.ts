import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { ConfigModule } from '~src/config/config.module';
import { LoggerModule } from '~src/logger/logger.module';
import { EventsModule } from '~src/events/events.module';

@Module({
  imports: [ConfigModule, LoggerModule, EventsModule],
  providers: [RedisService],
})
export class RedisModule {}
