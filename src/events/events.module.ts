import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModule } from '~src/config/config.module';
import options from '~src/events/options';
import { MessagesModule } from '~src/messages/messages.module';
import { LoggerModule } from '~src/logger/logger.module';

@Module({
  imports: [ConfigModule, EventEmitterModule.forRoot(options), MessagesModule, LoggerModule],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
