import { Controller } from '@nestjs/common';
import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './books.schema';
import { CustomLogger } from '../logger/custom-logger.service';
import { MetricsService } from '../metrics/metrics.service';

@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly logger: CustomLogger,
    private readonly metricsService: MetricsService,
  ) {}

  @Post()
  async create(@Body() createBookDto: Book) {
    this.logger.log('Adding a new book in the library');
    this.metricsService.incrementRequestCount();
    return this.booksService.create(createBookDto);
  }

  @Get()
  async findAll() {
    this.logger.log('Getting all the books present in the library');
    this.metricsService.incrementRequestCount();
    return this.booksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    this.logger.log('Getting a book by ID from the library');
    this.metricsService.incrementRequestCount();
    return this.booksService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: Book) {
    this.logger.log('Updating a book in the library by its id');
    this.metricsService.incrementRequestCount();
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    this.logger.log('Deleting a book from the library by its id');
    this.metricsService.incrementRequestCount();
    return this.booksService.delete(id);
  }

  @Get('outcome')
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
