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
  Version,
} from '@nestjs/common';
import { ArtworkService } from './artwork.service';
import { CreateArtworkDto } from './dto/create-artwork.dto';
import { UpdateArtworkDto } from './dto/update-artwork.dto';
import { AccessTokenGuard } from '../../../../libs/shared/src/guard/access-token.guard';
import { DeletingData, ErrorBadRequestExecption, ErrorNotFoundExeption, MongoIdValidationPipe, ShowingData } from '@app/shared';
import { response } from 'express';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ArtworkResSuccesCreate } from '../common/swagger/artwork.response';

@ApiBearerAuth('jwt')
@ApiTags('User')
@UseGuards(AccessTokenGuard)
@Controller('artwork')
export class ArtworkController {
  constructor(private artworkService: ArtworkService) {}

  @Version('1')
  @ApiOperation({ summary: 'Membuat Artwork' })
  @ApiCreatedResponse({ type: ArtworkResSuccesCreate })
  @ApiBadRequestResponse({ type: ErrorBadRequestExecption })
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
  @Version('1')
  @ApiOperation({
    summary: 'Pencarian Artwork secara handal',
    description: `Dalam api ini bisa:\n
        1. Mencari data field\n
        2. Menampilkan beberapa field (data yang dibutuhkan, Multiple) ex:name\n
        3. Sorting (ASC/DESC ,Multiple field) ex:-created_at\n
        4. ShowingData \n`,
    externalDocs: {
      url: 'http://localhost:9000/artwork?art=dragun',
      description: `
        Ex: pencarian handal. \n
        1. filds[regex]=value -> mencari string di suatu field yang mengandung kata dari value(case in sensitive) ex:name[regex]=hanafi\n
        2. filds[in]=value -> mencari sebuah string dalam filed yang bertipe array string\n
        3. filds[eq]=value -> mencari sebuah kata yang sama dengan value pada fild yang di cari(case Sensitive)\n
        4. fileds[ne]=value -> mencari data yang tidak sama dengan value pada sebuah field\n
        5. fields[or]=value -> mengkombine beberapa filed untuk mencari data tertentu
      `,
    },
  })
  @ApiBadRequestResponse({ type: ErrorBadRequestExecption })
  @ApiOkResponse({ type: ShowingData })
  async findAll(@Query() query: any) {
    return await this.artworkService.findAll(query);
  }

  @Get('/:id')
  @Version('1')
  @ApiOperation({ summary: 'mendapatkan satu Artwork' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'id yang di gunakan untuk paramester harus mongo id',
  })
  @ApiOkResponse({ type: ArtworkResSuccesCreate })
  @ApiBadRequestResponse({ type: ErrorBadRequestExecption })
  @ApiNotFoundResponse({ type: ErrorNotFoundExeption })
  async findOne(
    @Param('id', MongoIdValidationPipe)
    id: string,
  ) {
    return await this.artworkService.findOne(id);
  }

  @Patch('/:id')
  @Version('1')
  @ApiOperation({ summary: 'update satu Data Artwork' })
  @ApiOkResponse({ type: ArtworkResSuccesCreate })
  @ApiBadRequestResponse({ type: ErrorBadRequestExecption })
  @ApiNotFoundResponse({ type: ErrorNotFoundExeption })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'id yang di gunakan untuk paramester harus mongo id',
  })
  async update(
    @Param('id', MongoIdValidationPipe) id: string,
    @Body() UpdateArtworkDto: UpdateArtworkDto,
  ) {
    const updatedArtwork = await this.artworkService.update(
      id,
      UpdateArtworkDto,
    );

    response.status(HttpStatus.ACCEPTED).json({
      message: 'Data berhasil di update',
      data: updatedArtwork,
      StatusCode: HttpStatus.ACCEPTED,
    });
  }

  @Delete('/:id')
  @Version('1')
  @ApiOperation({ summary: 'menghapus satu baris Artwork' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'id yang di gunakan untuk paramester harus mongo id',
  })
  @ApiBadRequestResponse({ type: ErrorBadRequestExecption })
  @ApiOkResponse({ type: DeletingData })
  @ApiNotFoundResponse({ type: ErrorNotFoundExeption })
  async remove(@Param('id', MongoIdValidationPipe) id: string) {
    await this.artworkService.remove(id);
    response.status(HttpStatus.ACCEPTED).json({
      message: 'Data Anda berhasil di hapus',
      StatusCode: HttpStatus.ACCEPTED,
    });
  }
}
