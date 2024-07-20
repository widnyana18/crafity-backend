import {
  Body,
  Controller,
  Delete,
  Get,    
  Param,  
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ArtworkService } from './artwork.service';
import { CreateArtworkDto } from './dto/create-artwork.dto';
import { UpdateArtworkDto } from './dto/update-artwork.dto';
import { MongoIdValidationPipe } from 'src/common/pipes/validator/mongoid.validator';
import { JwtAuthGuard } from 'src/authentication/guard/jwt.guard';

@Controller('artwork')
export class ArtworkController {
  constructor(private artworkService: ArtworkService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createArtworkDTO: CreateArtworkDto) {
    try {
      return this.artworkService.create(createArtworkDTO);
    } catch (e) {
      throw e.message;
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.artworkService.findAll();
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  findOne(
    @Param('id',
   MongoIdValidationPipe,      
    )
    id: string,
  ) {
    return this.artworkService.findOne(id);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id', MongoIdValidationPipe) id: string, @Body() UpdateArtworkDto: UpdateArtworkDto) {
    try {
      return this.artworkService.update(id, UpdateArtworkDto);
    } catch (error) {
      throw error.message;
    }
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', MongoIdValidationPipe) id: string) {
    try {
      return this.artworkService.remove(id);
    } catch (error) {
      throw error.message;
    }
  }
}
