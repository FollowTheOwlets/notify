import { Module } from '@nestjs/common';
import { LoggerProvider } from '~src/logger/logger.provider';
import { ConfigModule } from '~src/config/config.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [
    LoggerProvider,
    {
      provide: 'LOGGER_CONFIG',
      inject: [ConfigService],
      useFactory: (configService) => configService.get('logging'),
    },
  ],
  exports: [LoggerProvider],
})
export class LoggerModule {}
