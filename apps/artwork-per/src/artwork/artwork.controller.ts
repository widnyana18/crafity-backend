import { Controller } from '@nestjs/common';
import { ArtworkService } from './artwork.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('artwork-per')
export class ArtworkController {
  constructor(private artworkService: ArtworkService) {}

  @MessagePattern('create-artwork')
  async create(@Payload() payload: any): Promise<any> {
    return this.artworkService.create(payload);
  }

  @MessagePattern('get-artwork-list')
  async getArtworkList(@Payload() payload: any) {
    return this.artworkService.findAll(payload);
  }

  @MessagePattern('get-artwork')
  async getOne(@Payload() payload: string): Promise<any> {
    return this.artworkService.get(payload);
  }

  @MessagePattern('delete-artwork')
  async delete(@Payload() artworkId: string) {
    return this.artworkService.delete(artworkId);
  }

  @MessagePattern('update-artwork')
  async update(@Payload() payload: any) {
    return this.artworkService.update(payload);
  }
}
