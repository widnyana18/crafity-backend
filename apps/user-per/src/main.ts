import { NestFactory } from '@nestjs/core';
import { UserPerModule } from './user-per.module';

async function bootstrap() {
  const app = await NestFactory.create(UserPerModule);
  await app.listen(3000);
}
bootstrap();
