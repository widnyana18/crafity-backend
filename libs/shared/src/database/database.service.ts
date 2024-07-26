import { Injectable } from '@nestjs/common';
import {
  MongooseOptionsFactory,
  MongooseModuleOptions,
} from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService implements MongooseOptionsFactory {
  private readonly host: string;
  private readonly database: string;

  constructor(private readonly configService: ConfigService) {
    this.host = this.configService.get<string>('database.host');
    this.database = this.configService.get<string>('database.name');
  }

  createMongooseOptions(): MongooseModuleOptions {
    const uri = `${this.host}/${this.database}`;

    const mongooseOptions: MongooseModuleOptions = {
      uri,
      serverSelectionTimeoutMS: 5000,
    };

    return mongooseOptions;
  }
}
