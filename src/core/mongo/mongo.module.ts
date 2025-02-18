import { Module } from '@nestjs/common';
import { ConfigModule } from '~src/core/config/config.module';
import { MongooseModule } from '@nestjs/mongoose';
import options from '~src/core/mongo/options';
import { LoggerModule } from '~src/core/logger/logger.module';

@Module({
  imports: [MongooseModule.forRootAsync(options()), ConfigModule, LoggerModule],
})
export class MongoModule {}
