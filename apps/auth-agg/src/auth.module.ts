import { Module } from '@nestjs/common';
import { AuthService } from './authentication/auth.service';
import { AuthController } from './authentication/auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from './auth.constants';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: authConstants.secret,
      signOptions: {
        expiresIn: '1d',
      },
    }),    
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}