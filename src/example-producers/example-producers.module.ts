import { Module } from '@nestjs/common';
import { KafkaProducerService } from '~src/example-producers/producers/kafka-producer.service';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '~src/core/config/config.module';
import { ConfigService } from '@nestjs/config';
import { RedisProducerService } from '~src/example-producers/producers/redis-producer.service';

@Module({
  imports: [
    ConfigModule,
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
    ClientsModule.registerAsync([
      {
        name: 'REDIS_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
          return {
            transport: Transport.REDIS,
            options: configService.get<Record<string, any>>('clients.redis'),
          };
        },
      },
    ]),
  ],
  providers: [
    {
      provide: KafkaProducerService,
      inject: [ConfigService, 'KAFKA_SERVICE'],
      useFactory: (configService: ConfigService, clientProxy: ClientProxy) =>
        configService.get<boolean>('test.producers.kafka') ? new KafkaProducerService(clientProxy) : '',
    },
    {
      provide: RedisProducerService,
      inject: [ConfigService, 'REDIS_SERVICE'],
      useFactory: (configService: ConfigService, clientProxy: ClientProxy) =>
        configService.get<boolean>('test.producers.redis') ? new RedisProducerService(clientProxy) : '',
    },
  ],
})
export class ExampleProducersModule {}
