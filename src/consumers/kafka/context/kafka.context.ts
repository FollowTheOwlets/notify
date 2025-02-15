import { EachMessagePayload } from 'kafkajs';

export class KafkaContext {
  constructor(private readonly message: EachMessagePayload) {}

  getMessage() {
    return this.message.message;
  }
}
