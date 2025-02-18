import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { RedisModule } from '~src/consumers/redis/redis.module';
import { ConfigService } from '@nestjs/config';
import { AppModule } from '~src/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { KafkaModule } from '~src/consumers/kafka/kafka.module';

async function bootstrapMicroservice(
  moduleCls: any,
  transport: Transport,
  configService: ConfigService,
  options: string,
) {
  const redisApp = await NestFactory.createMicroservice(moduleCls, {
    transport,
    options: configService.get<Record<string, any>>(options),
  });

  await redisApp.listen();
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Notify')
    .setDescription('Universal notify service')
    .setVersion('1.0')
    .addTag('notify')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, documentFactory);

  await bootstrapMicroservice(RedisModule, Transport.REDIS, configService, 'clients.redis');
  await bootstrapMicroservice(KafkaModule, Transport.KAFKA, configService, 'clients.kafka');

  await app.listen(configService.get('http.port'));
}

bootstrap();
