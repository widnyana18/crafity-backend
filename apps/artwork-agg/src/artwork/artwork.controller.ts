import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ArtworkService } from './artwork.service';
import { CreateArtworkDto } from './dto/create-artwork.dto';
import { UpdateArtworkDto } from './dto/update-artwork.dto';
import { AccessTokenGuard } from '../../../../libs/shared/src/guard/access-token.guard';
import { MongoIdValidationPipe } from '@app/shared';
import { response } from 'express';

@UseGuards(AccessTokenGuard)
@Controller('artwork')
export class ArtworkController {
  constructor(private artworkService: ArtworkService) {}

  @Post()
  async create(@Body() createArtworkDTO: CreateArtworkDto) {
    const artwork = await this.artworkService.create(createArtworkDTO);

    response.status(HttpStatus.CREATED).json({
      message: 'Anda berhasil menambahkan data artwork',
      data: artwork,
      StatusCode: HttpStatus.CREATED,
    });
  }

  @Get()
  async findAll(@Query() query: any) {
    return await this.artworkService.findAll(query);
  }

  @Get('/:id')
  async findOne(
    @Param('id', MongoIdValidationPipe)
    id: string,
  ) {
    return await this.artworkService.findOne(id);
  }

  @Patch('/:id')
  async update(
    @Param('id', MongoIdValidationPipe) id: string,
    @Body() UpdateArtworkDto: UpdateArtworkDto,
  ) {
    const updatedArtwork = await this.artworkService.update(id, UpdateArtworkDto);

    response.status(HttpStatus.ACCEPTED).json({
      message: 'Data berhasil di update',
      data: updatedArtwork,
      StatusCode: HttpStatus.ACCEPTED,
    });
  }

  @Delete('/:id')
  async remove(@Param('id', MongoIdValidationPipe) id: string) {
    await this.artworkService.remove(id);
    response.status(HttpStatus.ACCEPTED).json({
      message: 'Data Anda berhasil di hapus',      
      StatusCode: HttpStatus.ACCEPTED,
    });
  }
}
