import { OmitType } from '@nestjs/swagger';
import { User } from '../users.schema';

export class UserSignupRequestDto extends OmitType(User, ['imgUrl'] as const) {}
