import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ArtworkService } from './artwork.service';
import { CreateArtworkDto } from './dto/create-artwork.dto';
import { UpdateArtworkDto } from './dto/update-artwork.dto';
import { AccessTokenGuard } from '../guard/access-token.guard';
import { MongoIdValidationPipe } from '@app/shared';

@UseGuards(AccessTokenGuard)
@Controller('artwork-agg')
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
  findAll(@Query() query: any) {
    return this.artworkService.findAll(query);
  }

  @Get('/:id')
  findOne(
    @Param('id', MongoIdValidationPipe)
    id: string,
  ) {
    return this.artworkService.findOne(id);
  }

  @Patch('/:id')
  update(
    @Param('id', MongoIdValidationPipe) id: string,
    @Body() UpdateArtworkDto: UpdateArtworkDto,
  ) {
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
