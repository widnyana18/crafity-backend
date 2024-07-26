import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateArtworkDto } from './dto/update-artwork.dto';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { ARTWORK_QUEUE } from '@app/shared';

@Injectable()
export class ArtworkService {
  constructor(
    @Inject(ARTWORK_QUEUE) private readonly clientArtwork: ClientProxy,
  ) {}

  async create(createArtworkDto: any) {
    const artwork = await firstValueFrom(
      this.clientArtwork.send('create-artwork', createArtworkDto),
    );
    return artwork;
  }

  async findAll(payload: any) {
    const getListArtwork = await firstValueFrom(
      this.clientArtwork.send('get-artwork-list', payload),
    );
    return getListArtwork;
  }

  async findOne(artworkId: string) {
    const getArtwork = await firstValueFrom(
      this.clientArtwork.send('get-artwork', artworkId),
    );
    if (!getArtwork) throw new NotFoundException('Data tidak ditemukan');
    return getArtwork;
  }

  async update(
    artworkId: string,
    updateArtworkDto: UpdateArtworkDto,
  ) {
    const updateArtwork = await firstValueFrom(
      this.clientArtwork.send('update-artwork', {
        data: updateArtworkDto,
        artworkId,
      }),
    );
    return updateArtwork;
  }

  async remove(artworkId: string) {
    const deleteArtwork = await firstValueFrom(
      this.clientArtwork.send('delete-artwork', artworkId),
    );

    if (deleteArtwork.deleted == 0)
      throw new NotFoundException('Data tidak ditemukan');
  }
}
