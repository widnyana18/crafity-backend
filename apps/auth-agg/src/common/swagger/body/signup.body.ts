import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { SignUpDto } from 'apps/auth-agg/src/authentication/dto/sign-up.dto';

export class SignupBody extends PartialType(SignUpDto) {
  @ApiProperty({
    required: true,
    description: 'Silahkan masukan nama depan anda',
    example: 'Ronaldes',    
    type: String,
  })
  firstName: string;

  @ApiProperty({
    required: true,
    description: 'Silahkan masukan nama belakang anda',
    example: 'Cirruss',    
    type: String,
  })
  lastName: string;

  @ApiProperty({
    required: true,
    description: 'Silahkan masukan email anda',
    example: 'example@test.com',    
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