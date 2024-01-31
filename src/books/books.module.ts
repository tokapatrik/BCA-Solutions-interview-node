import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpenLibraryModule } from '../open-library/open-library.module';
import { BooksController } from './books.controller';
import { Book } from './books.entity';
import { BooksService } from './books.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), OpenLibraryModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
