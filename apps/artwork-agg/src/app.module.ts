import { Module } from '@nestjs/common';
import { RmqModule } from 'libs/shared/src/queue/rabbitmq/rmq.module';
import { ConfigModule } from '@nestjs/config';
import configs from './config/index';
import { ArtworkModule } from './artwork/artwork.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: configs,
      ignoreEnvFile: false,
      isGlobal: true,
      cache: true,
      envFilePath: ['./apps/artwork-agg/.env'],
    }),
    RmqModule,
    ArtworkModule,
  ],
})
export class AppModule {}
