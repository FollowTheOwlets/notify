import { Module } from '@nestjs/common';
import configuration from '~src/config/configuration';
import { ConfigModule as BaseConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    BaseConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
