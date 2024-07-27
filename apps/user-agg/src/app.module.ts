import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import { UsersModule } from './user/users.module';
import { RmqModule } from '@app/shared';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: config,
      isGlobal: true,
      cache: true,
      ignoreEnvFile: false,
      envFilePath: ['./apps/user-agg/.env'],
    }),
    RmqModule,
    UsersModule,    
  ],  
})
export class AppModule {}
