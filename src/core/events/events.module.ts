import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModule } from '~src/core/config/config.module';
import options from '~src/core/events/options';
import { LoggerModule } from '~src/core/logger/logger.module';
import { MessagesModule } from '~src/core/messages/messages.module';

@Module({
  imports: [ConfigModule, EventEmitterModule.forRoot(options), LoggerModule, MessagesModule],
  providers: [
    EventsService,
    {
      provide: 'SENDERS',
      useValue: ['smtp', 'telegram'],
    },
  ],
  exports: [EventsService],
})
export class EventsModule {}
