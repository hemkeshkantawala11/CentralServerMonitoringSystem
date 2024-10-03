import { Controller, Get } from '@nestjs/common';
import { CustomLogger } from '../logger/custom-logger.service';
import { MetricsService } from '../metrics/metrics.service';

@Controller('books/outcome')
export class OutcomeController {
  constructor(
    private readonly logger: CustomLogger,
    private readonly metricsService: MetricsService,
  ) {}

  @Get()
  getRandomOutcome(): string {
    this.logger.log('Processing a request to get a random outcome');
    this.metricsService.incrementErrorCount();
    this.metricsService.incrementRequestCount();
    const randomValue = Math.random();

    if (randomValue < 0.5) {
      // Simulate success
      this.logger.log('Success: Request processed successfully');
      return 'Success: You have received a successful response!';
    } else {
      // Simulate an error
      const errorMsg = 'Error: Something went wrong!';
      this.logger.error(errorMsg);
      throw new Error(errorMsg);
    }
  }
}
