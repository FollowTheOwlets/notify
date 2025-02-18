import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { LoggerModule } from '~src/core/logger/logger.module';
import { ConfigModule } from '~src/core/config/config.module';

@Module({
  imports: [TerminusModule, HttpModule, LoggerModule, ConfigModule],
  controllers: [HealthController],
})
export class HealthModule {}
