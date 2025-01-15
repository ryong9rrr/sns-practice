import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_PRIVATE_KEY } from './temp';
import { Payload } from './jwt.payload';
import { UsersRepository } from 'src/users/repositories/users.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersRepository: UsersRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_PRIVATE_KEY,
    });
  }

  async validate(payload: Payload) {
    const { sub } = payload;
    const user = await this.usersRepository.findUserById({ id: sub });
    if (user) {
      return user;
    }
    throw new UnauthorizedException('unauthorized');
  }
}
