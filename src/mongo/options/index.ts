import { Connection } from 'mongoose';
import { ConfigModule } from '~src/config/config.module';
import { ConfigService } from '@nestjs/config';
import { LoggerProvider } from '~src/logger/logger.provider';
import { LoggerModule } from '~src/logger/logger.module';

export default () => ({
  imports: [ConfigModule, LoggerModule],
  useFactory: (configService: ConfigService, loggerProvider: LoggerProvider) => ({
    uri: configService.get<string>('db.mongo.url'),
    serverSelectionTimeoutMS: 5000,
    retryWrites: true,
    onConnectionCreate: (connection: Connection) => {
      const logger = loggerProvider.createLogger(this);

      const log = (message: string) => () => logger.D(`Database: debug log \n ${message}`);
      const warn = (message: string) => () => logger.W(`Database: warn log \n ${message}`);

      connection.on('connected', log('connected'));
      connection.on('open', log('open'));
      connection.on('disconnected', warn('disconnected'));
      connection.on('reconnected', warn('reconnected'));
      connection.on('disconnecting', warn('disconnecting'));

      return connection;
    },
  }),
  inject: [ConfigService, LoggerProvider],
});