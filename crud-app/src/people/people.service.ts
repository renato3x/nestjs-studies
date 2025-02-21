import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  async findAll(): Promise<Person[]> {
    const people = await this.personRepository.find({
      order: {
        id: 'asc',
      },
    });

    return people;
  }

  async findById(id: number): Promise<Person> {
    const person = await this.personRepository.findOne({
      where: {
        id,
      },
    });

    if (!person) {
      throw new NotFoundException('Person not found');
    }

    return person;
  }

  async create(createPersonDto: CreatePersonDto): Promise<Person> {
    await this.throwErrorIfPersonWithEmailAlreadyExists(createPersonDto.email);

    createPersonDto.password = bcrypt.hashSync(createPersonDto.password, 10);
    const person = this.personRepository.create(createPersonDto);
    const savedPerson = this.personRepository.save(person);

    return savedPerson;
  }

  async update(id: number, updatePersonDto: UpdatePersonDto): Promise<void> {
    if (updatePersonDto.email) {
      await this.throwErrorIfPersonWithEmailAlreadyExists(
        updatePersonDto.email,
      );
    }

    if (updatePersonDto.password) {
      updatePersonDto.password = bcrypt.hashSync(updatePersonDto.password, 10);
    }

    await this.personRepository.update({ id }, updatePersonDto);
  }

  async delete(id: number): Promise<void> {
    await this.personRepository.delete({
      id,
    });
  }

  async throwErrorIfPersonWithEmailAlreadyExists(email: string): Promise<void> {
    const person = await this.personRepository.findOne({
      where: {
        email,
      },
    });

    if (person) {
      throw new ConflictException('Person with same e-mail already registered');
    }
  }
}
