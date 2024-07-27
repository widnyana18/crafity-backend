import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import { DatabaseModule, RmqModule } from '@app/shared';
import { UsersModule } from './user/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: config,
      ignoreEnvFile: false,
      isGlobal: true,
      cache: true,
      envFilePath: ['./apps/user-per/.env'],
    }),
    RmqModule,
    DatabaseModule,
    UsersModule,
  ],
})
export class AppModule {}
