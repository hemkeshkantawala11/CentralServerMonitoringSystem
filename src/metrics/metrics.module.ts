import { Module } from '@nestjs/common';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { MetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';
import { Registry } from 'prom-client';

@Module({
  imports: [PrometheusModule.register()],
  providers: [
    MetricsService,
    {
      provide: Registry,
      useValue: new Registry(),
    },
  ],
  controllers: [MetricsController],
  exports: [MetricsService],
})
export class MetricsModule {}
