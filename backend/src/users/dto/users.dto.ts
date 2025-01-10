import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from '../users.schema';

export class ReadOnlyUserDto extends PickType(User, [
  'email',
  'nickname',
] as const) {
  @ApiProperty({
    example: 'kZLSJflxakj',
    description: 'id',
  })
  id: string;
}

export class SigninResponseDto {
  accessToken: string;
}
