import {
  Body,
  Controller,
  Delete,
  Get,  
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ArtworkService } from './artwork.service';
import { CreateArtworkDto } from './dto/create-artwork.dto';
import { UpdateArtworkDto } from './dto/update-artwork.dto';
import { MongoIdValidationPipe } from 'src/common/pipes/validator/mongoid.validator';

@Controller('artwork')
export class ArtworkController {
  constructor(private artworkService: ArtworkService) {}

  @Post()
  create(@Body() createArtworkDTO: CreateArtworkDto) {
    try {
      return this.artworkService.create(createArtworkDTO);
    } catch (e) {
      throw e.message;
    }
  }

  @Get()
  findAll() {
    return this.artworkService.findAll();
  }

  @Get('/:id')
  findOne(
    @Param('id',
   MongoIdValidationPipe,      
    )
    id: string,
  ) {
    return this.artworkService.findOne(id);
  }

  @Patch('/:id')
  update(@Param('id', MongoIdValidationPipe) id: string, @Body() UpdateArtworkDto: UpdateArtworkDto) {
    try {
      return this.artworkService.update(id, UpdateArtworkDto);
    } catch (error) {
      throw error.message;
    }
  }

  @Delete('/:id')
  remove(@Param('id', MongoIdValidationPipe) id: string) {
    try {
      return this.artworkService.remove(id);
    } catch (error) {
      throw error.message;
    }
  }
}
