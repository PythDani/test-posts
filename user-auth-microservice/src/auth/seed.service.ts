import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async onApplicationBootstrap() {
    const count = await this.userRepository.count();
    if (count > 0) return;

    const users = [
      {
        name: 'Admin',
        lastname: 'Admin',
        birthdate: '1990-01-01',
        username: 'daniel01',
        password: await bcrypt.hash('admin', 10),
      },
      {
        name: 'Maria',
        lastname: 'Lopez',
        birthdate: '1995-03-15',
        username: 'maria01',
        password: await bcrypt.hash('admin', 10),
      },
       {
        name: 'Pedro',
        lastname: 'Perez',
        birthdate: '1995-03-15',
        username: 'pedro53',
        password: await bcrypt.hash('admin', 10),
      },
       {
        name: 'Karina',
        lastname: 'Holguin',
        birthdate: '1995-03-15',
        username: 'kari34',
        password: await bcrypt.hash('admin', 10),
      },
       {
        name: 'Anto',
        lastname: 'Nella',
        birthdate: '1995-03-15',
        username: 'nella',
        password: await bcrypt.hash('admin', 10),
      },
       {
        name: 'Sofia',
        lastname: ' Bustamante',
        birthdate: '1995-03-15',
        username: 'sofi34',
        password: await bcrypt.hash('admin', 10),
      },
    ];

    await this.userRepository.save(users);
    console.log('Dummy users inserted');
  }
}
