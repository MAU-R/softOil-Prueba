import { Controller, Post, Body, Put, Param, Delete, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Put('update/:id')
  async updateUser(@Param('id') id: string, @Body() dto: RegisterDto) {
    return this.authService.updateUser(Number(id), dto);
  }

  @Delete('delete/:id')
  async deleteUser(@Param('id') id: string) {
    return this.authService.deleteUser(Number(id));
  }

  @Get('users')
  async getUsers() {
    return this.authService.getUsers();
  }
}


