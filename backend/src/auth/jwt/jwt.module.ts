import { JwtModule as _JwtModule } from '@nestjs/jwt';
import { JWT_PRIVATE_KEY } from './temp';
import { PassportModule as _PassportModule } from '@nestjs/passport';

export const JwtModule = _JwtModule.register({
  global: true,
  secret: JWT_PRIVATE_KEY,
  signOptions: { expiresIn: '1y' },
});

export const PassportModule = _PassportModule.register({
  defaultStrategy: 'jwt',
  session: false,
});
