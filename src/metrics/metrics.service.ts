import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Counter, Gauge, Registry } from 'prom-client';
import * as process from 'process';

@Injectable()
export class MetricsService implements OnModuleInit, OnModuleDestroy {
  public serverUptime: Gauge<string>;
  public requestCount: Counter<string>;
  public errorCount: Counter<string>;
  private intervalId: number; // Change type to number

  constructor(private readonly registry: Registry) {
    this.serverUptime = new Gauge({
      name: 'server_uptime_seconds',
      help: 'Server uptime in seconds',
      registers: [this.registry],
    });

    this.requestCount = new Counter({
      name: 'request_count_total',
      help: 'Total number of requests received',
      registers: [this.registry],
    });

    this.errorCount = new Counter({
      name: 'error_count_total',
      help: 'Total number of errors encountered',
      registers: [this.registry],
    });

    // Set initial server uptime
    this.serverUptime.set(process.uptime());
  }

  onModuleInit() {
    // Update server uptime every 10 seconds
    this.intervalId = setInterval(() => {
      this.updateServerUptime();
    }, 10000) as unknown as number; // Cast to number
  }

  onModuleDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  incrementRequestCount() {
    this.requestCount.inc();
  }

  incrementErrorCount() {
    this.errorCount.inc();
  }

  updateServerUptime() {
    this.serverUptime.set(process.uptime());
  }
}
