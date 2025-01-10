import { PickType } from '@nestjs/swagger';
import { User } from './users.schema';

export class SignupRequestDto extends PickType(User, [
  'email',
  'nickname',
] as const) {
  password: string;
}

export class SigninRequestDto extends PickType(User, ['email'] as const) {
  password: string;
}
