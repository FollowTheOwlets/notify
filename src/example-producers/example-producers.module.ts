import { Module } from '@nestjs/common';
import { KafkaProducerService } from '~src/example-producers/producers/kafka-producer.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '~src/config/config.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
          return {
            transport: Transport.KAFKA,
            options: configService.get<Record<string, any>>('clients.kafka'),
          };
        },
      },
    ]),
  ],
  providers: [KafkaProducerService],
})
export class ExampleProducersModule {}
