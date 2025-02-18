import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { ApiModule } from './api/api.module';
import { ExampleProducersModule } from './example-producers/example-producers.module';
import { CoreModule } from '~src/core/core.module';

@Module({
  imports: [ApiModule, HealthModule, CoreModule, ExampleProducersModule],
})
export class AppModule {}
