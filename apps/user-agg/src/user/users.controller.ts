import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AccessTokenGuard, MongoIdValidationPipe } from '@app/shared';
import { response } from 'express';

UseGuards(AccessTokenGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/:id')
  async findById(
    @Param('id', MongoIdValidationPipe)
    id: string,
  ) {
    return await this.usersService.findById(id);
  }

  @Patch('/:id')
  async update(
    @Param('id', MongoIdValidationPipe) id: string,
    @Body() UpdateUserDto: UpdateUserDto,
  ) {    
      const updatedUser = await this.usersService.update(id, UpdateUserDto);  
      response.status(HttpStatus.ACCEPTED).json({
        message: 'Berhasil memperbarui user',      
        data: updatedUser,
        StatusCode: HttpStatus.ACCEPTED,
      });
  }

  @Delete('/:id')
  async remove(@Param('id', MongoIdValidationPipe) id: string) {
     await this.usersService.remove(id);

     response.status(HttpStatus.ACCEPTED).json({
      message: 'Berhasil menghapus user',      
      StatusCode: HttpStatus.ACCEPTED,
    });
  }
}
