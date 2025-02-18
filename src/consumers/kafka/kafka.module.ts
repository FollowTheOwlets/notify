import { Module } from '@nestjs/common';
import { KafkaController } from '~src/consumers/kafka/kafka.controller';
import { CoreModule } from '~src/core/core.module';

@Module({
  imports: [CoreModule],
  controllers: [KafkaController],
})
export class KafkaModule {}
