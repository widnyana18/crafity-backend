import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @MessagePattern('create-user')
  async create(@Payload() payload: any): Promise<any> {
    return this.usersService.create(payload);
  }

  @MessagePattern('find-user')
  async getOne(@Payload() payload: string): Promise<any> {
    return this.usersService.findOne(payload);
  }

  @MessagePattern('update-user')
  async update(@Payload() payload: any) {
    return this.usersService.update(payload);

  }
  @MessagePattern('delete-user')
  async delete(@Payload() applicationId: string) {
    return this.usersService.remove(applicationId);
  }
}
