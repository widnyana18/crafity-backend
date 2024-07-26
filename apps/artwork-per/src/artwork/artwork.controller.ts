import { Controller } from '@nestjs/common';
import { ArtworkService } from './artwork.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('artwork-per')
export class ArtworkController {
  constructor(private artworkService: ArtworkService) {}

  @MessagePattern('create-application')
  async create(@Payload() payload: any): Promise<any> {
    return this.artworkService.create(payload);
  }

  @MessagePattern('get-application-list')
  async getApplicationList(@Payload() payload: any) {
    return this.artworkService.findAll(payload);
  }

  @MessagePattern('get-application')
  async getOne(@Payload() payload: string): Promise<any> {
    return this.artworkService.get(payload);
  }

  @MessagePattern('delete-application')
  async delete(@Payload() applicationId: string) {
    return this.artworkService.delete(applicationId);
  }

  @MessagePattern('update-application')
  async update(@Payload() payload: any) {
    return this.artworkService.update(payload);
  }
}
