import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { PublicPersonDto } from './dto/public-person.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PeopleService {
  constructor(@InjectRepository(Person) private readonly personRepository: Repository<Person>) {}

  async create(createPersonDto: CreatePersonDto): Promise<Person> {
    await this.throwErrorIfPersonWithEmailAlreadyExists(createPersonDto.email);

    createPersonDto.password = bcrypt.hashSync(createPersonDto.password, 10);
    const person = this.personRepository.create(createPersonDto);
    const savedPerson = this.personRepository.save(person);

    return plainToInstance(PublicPersonDto, savedPerson, { excludeExtraneousValues: true });
  }

  async findAll(): Promise<PublicPersonDto[]> {
    const people = await this.personRepository.find();
    return plainToInstance(PublicPersonDto, people, { excludeExtraneousValues: true });
  }

  async findOne(id: number): Promise<PublicPersonDto> {
    const person = await this.personRepository.findOne({ where: { id } });

    if (!person) {
      throw new NotFoundException('Person not found');
    }

    return plainToInstance(PublicPersonDto, person, { excludeExtraneousValues: true });
  }

  async update(id: number, updatePersonDto: UpdatePersonDto): Promise<void> {
    if (updatePersonDto.email) {
      await this.throwErrorIfPersonWithEmailAlreadyExists(updatePersonDto.email);
    }

    if (updatePersonDto.password) {
      updatePersonDto.password = bcrypt.hashSync(updatePersonDto.password, 10);
    }

    await this.personRepository.update({ id }, updatePersonDto);
  }

  async remove(id: number): Promise<void> {
    await this.personRepository.delete({ id });
  }

  async throwErrorIfPersonWithEmailAlreadyExists(email: string): Promise<void> {
    const person = await this.personRepository.findOne({
      where: { email },
    });

    if (person) {
      throw new ConflictException('Person with same e-mail already registered');
    }
  }
}
