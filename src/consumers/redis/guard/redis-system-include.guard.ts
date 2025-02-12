import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { RedisContext } from '@nestjs/microservices';

@Injectable()
export class RedisSystemIncludeGuard implements CanActivate {
  private readonly producers: Record<string, unknown>;

  constructor(private readonly configService: ConfigService) {
    this.producers = this.configService.get('service.producers');
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = context.switchToRpc().getContext<RedisContext>();
    const source = ctx.getArgByIndex(0).split('.')[1];
    return !!this.producers[source];
  }
}
