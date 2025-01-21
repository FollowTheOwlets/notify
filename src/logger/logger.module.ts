import { Module } from '@nestjs/common';
import { LoggerProvider } from '~src/logger/logger.provider';
import { ConfigModule } from '~src/config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [LoggerProvider],
  exports: [LoggerProvider],
})
export class LoggerModule {}
