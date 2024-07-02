import { Module } from '@nestjs/common';
import { ArtworkController } from './artwork.controller';
import { ArtworkService } from './artwork.service';
import { IdGeneratorService } from 'src/common/utils/id.generator.service';

@Module({
  controllers: [ArtworkController],
  providers: [ArtworkService, IdGeneratorService],
})
export class ArtworkModule {}
