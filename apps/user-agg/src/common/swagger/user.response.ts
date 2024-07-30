import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { UpdateUserDto } from '../../user/dto/update-user.dto';

export class UserResSuccesCreate extends PartialType(UpdateUserDto) {
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
