import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>, // 1.
  ) {}

  async create(payload: any): Promise<User> {
    const salt = await bcrypt.genSalt(); // 2.
    const hashedPassword = await bcrypt.hash(payload.password, salt); // 3.
    const createdUser = new this.userModel({
      ...payload,
      password: hashedPassword,
    });

    try {
      const savedUser = await createdUser.save();
      delete savedUser.password;
      return savedUser;
    } catch (error) {
      const duplicateKey = error.keyValue ? Object.keys(error.keyValue)[0] : '';
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `${duplicateKey} sudah digunakan`,
      });
    }
  }

  async findOne(payload: any): Promise<User> {
    const user = await this.userModel.findOne(payload);
    if (!user) {
      throw new UnauthorizedException('Could not find user');
    }
    return user;
  }

  async update(payload: any): Promise<User> {
    try {
      const updateUser = await this.userModel.findOneAndUpdate(
        {
          _id: payload.userId,
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

  async remove(id: string) {
    return this.userModel.deleteOne({ _id: id });
  }
}
