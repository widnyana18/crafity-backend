import { Module } from '@nestjs/common';
import { RmqModule } from 'libs/shared/src/queue/rabbitmq/rmq.module';
import { ARTWORK_QUEUE, AUTH_QUEUE } from '@app/shared';
import { ArtworkController } from './artwork.controller';
import { ArtworkService } from './artwork.service';


@Module({
  imports: [
    RmqModule.register({
      name: ARTWORK_QUEUE,
    }),
    RmqModule.register({
      name: AUTH_QUEUE,
    }),    
  ],  
  controllers: [ArtworkController],
  providers: [ArtworkService],
})
export class ArtworkModule {}
