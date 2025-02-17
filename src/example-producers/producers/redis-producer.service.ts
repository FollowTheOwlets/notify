import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RedisProducerService implements OnApplicationBootstrap {
  constructor(@Inject('REDIS_SERVICE') private client: ClientProxy) {}

  async onApplicationBootstrap() {
    await this.client.connect();
    this.client.emit('notify-warning.gasu-dev-service', {
      text: 'Hello from Redis client',
      rqId: '2bfb68bb-893a-423b-a7fa-7b568cad5b67',
      level: 'WARNING',
    });
  }
}
