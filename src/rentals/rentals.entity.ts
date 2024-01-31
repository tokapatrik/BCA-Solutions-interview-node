import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from '../books/books.entity';

const dateTransformer = {
  to(value: Date): string {
    return value.toISOString().split('T')[0];
  },
  from(value: string): Date {
    return new Date(value);
  },
};

@Entity({ name: 'Rental' })
export class Rental extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => Book, (book) => book.rentals)
  book: Book;

  @Column({
    type: 'date',
    transformer: dateTransformer,
  })
  startDate: Date;

  @Column({ nullable: true, type: 'date', transformer: dateTransformer })
  endDate?: Date;
}
