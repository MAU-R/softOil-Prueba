import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { EmailService } from './email/email.service';
import { Prisma } from '@prisma/client';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private emailService: EmailService) {}

  async register(dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    try{ 
      const user = await this.prisma.users.create({
        data: {
          email: dto.email,
          password: hashedPassword,
          userName: dto.userName,
        },
      });
          // Enviar correo de confirmación
    const subject = 'Confirmación de creación de cuenta';
    const text = `Hola ${dto.userName}, tu cuenta ha sido creada exitosamente.`;
    const html = `<p>Hola ${dto.userName},</p><p>Tu cuenta ha sido creada exitosamente.</p>`;
    await this.emailService.sendMail(dto.email, subject, text, html);

    return user;

    }catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          // Extraer los detalles del campo que causó la violación
          const target = error.meta.target;
          console.log("Aqui esta el error:", error)
          if (target[0]=='email') {
            throw new ConflictException('El email ya está en uso');
          } else {
           // throw new ConflictException(`El valor para ${target.join(', ')} ya está en uso`);
          }
        }
      }
      throw error;
    }

  }

  async updateUser(id: number, dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    try {
      const user = await this.prisma.users.update({
        where: { id },
        data: {
          email: dto.email,
          password: hashedPassword,
          userName: dto.userName,
        },
      });
      return user;
    } catch (error) {
      throw new NotFoundException('Usuario no encontrado');
    }
  }

  async deleteUser(id: number) {
    try {
      await this.prisma.users.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Usuario no encontrado');
    }
  }

  async getUsers() {
    return this.prisma.users.findMany();
  }
}

