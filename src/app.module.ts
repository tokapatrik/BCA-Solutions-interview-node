import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';
import { OpenLibraryModule } from './open-library/open-library.module';
import { RentalsModule } from './rentals/rentals.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'sqlite.db',
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
    }),
    BooksModule,
    AuthorsModule,
    OpenLibraryModule,
    RentalsModule,
  ],
})
export class AppModule {}
