import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { MongoIdValidationPipe } from 'src/common/pipes/validator/mongoid.validator';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/:id')
  findById(
    @Param('id', MongoIdValidationPipe)
    id: string,
  ) {
    return this.usersService.findById(id);
  }

  @Patch('/:id')
  update(
    @Param('id', MongoIdValidationPipe) id: string,
    @Body() UpdateUserDto: UpdateUserDto,
  ) {
    try {
      return this.usersService.update(id, UpdateUserDto);
    } catch (error) {
      throw error.message;
    }
  }

  @Delete('/:id')
  remove(@Param('id', MongoIdValidationPipe) id: string) {
    try {
      return this.usersService.remove(id);
    } catch (error) {
      throw error.message;
    }
  }
}
