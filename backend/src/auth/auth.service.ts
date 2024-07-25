import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { EmailService } from './email/email.service';
import { Prisma } from '@prisma/client';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private emailService: EmailService) {}


  //Funcion para registrar nuevo usuario 
  async register(dto: RegisterDto) {
    //La contrseña se encripta con un hash 
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    //Try para crear un usuario en la base de datos
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
    const html = `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <div style="text-align: center; padding: 20px;">
      <img src="https://static.vecteezy.com/system/resources/thumbnails/005/283/048/small/teamwork-concept-in-3d-isometric-design-colleagues-work-together-on-project-team-building-and-collaboration-business-development-web-template-with-people-scene-illustration-for-webpage-vector.jpg" alt="Logo" style="width: 150px; height: auto;">
    </div>
    <div style="padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
      <h2 style="text-align: center; color: #4CAF50;">¡Bienvenido, ${dto.userName}!</h2>
      <p style="font-size: 16px;">Estamos emocionados de tenerte con nosotros. Tu cuenta ha sido creada exitosamente.</p>
      <p style="font-size: 16px;">Gracias por unirte a nuestra comunidad. Aquí hay algunas cosas que puedes hacer a continuación:</p>
      <ul style="font-size: 16px; list-style-type: none; padding: 0;">
        <li style="margin-bottom: 10px;">🔍 <strong>Explora:</strong> Navega por nuestra plataforma y descubre todo lo que ofrecemos.</li>
        <li style="margin-bottom: 10px;">📚 <strong>Aprende:</strong> Consulta nuestras guías y tutoriales para aprovechar al máximo tu experiencia.</li>
        <li style="margin-bottom: 10px;">🎉 <strong>Participa:</strong> Únete a nuestros eventos y participa en nuestra comunidad.</li>
      </ul>
      <p style="font-size: 16px;">Si tienes alguna pregunta, no dudes en <a href="mailto:soporte@tudominio.com" style="color: #4CAF50;">contactar a nuestro equipo de soporte</a>. ¡Estamos aquí para ayudarte!</p>
      <p style="font-size: 16px; text-align: center; color: #999;">Gracias por confiar en nosotros.</p>
    </div>
    <div style="text-align: center; padding: 20px; font-size: 14px; color: #999;">
      <p>© 2024 TuEmpresa. Todos los derechos reservados.</p>
    </div>
  </div>
`;
    await this.emailService.sendMail(dto.email, subject, text, html);
      //Regresamos usuario si es que fue exitoso 
    return user;
      //En caso de error revisamos si es por que el correo electronico ya esta en uso ya que esto nos sirve en el front-end
    }catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          // Extraer los detalles del campo que causó la violación
          const target = error.meta.target;
          //Aqui definimos que el error es que el email ya esta en uso y mandamos el mensaje de error 
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
  //Funcion para actualizar usuario 
  async updateUser(id: number, dto: RegisterDto) {
    //Igual que en la crecion de usuario se pasan los datos pero actualizados
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
  //Funcion para eliminar usuario
  async deleteUser(id: number) {
    //Se usa un try para eliminar el usuario, se pasa el id para eliminar al usuario seleccionado 
    try {
      await this.prisma.users.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Usuario no encontrado');
    }
  }
  //Funcion get para obtener todos los usuarios 
  async getUsers() {
    return this.prisma.users.findMany();
  }
}

