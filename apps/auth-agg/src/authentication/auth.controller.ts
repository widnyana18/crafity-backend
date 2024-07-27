import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { SignUpDto } from './dto/sign-up.dto';
import { response } from 'express';
import { TokenExpiredError } from '@nestjs/jwt';

@Controller('authentication')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body()
    signUpDto: SignUpDto,
  ) {
    const createdUser = await this.authService.signup(signUpDto);
    response.status(HttpStatus.CREATED).json({
      message: 'Selamat Anda Berhasil Membuat Akun',
      user: createdUser,
      StatusCode: HttpStatus.CREATED,
    });
  }

  @Post('login')
  async login(
    @Body()
    loginDTO: LoginDTO,
  ) {
    const result = await this.authService.login(loginDTO);
    
    response.status(HttpStatus.ACCEPTED).json({
      message: 'Selamat Anda Berhasil Login',
      token: result,
      StatusCode: HttpStatus.ACCEPTED,
    });
  }

  @MessagePattern('verify-token')
  async validateUser(jwtToken: string) {
    try {
      return await this.authService.verifyToken(jwtToken);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new RpcException(
          new UnauthorizedException('Silahkan Login Kembali').getResponse(),
        );
      }
      throw new RpcException(
        new UnauthorizedException('Silahkan Login Kembali').getResponse(),
      );
    }
  }
}
