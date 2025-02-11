import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RedisModule } from '~src/consumers/redis/redis.module';
import { RedisStatus } from '@nestjs/microservices/events';

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

  await app.listen(configService.get('http.port'));

  const redisApp = await NestFactory.createMicroservice<MicroserviceOptions>(RedisModule, {
    transport: Transport.REDIS,
    options: configService.get<Record<string, any>>('clients.redis'),
  });

  await redisApp.listen();
}
bootstrap();
