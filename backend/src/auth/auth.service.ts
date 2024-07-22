import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { EmailService } from './email/email.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private emailService: EmailService) {}

  async register(dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
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
  }
}
