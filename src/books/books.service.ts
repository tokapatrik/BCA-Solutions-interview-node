import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { OpenLibraryClientService } from '../open-library/open-library-client.service';
import { Book } from './books.entity';

@Injectable()
export class BooksService {
  readonly DEFAULT_RELATIONS = ['authors'];

  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    private readonly openLibraryClientService: OpenLibraryClientService,
  ) { }

  findAll(): Promise<Book[]> {
    return this.bookRepository.find({ relations: this.DEFAULT_RELATIONS });
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({
      relations: this.DEFAULT_RELATIONS,
      where: { id },
    });

    if (!book) throw new NotFoundException(`Book with id ${id} not found.`);

    return book;
  }

  async updateAllWithYear(): Promise<Book[]> {
    const allBooks = await this.findAll();

    for (const book of allBooks) {
      const { data } = await this.openLibraryClientService.getBookDetails(
        book.workId,
      );
      const year = new Date(data.first_publish_date).getFullYear();
      if (!isNaN(year)) {
        book.year = year;
      }
    }

    return this.bookRepository.save(allBooks);
  }

  async queryAll(country: string, fromYear: number): Promise<Book[]> {
    if (fromYear && isNaN(fromYear)) {
      throw new BadRequestException('Invalid year parameter.');
    }


    const allBooks = await this.bookRepository.find({
      relations: this.DEFAULT_RELATIONS,
      where: {
        authors: { country: country },
        year: MoreThanOrEqual(fromYear),
      },
      order: { year: 'ASC' },
    });

    if (!allBooks) throw new NotFoundException(`Books not found.`);

    return allBooks;
  }
}
