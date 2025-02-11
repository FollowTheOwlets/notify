import { Injectable } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Injectable()
export class RedisService {
  constructor() {}

  @EventPattern('my_channel')
  handleRedisEvent(data: any) {
    console.log('handleRedisEvent Получено сообщение из Redis:', data);
  }

  @MessagePattern('my_channel')
  handleRedisMessage(data: any) {
    console.log('MessagePattern Получено сообщение из Redis:', data);
  }
}
