import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Artwork } from './entity/artwork.entity';
import { IdGeneratorService } from 'src/common/utils/id.generator.service';
import { UpdateArtworkDto } from './dto/update-artwork.dto';

@Injectable()
export class ArtworkService {
  constructor(private readonly idGeneratorService: IdGeneratorService) {}
  private artwork: Artwork[] = [];

  create(createArtworkDTO: any) {
    const id = this.idGeneratorService.getNextId();
    const artworkEntity = {
      id: id,
      art: createArtworkDTO.art,
      artist: createArtworkDTO.artist,
      releasedDate: new Date(Date.now()),
      price: createArtworkDTO.price,
    };
    return this.artwork.push(artworkEntity);
  }

  findAll() {
    return this.artwork;
  }

  findOne(id: string) {
    const artwork = this.artwork.find((artwork) => artwork.id === +id);
    if (!artwork) {
      //   throw new HttpException(`artwork #${id} not found`, HttpStatus.NOT_FOUND);
      throw new NotFoundException(`artwork #${id} not found`);
    }
    return artwork;
  }

  update(id: string, updateArtworkDto: UpdateArtworkDto) {
    try {
      this.artwork = this.artwork.map((artwork) => {
        if (artwork.id === +id) {
          const updatedArtwork = {
            ...artwork,
            ...updateArtworkDto,
          };
          return updatedArtwork;
        } else {
          throw new NotFoundException(`artwork #${id} not found`);
        }
      });
      return 'Updated successfully';
    } catch (error) {
      throw new ForbiddenException('Gagal update artwork');
    }
  }

  remove(id: string) {
    const artworkIndex = this.artwork.findIndex((item) => item.id === +id);

    if (artworkIndex >= 0) {
      this.artwork.splice(artworkIndex, 1);
      return 'Deleted successfully';
    } else {
      throw new NotFoundException(`artwork #${id} not found`);
    }
  }
}
