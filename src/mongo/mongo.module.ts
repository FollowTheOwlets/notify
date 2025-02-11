import { Module } from '@nestjs/common';
import { ConfigModule } from '~src/config/config.module';
import { MongooseModule } from '@nestjs/mongoose';
import options from '~src/mongo/options';
import { LoggerModule } from '~src/logger/logger.module';

@Module({
  imports: [MongooseModule.forRootAsync(options()), ConfigModule, LoggerModule],
})
export class MongoModule {}
