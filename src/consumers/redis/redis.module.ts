import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { ClientsModule } from '@nestjs/microservices';
import options from '~src/consumers/redis/options';
import { ConfigModule } from '~src/config/config.module';
import { LoggerModule } from '~src/logger/logger.module';
import { EventsModule } from '~src/events/events.module';

@Module({
  imports: [ClientsModule.registerAsync([options]), ConfigModule, LoggerModule, EventsModule],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
