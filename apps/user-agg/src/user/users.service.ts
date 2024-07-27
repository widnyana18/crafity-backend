import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { ARTWORK_QUEUE } from '@app/shared';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @Inject(ARTWORK_QUEUE) private readonly userClientService: ClientProxy, // 1.
  ) {}

  async findById(id: string): Promise<any> {
    return await firstValueFrom(
      this.userClientService.send('find-user', { _id: id }),
    ); // 1
  }

  async update(userId: string, updateUserDto: UpdateUserDto): Promise<any> {
    try {
      return await firstValueFrom(
        this.userClientService.send('update-user', {
          userId,
          data: updateUserDto,
        }),
      ); // 1
    } catch (error) {
      throw new ForbiddenException('Gagal update artwork');
    }
  }

  async remove(id: string) {
    return await firstValueFrom(this.userClientService.send('delete-user', id)); // 1
  }
}
