import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDTO } from '../../../../auth-agg/src/authentication/dto/create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDTO) {}
