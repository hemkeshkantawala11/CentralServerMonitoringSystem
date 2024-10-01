import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './books.schema';
import { CustomLogger } from '../logger/custom-logger.service';
import { MetricsModule } from '../metrics/metrics.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    MetricsModule, // Import MetricsModule here
  ],
  controllers: [BooksController],
  providers: [BooksService, CustomLogger],
})
export class BooksModule {}
