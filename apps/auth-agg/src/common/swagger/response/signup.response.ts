import { ApiProperty } from '@nestjs/swagger';

export class SignupResponseSuccess {
  @ApiProperty()
  email: 'example@test.com';  

  @ApiProperty({
    description: 'Berisi description tentang success',
    example: 'Berhasil Membuat Akun',
    type: String,
  })
  message: string;
}
