import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './authors.entity';

@Injectable()
export class AuthorsService {
  readonly DEFAULT_RELATIONS = ['books'];

  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  findAll(): Promise<Author[]> {
    return this.authorRepository.find({ relations: this.DEFAULT_RELATIONS });
  }

  async findOne(id: number): Promise<Author> {
    const author = await this.authorRepository.findOne({
      relations: this.DEFAULT_RELATIONS,
      where: { id },
    });

    if (!author) throw new NotFoundException(`Author with id ${id} not found.`);

    return author;
  }
}
