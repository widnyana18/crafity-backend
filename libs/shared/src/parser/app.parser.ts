import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { RmqOptions } from '@nestjs/microservices';

import { RmqService } from '../queue/rabbitmq/rmq.service';
import { ARTWORK_QUEUE } from '../constants/rmq.constant';
import { NestExpressApplication } from '@nestjs/platform-express';

export class AppParser {
  static async persistence(module: any) {
    const app = await NestFactory.create(module);
    const configService = app.get(ConfigService);
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    );

    const env: string = configService.get<string>('app.appEnv');
    const appName: string = configService.get<string>('app.appName');
    const mongoUri: string = configService.get<string>('database.host');
    const dbName: string = configService.get<string>('database.name');
    const dbDebug: string = configService.get<string>('database.debug');

    const rmqService = app.get<RmqService>(RmqService);

    const rabbitMQ = app.connectMicroservice<RmqOptions>(
      rmqService.getOptions(ARTWORK_QUEUE, true),
    );
    await app.startAllMicroservices();

    console.log(`\n`);
    console.log('APPLICATION');
    console.log(
      '+----------------------------------------------------------------------------------------------------------------+',
    );

    console.log(` NAME\t\t\t: ${appName}`);
    console.log(` ENVIRONMENT\t\t: ${env}`);

    console.log(`\n`);
    console.log('DATABASE');
    console.log(
      '+----------------------------------------------------------------------------------------------------------------+',
    );
    console.log(` URL\t\t\t: ${mongoUri}`);
    console.log(` NAME\t\t\t: ${dbName}`);
    console.log(` DEBUG\t\t\t: ${dbDebug}`);
    console.log(`\n`);

    console.log('RABBIT MQ');
    console.log(
      '+----------------------------------------------------------------------------------------------------------------+',
    );
    console.log(` URL\t\t\t: ${rabbitMQ['server']['urls']}`);
    console.log(
      ` MESSAGE PATTERN\t: ${Array.from(
        rabbitMQ['server']['messageHandlers'].keys(),
      )}`,
    );
  }

  static async aggregation(module: any) {
    const app = await NestFactory.create<NestExpressApplication>(module);
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
}
