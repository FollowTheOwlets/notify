import { Module } from '@nestjs/common';
import { RedisController } from './redis.controller';
import { CoreModule } from '~src/core/core.module';

@Module({
  imports: [CoreModule],
  controllers: [RedisController],
})
export class RedisModule {}
