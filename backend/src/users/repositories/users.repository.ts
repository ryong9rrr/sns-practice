import { Model } from 'mongoose';
import { HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users.schema';

export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async isExistUserByEmail({ email }: { email: string }) {
    const result = await this.userModel.exists({ email });
    return result;
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
    const result = await this.userModel.create({
      email,
      nickname,
      hashedPassword,
    });
    return result;
  }

  async findUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException('존재하지 않는 유저입니다.', 400);
    }
    return user;
  }

  async findUserById({ id }: { id: string }) {
    const user = await this.userModel.findById(id).select('-hashedPassword');
    return user ?? null;
  }

  async findByIdAndUpdateImage(id: string, fileName: string) {
    const user = await this.userModel.findById(id);
    user.imgUrl = `http://localhost:8000/media/${fileName}`; // main.ts에 "media"로 뚫어놨음.
    const newUser = await user.save();
    return newUser.readOnlyData;
  }
}
