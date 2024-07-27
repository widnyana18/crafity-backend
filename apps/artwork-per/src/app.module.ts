import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import { ArtworkModule } from './artwork/artwork.module';
import { DatabaseModule, RmqModule } from '@app/shared';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: config,
      ignoreEnvFile: false,
      isGlobal: true,
      cache: true,
      envFilePath: ['./apps/artwork-per/.env'],
    }),
    RmqModule,
    DatabaseModule,
    ArtworkModule,
  ],
})
export class AppModule {}
