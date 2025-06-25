import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import UserDto from 'src/dtos/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async validateUser(username: string, password: string): Promise<string | null> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (user && await bcrypt.compare(password, user.password)) {
      const payload = { username: user.username, sub: user.id };
      return this.jwtService.sign(payload);
    }
    return null;
  }

  username!: string;
  async registerUser(name: string, lastname: string, birthdate: string, username: string, password: string) {
    const existing = await this.usersRepository.findOne({ where: { username } });
    if (existing) {
      return { message: 'User already exists' };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({ name, lastname, birthdate, username, password: hashedPassword });
    await this.usersRepository.save(user);
    return { message: 'User registered successfully' };
  }

  async getUserById(id: number): Promise<UserDto> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password, ...publicData } = user;
    return publicData;
  }
}