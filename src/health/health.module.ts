import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { LoggerModule } from '~src/logger/logger.module';

@Module({
  imports: [TerminusModule, HttpModule, LoggerModule],
  controllers: [HealthController],
})
export class HealthModule {}
