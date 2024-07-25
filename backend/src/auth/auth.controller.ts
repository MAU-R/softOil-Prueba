import { Controller, Post, Body, Put, Param, Delete, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
//Definicion del controlador para el registro, con la ruta /auth
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

//*** Todos los endpoint mandan llamar la funcion de authService, respectiva  a su proposito ***/

//Endpoint post para registrar un nuevo usuario con la ruta/register
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }
//Endpoitn Put para catualizar un usuario con la ruta/upadte
  @Put('update/:id')
  async updateUser(@Param('id') id: string, @Body() dto: RegisterDto) {
    return this.authService.updateUser(Number(id), dto);
  }
//Endpoint Delete para catualizar un usuario con la ruta/upadte
  @Delete('delete/:id')
  async deleteUser(@Param('id') id: string) {
    return this.authService.deleteUser(Number(id));
  }
//Endpoint Put para catualizar un usuario con la ruta/upadte
  @Get('users')
  async getUsers() {
    return this.authService.getUsers();
  }
}


