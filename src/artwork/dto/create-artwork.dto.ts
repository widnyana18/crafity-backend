import { IsDateString, IsNotEmpty, isNumber, IsNumber, IsString } from 'class-validator';

export class CreateArtworkDto {
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
