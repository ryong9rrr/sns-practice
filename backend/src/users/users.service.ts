import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserSignupRequestDto } from './dto/users.request.dto';
import { UsersRepository } from './users.repository';
import { hash } from './utils/hash';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async signup(body: UserSignupRequestDto) {
    const { email, password, nickname } = body;

    const isExistResult = await this.usersRepository.isExistUserByEmail({
      email,
    });
    if (isExistResult) {
      throw new UnauthorizedException('이미 존재하는 유저입니다.');
    }

    const hashedPassword = await hash(password);
    const newUser = await this.usersRepository.createUser({
      email,
      nickname,
      hashedPassword,
    });
    return newUser.readOnlyData;
  }
}
