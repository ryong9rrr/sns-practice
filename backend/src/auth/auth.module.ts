import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule, PassportModule } from './jwt/jwt.module';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [forwardRef(() => UsersModule), JwtModule, PassportModule],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}

// TODO: module안에서 환경변수 쓰려면 ConfigModule.forRoot()를 imports에 넣어야함. 여기말고도 다른 모듈에도... (일단 걍 여따적어놈)
