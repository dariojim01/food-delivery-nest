import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService, 
  ) {}
  //registro usuario
  async register(registerDto: RegisterDto) {
    const { name, email, password } = registerDto;
    const user = {
      name,
      email,
      password
    };
    return user;
    
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
    const users = [
      {
        id: "1234",
        name: "Johntest",
        email: "johntest@me.com",
        password: "123456"
      }
    ];
    return users;
  }
}
