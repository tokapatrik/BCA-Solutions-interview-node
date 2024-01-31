import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from '../books/books.entity';

@Entity({ name: 'Author' })
export class Author extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  country: string;

  @ManyToMany(() => Book)
  @JoinTable({ name: 'author_book' })
  books: Book[];
}
