import { Module } from '@nestjs/common';
import { ArtworkController } from './artwork.controller';
import { ArtworkService } from './artwork.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Artwork, ArtworkSchema } from './schemas/artwork.schema';

@Module({
  imports: [
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
