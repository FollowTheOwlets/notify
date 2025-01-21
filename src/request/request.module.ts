import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { AxiosClient } from '~src/request/client/axios.client';

@Module({
  providers: [RequestService, AxiosClient],
})
export class RequestModule {}
