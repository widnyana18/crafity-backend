import { Module } from '@nestjs/common';
import { ArtworkController } from './artwork/artwork.controller';
import { ArtworkService } from './artwork/artwork.service';
import { RmqModule } from 'libs/shared/src/queue/rabbitmq/rmq.module';
import { ARTWORK_QUEUE, AUTH_QUEUE } from '@app/shared';
import { ConfigModule } from '@nestjs/config';
import configs from './config/index';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: configs,
      ignoreEnvFile: false,
      isGlobal: true,
      cache: true,
      envFilePath: ['./apps/artwork-per/.env'],
    }),
    RmqModule,
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
