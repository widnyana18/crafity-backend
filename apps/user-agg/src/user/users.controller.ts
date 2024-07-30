import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
  Version,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  AccessTokenGuard,
  DeletingData,
  ErrorBadRequestExecption,
  ErrorNotFoundExeption,
  MongoIdValidationPipe,
} from '@app/shared';
import { response } from 'express';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { UserResSuccesCreate } from '../common/swagger/user.response';

UseGuards(AccessTokenGuard);
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Version('1')
  @ApiOperation({ summary: 'mendapatkan satu user' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'id yang di gunakan untuk paramester harus mongo id',
  })
  @ApiOkResponse({ type: UserResSuccesCreate })
  @ApiBadRequestResponse({ type: ErrorBadRequestExecption })
  @ApiNotFoundResponse({ type: ErrorNotFoundExeption })
  @Get('/:id')
  async findById(
    @Param('id', MongoIdValidationPipe)
    id: string,
  ) {
    return await this.usersService.findById(id);
  }

  @Version('1')
  @Patch('/:id')
  @ApiOperation({ summary: 'update satu user' })
  @ApiOkResponse({ type: UserResSuccesCreate })
  @ApiBadRequestResponse({ type: ErrorBadRequestExecption })
  @ApiNotFoundResponse({ type: ErrorNotFoundExeption })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'id yang di gunakan untuk paramester harus mongo id',
  })
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

  @Version('1')
  @ApiOperation({ summary: 'menghapus satu user' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'id yang di gunakan untuk paramester harus mongo id',
  })
  @ApiBadRequestResponse({ type: ErrorBadRequestExecption })
  @ApiOkResponse({ type: DeletingData })
  @ApiNotFoundResponse({ type: ErrorNotFoundExeption })
  @Delete('/:id')
  async remove(@Param('id', MongoIdValidationPipe) id: string) {
    await this.usersService.remove(id);

    response.status(HttpStatus.ACCEPTED).json({
      message: 'Berhasil menghapus user',
      StatusCode: HttpStatus.ACCEPTED,
    });
  }
}
