import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwtConfig from '../config/jwt.config';
import { PayloadType } from '../types/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
  ) {    
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.KEY,
    });
  }

  async validate(payload: PayloadType) {
    return {
      userId: payload.userId,
      email: payload.email,      
    };
  }
}