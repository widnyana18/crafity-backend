import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { response } from 'express';
import { TokenExpiredError } from '@nestjs/jwt';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';
import {
  ErrorBadRequestExecption,
  ErrorUnauthorizedException,
} from '@app/shared';
import { LoginBody, LoginResponseSuccess, SignupBody, SignupResponseSuccess } from '../common';

@ApiTags('Authentication')
@Controller('authentication')
export class AuthController {
  constructor(private authService: AuthService) {}
  
  @ApiBody({ required: true, type: SignupBody })
  @ApiCreatedResponse({ type: SignupResponseSuccess })
  @ApiBadRequestResponse({ type: ErrorBadRequestExecption })
  @ApiExcludeEndpoint()
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

  @HttpCode(HttpStatus.OK)
  @ApiBody({ required: true, type: LoginBody })
  @ApiOkResponse({ type: LoginResponseSuccess })
  @ApiUnauthorizedResponse({ type: ErrorUnauthorizedException })
  @ApiBadRequestResponse({ type: ErrorBadRequestExecption })
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
