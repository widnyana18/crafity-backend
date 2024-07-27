import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { ARTWORK_QUEUE, AUTH_QUEUE, RmqModule } from '@app/shared';

@Module({
  imports: [
    RmqModule.register({
      name: ARTWORK_QUEUE,
    }),
    RmqModule.register({
      name: AUTH_QUEUE,
    }), 
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
