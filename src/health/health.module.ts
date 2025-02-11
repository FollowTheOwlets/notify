import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { LoggerModule } from '~src/logger/logger.module';
import { ConfigModule } from '~src/config/config.module';

@Module({
  imports: [TerminusModule, HttpModule, LoggerModule, ConfigModule],
  controllers: [HealthController],
})
export class HealthModule {}
