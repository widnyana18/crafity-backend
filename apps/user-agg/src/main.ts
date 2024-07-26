import { NestFactory } from '@nestjs/core';
import { UserAggModule } from './user.module';

async function bootstrap() {
  const app = await NestFactory.create(UserAggModule);
  await app.listen(3000);
}
bootstrap();
