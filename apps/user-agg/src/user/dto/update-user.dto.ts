import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly art: string;

  @IsNotEmpty()
  @IsString()
  readonly artist: string;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;
}
