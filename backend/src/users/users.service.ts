import { InjectModel } from '@nestjs/mongoose';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { UserRequestDto } from './dto/users.request.dto';
import { User } from './users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async signup(body: UserRequestDto) {
    const { email, password, nickname } = body;

    const isExist = await this.userModel.exists({ email });
    if (isExist) {
      throw new UnauthorizedException('이미 존재하는 유저입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userModel.create({
      email,
      nickname,
      password: hashedPassword,
    });
    return newUser;
  }
}
