import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { AxiosClient } from '~src/request/client/axios.client';
import { ConfigModule } from '~src/config/config.module';
import { LoggerModule } from '~src/logger/logger.module';

@Module({
  imports: [ConfigModule, LoggerModule],
  providers: [RequestService, AxiosClient],
})
export class RequestModule {}
