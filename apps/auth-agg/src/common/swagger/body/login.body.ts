import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { LoginDTO } from 'apps/auth-agg/src/authentication/dto/login.dto';

export class LoginBody extends PartialType(LoginDTO) {
  @ApiProperty({
    required: true,
    description: 'Silahkan masukan email anda',
    example: 'example@test.com',
    minLength: 4,
    type: String,
  })
  email: string;

  @ApiProperty({
    required: true,
    description: 'Silahkan masukan password anda',
    example: 'gundamRx70',
    minLength: 4,
    type: String,
  })
  password: string; 
}