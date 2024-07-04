import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateArtworkDto } from './dto/update-artwork.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Artwork, ArtworkDocument } from './schemas/artwork.schema';
import { Model } from 'mongoose';
import { CreateArtworkDto } from './dto/create-artwork.dto';

@Injectable()
export class ArtworkService {
  constructor(
    @InjectModel(Artwork.name)
    private readonly artworkModel: Model<ArtworkDocument>    
  ) {}

  async create(createArtworkDTO: CreateArtworkDto): Promise<Artwork> {
    try {
      return await this.artworkModel.create(createArtworkDTO);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(): Promise<Artwork[]> {
    return await this.artworkModel.find();
  }

  async findOne(id: string): Promise<Artwork> {
    return await this.artworkModel.findById(id);
  }

  async update(
    id: string,
    updateArtworkDto: UpdateArtworkDto,
  ): Promise<Artwork> {
    try {
      const updateUser = await this.artworkModel.findOneAndUpdate(
        {
          _id: id,
        },
        updateArtworkDto,
        {
          new: true,
        },
      );

      if (!updateUser) {
        throw new NotFoundException(`User dengan ID ${id} tidak di temukan`);
      }

      return updateUser;
    } catch (error) {
      throw new ForbiddenException('Gagal update artwork');
    }
  }

  async remove(id: string) {
    return this.artworkModel.deleteOne({ _id: id });
  }
}
