import { Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getCurrentUser() {
    return '현재 접속한 유저';
  }

  @Post('signup')
  async signup() {
    return '회원가입';
  }

  @Post('signin')
  async signin() {
    return '로그인';
  }

  @Post('signout')
  async signout() {
    return '로그아웃';
  }

  @Post('uploadfile')
  uploadfile() {
    return '파일 업로드하기';
  }
}
