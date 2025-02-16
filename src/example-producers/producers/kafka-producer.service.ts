import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import HEADERS from '~src/api/headers';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class KafkaProducerService implements OnApplicationBootstrap {
  constructor(@Inject('KAFKA_SERVICE') private client: ClientProxy) {}

  async onApplicationBootstrap() {
    await this.client.connect();
    const headers = {};
    headers[HEADERS.X_SYSTEM_SOURCE_ID] = 'gasu-dev-service';
    headers[HEADERS.X_REQUEST_ID] = '2bfb68bb-893a-423b-a7fa-7b568cad5b67';
    this.client.emit('notify', {
      value: 'Hello from micro client',
      key: 'COMPLETED',
      headers,
    });
  }
}
