import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from '../strategy/jwt.strategy';
import jwtConfig from '../config/jwt.config';
import { RmqModule, USER_QUEUE } from '@app/shared';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    RmqModule.register({ name: USER_QUEUE }),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
