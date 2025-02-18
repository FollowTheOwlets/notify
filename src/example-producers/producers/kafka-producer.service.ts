import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import HEADERS from '~src/api/headers';
import { ClientProxy } from '@nestjs/microservices';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class KafkaProducerService implements OnApplicationBootstrap {
  constructor(@Inject('KAFKA_SERVICE') private client: ClientProxy) {}

  async onApplicationBootstrap() {
    await this.client.connect();
    const headers = {};
    headers[HEADERS.X_SYSTEM_SOURCE_ID] = 'gasu-dev-service';
    headers[HEADERS.X_REQUEST_ID] = uuidV4();
    this.client.emit('notify', {
      value: 'Test connected from KafkaProducer',
      key: 'ALERT',
      headers,
    });
  }
}
