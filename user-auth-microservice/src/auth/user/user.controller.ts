import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";

@Controller('users')
export class UserController {
  constructor(private readonly authService: AuthService) {}

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.authService.getUserById(id);
  }
}
