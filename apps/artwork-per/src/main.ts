import { NestFactory } from '@nestjs/core';
import { ArtworkModule } from './artwork.module';
import { ARTWORK_QUEUE, RmqService, USER_QUEUE } from '@app/shared';
import { RmqOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(ArtworkModule);
  const rmqService = app.get<RmqService>(RmqService);

  app.connectMicroservice<RmqOptions>(
    rmqService.getOptions(ARTWORK_QUEUE, true),
  );
  await app.startAllMicroservices();
}
bootstrap();
