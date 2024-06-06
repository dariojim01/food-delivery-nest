import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/user.dto';
import { PrismaService } from '../../../prisma/Prisma.service';
import { Response } from 'express';

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService, 
  ) {}
  //registro usuario
  async register(registerDto: RegisterDto, res: Response) {
    const { name, email, password } = registerDto;
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password
      }
    })
    return  {user, res};
    
  }

  //login service
  async login(loginDto){
    const { email, password } = loginDto;
    const user = {
      email,
      password
    };
    return user;
  }

  //Obtener todos los usuarios
  async getUsers() {
    return this.prisma.user.findMany({});
  }
}
