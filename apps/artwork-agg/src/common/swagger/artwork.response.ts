import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateArtworkDto } from 'apps/artwork-agg/src/artwork/dto/create-artwork.dto';

export class ArtworkResSuccesCreate extends PartialType(CreateArtworkDto) {
  @ApiProperty({
    description: 'Id auto generate dari mongodb',
    example: '66580386572c487d00eef243',
    uniqueItems: true,
  })
  _id: string;

  @ApiProperty({
    description: 'Silahkan masukan nama karya yang akan di masukan',
    example: 'Dellusion Anime',
  })
  art: string;

  @ApiProperty({
    description: 'Silahkan masukan nama artist yang akan di masukan',
    example: 'Sofyan Rahman',
  })
  artist: string;

  @ApiProperty({
    description: 'Silahkan masukan harga karya seni',
    example: 20.38,
    type: Number,
  })
  price: number;
}
