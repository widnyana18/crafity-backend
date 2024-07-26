import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Artwork, ArtworkDocument } from './schemas/artwork.schema';
import { Model } from 'mongoose';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ArtworkService {
  constructor(
    @InjectModel(Artwork.name)
    private readonly artworkModel: Model<ArtworkDocument>,
  ) {}

  async create(payload: any): Promise<Artwork> {
    try {
      return await this.artworkModel.create(payload);
    } catch (error) {
      const duplicateKey = error.keyValue ? Object.keys(error.keyValue)[0] : '';
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `${duplicateKey} sudah digunakan`,
      });
    }
  }

  async findAll(queryString: any): Promise<Artwork[]> {
    try {
      return await this.artworkModel.find();
    } catch (error) {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Silahkan cek query anda`,
      });
    }
  }

  async get(payload: string): Promise<Artwork> {
    return await this.artworkModel.findById(payload);
  }

  async update(payload: any): Promise<Artwork> {
    try {
      const updateUser = await this.artworkModel.findOneAndUpdate(
        {
          _id: payload.artworkId,
        },
        payload.data,
        {
          new: true,
        },
      );

      if (!updateUser) {
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: `user dengan ID ${payload.userId} tidak di temukan`,
        });
      }

      return updateUser;
    } catch (error) {
      const duplicateKey = error.keyValue ? Object.keys(error.keyValue)[0] : '';
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `${duplicateKey} sudah digunakan`,
      });
    }
  }

  async delete(payload: string) {
    return this.artworkModel.deleteOne({ _id: payload });
  }
}
