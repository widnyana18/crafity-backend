import { NestFactory } from '@nestjs/core';
import { Authentication/authAggModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(Authentication/authAggModule);
  await app.listen(3000);
}
bootstrap();
