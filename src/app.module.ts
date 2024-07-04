/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtworkModule } from './artwork/artwork.module';
import { ArtworkController } from './artwork/artwork.controller';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import configs from './common/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [
    ArtworkModule,
    ConfigModule.forRoot({
      load: configs,
      ignoreEnvFile: false,
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
    }),   
    MongooseModule.forRootAsync({
      inject: [DatabaseService],
      imports: [DatabaseModule],
      useFactory: (databaseService: DatabaseService) =>
        databaseService.createMongooseOptions(),
    }),      
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(ArtworkController);
  }
}
