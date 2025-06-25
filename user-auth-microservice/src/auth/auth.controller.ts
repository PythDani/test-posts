import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import UserDto from 'src/dtos/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  async login(
    @Query('username') username: string,
    @Query('password') password: string,
  ) {
    const token = await this.authService.validateUser(username, password);
    if (!token) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return { access_token: token };
  }

  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('lastname') lastName: string,
    @Body('birthdate') birthdate: string,
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.authService.registerUser(name, lastName, birthdate, username, password);
  }

}