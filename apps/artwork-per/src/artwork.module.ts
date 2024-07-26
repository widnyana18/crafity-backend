import { Module } from '@nestjs/common';
import { ArtworkController } from './artwork/artwork.controller';
import { ArtworkService } from './artwork/artwork.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Artwork, ArtworkSchema } from './artwork/schemas/artwork.schema';
import { ConfigModule } from '@nestjs/config';
import configs from './config';
import { RmqModule } from '@app/shared/queue/rabbitmq/rmq.module';
import { DatabaseModule } from '@app/shared';

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
    DatabaseModule,
    ArtworkModule,
    MongooseModule.forFeature([
      {
        name: Artwork.name,
        schema: ArtworkSchema,
      },
    ]),
  ],
  controllers: [ArtworkController],
  providers: [ArtworkService],
})
export class ArtworkModule {}
