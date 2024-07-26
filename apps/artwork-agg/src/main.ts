import { NestFactory } from '@nestjs/core';
import { ArtworkModule } from './artwork.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(ArtworkModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  
  app.enableVersioning({
    type: VersioningType.URI,
  });
  const configService = app.get(ConfigService);
  const env: string = configService.get<string>('app.appEnv');
  const appName: string = configService.get<string>('app.appName');

  await app.listen(
    configService.get('app.port.api'),
    configService.get('app.host'),
  );
  const appUrl = await app.getUrl();
  console.log(`\n`);
  console.log(`APP NAME\t: ${appName}`);
  console.log(`ENVIRONMENT\t: ${env}`);
  console.log(`RUNNING ON \t: ${appUrl}`);  
}
bootstrap();
