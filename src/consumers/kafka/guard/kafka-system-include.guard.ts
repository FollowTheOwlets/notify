import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { KMessage } from '~src/consumers/kafka/types';
import headers from '~src/api/headers';

@Injectable()
export class KafkaSystemIncludeGuard implements CanActivate {
  private readonly producers: Record<string, unknown>;

  constructor(private readonly configService: ConfigService) {
    this.producers = this.configService.get('service.producers');
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = context.switchToRpc().getContext<any>();
    const source = KMessage.of(ctx.getMessage()).headers[headers.X_SYSTEM_SOURCE_ID];
    return !!this.producers[source];
  }
}
