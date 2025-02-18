import { Module } from '@nestjs/common';
import { ApiController } from './v1/api.controller';
import { EventsModule } from '~src/core/events/events.module';
import { ConfigModule } from '~src/core/config/config.module';
import { LoggerModule } from '~src/core/logger/logger.module';

@Module({
  imports: [EventsModule, ConfigModule, LoggerModule],
  controllers: [ApiController],
})
export class ApiModule {}
