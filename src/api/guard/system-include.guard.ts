import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import headers from '~src/api/headers';

@Injectable()
export class SystemIncludeGuard implements CanActivate {
  private readonly producers: Record<string, unknown>;

  constructor(private readonly configService: ConfigService) {
    this.producers = this.configService.get('service.producers');
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const source = request.headers[headers.X_SYSTEM_SOURCE_ID];
    return !!this.producers[source];
  }
}
