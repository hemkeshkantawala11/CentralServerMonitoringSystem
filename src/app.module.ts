import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from './books/books.module';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { MetricsModule } from './metrics/metrics.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://extrasignwala:mongodbpw@cluster0.svyqff3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    BooksModule,
    PrometheusModule.register({
      defaultMetrics: {
        enabled: false, // Disable default metrics to avoid duplicate registration
      },
    }),
    MetricsModule,
  ],
})
export class AppModule {}
