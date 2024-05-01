import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Author } from '../authors/authors.entity';
import { Rental } from '../rentals/rentals.entity';

@Entity({ name: 'Book' })
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'int', nullable: true })
  year: number;

  @Column()
  workId: string;

  @ManyToMany(() => Author)
  @JoinTable({ name: 'author_book' })
  authors: Author[];

  @OneToMany(() => Rental, (rental) => rental.book)
  rentals: Rental[];
}
