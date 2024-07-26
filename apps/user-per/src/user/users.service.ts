import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { LoginDTO } from 'src/authentication/dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>, // 1.
  ) {}

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    const salt = await bcrypt.genSalt(); // 2.
    const hashedPassword = await bcrypt.hash(createUserDTO.password, salt); // 3.
    const createdUser = new this.userModel({
      ...createUserDTO,
      password: hashedPassword,
    });

    try {
      const savedUser = await createdUser.save();
      delete savedUser.password;
      console.log('FINAL SIGNUP DATA :' + savedUser);
      return savedUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(data: LoginDTO): Promise<User> {
    try {
      const user = await this.userModel.findOne({ email: data.email });
      if (!user) {
        throw new UnauthorizedException('Could not find user');
      }
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById({ id: id });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const updateUser = await this.userModel.findOneAndUpdate(
        {
          _id: id,
        },
        updateUserDto,
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
    return this.userModel.deleteOne({ _id: id });
  }
}
