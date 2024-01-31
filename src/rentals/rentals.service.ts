import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rental } from './rentals.entity';

@Injectable()
export class RentalsService {
  readonly DEFAULT_RELATIONS = ['book'];

  constructor(
    @InjectRepository(Rental)
    private readonly rentalRepository: Repository<Rental>,
  ) {}

  async findAll(): Promise<Rental[]> {
    return this.rentalRepository.find({ relations: this.DEFAULT_RELATIONS });
  }

  async findOne(id: number): Promise<Rental> {
    const rental = await this.rentalRepository.findOne({
      relations: this.DEFAULT_RELATIONS,
      where: { id },
    });

    if (!rental) throw new NotFoundException(`Rental with id ${id} not found.`);

    return rental;
  }
}
