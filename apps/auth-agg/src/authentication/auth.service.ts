import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { LoginDTO } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { PayloadType } from '../types/types';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userClientService: ClientProxy,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async login(loginDTO: LoginDTO): Promise<string> {
    const user = await firstValueFrom(
      this.userClientService.send('find-user', { email: loginDTO.email }),
    ); // 1.

    const passwordMatched = await bcrypt.compare(
      loginDTO.password,
      user.password,
    );

    if (passwordMatched) {
      delete user.password;
      const payload: PayloadType = { email: user.email, userId: user._id };
      return this.jwtService.signAsync(payload);
    } else {
      throw new UnauthorizedException('Password does not match'); // 5.
    }
  }

  async signup(signUpDto: SignUpDto): Promise<any> {
    try {
      return await firstValueFrom(
        this.userClientService.send('create-user', signUpDto),
      ); // 1.
    } catch (error) {
      throw new Error(error);
    }
  }

  async verifyToken(token: string) {
    try {
      const data = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration,
      );
      if (data.userId !== null) {
        throw new Error(
          `user : ${data.username} , Token is Not Found in Redis`,
        );
      }
      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
}
