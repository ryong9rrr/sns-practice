import { OmitType, PickType } from '@nestjs/swagger';
import { User } from '../users.schema';

export class UserSignupRequestDto extends OmitType(User, [
  'hashedPassword',
  'imgUrl',
] as const) {
  password: string;
}

export class SigninRequestDto extends PickType(User, ['email'] as const) {
  password: string;
}
