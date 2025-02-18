import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { AxiosClient } from '~src/core/request/client/axios.client';
import { ConfigModule } from '~src/core/config/config.module';
import { LoggerModule } from '~src/core/logger/logger.module';

@Module({
  imports: [ConfigModule, LoggerModule],
  providers: [RequestService, AxiosClient],
})
export class RequestModule {}
