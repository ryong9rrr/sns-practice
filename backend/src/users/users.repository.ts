import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';
import { Model } from 'mongoose';
import { HttpException } from '@nestjs/common';

export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async isExistUserByEmail({ email }: { email: string }) {
    try {
      const result = await this.userModel.exists({ email });
      return result;
    } catch (e) {
      throw new HttpException('db error', 400);
    }
  }

  async createUser({
    email,
    nickname,
    hashedPassword,
  }: {
    email: string;
    nickname: string;
    hashedPassword: string;
  }) {
    return await this.userModel.create({
      email,
      nickname,
      password: hashedPassword,
    });
  }
}
