import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import { AuthModule } from './authentication/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: config,
      isGlobal: true,
      cache: true,
      ignoreEnvFile: false,
      envFilePath: ['./apps/auth-agg/.env'],
    }),
    AuthModule,    
  ],  
})
export class AppModule {}
