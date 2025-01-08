import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserSignupRequestDto } from './dto/users.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyUserDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: '현재 접속한 유저를 반환합니다.' })
  @Get()
  getCurrentUser() {
    return '현재 접속한 유저';
  }

  @ApiOperation({ summary: ' 회원가입' })
  @ApiResponse({
    status: 200,
    description: '유저 생성 성공',
    type: ReadOnlyUserDto,
  })
  @ApiResponse({
    status: 401,
    description: '이미 존재하는 유저입니다.',
    type: null,
  })
  @Post('signup')
  async signup(@Body() body: UserSignupRequestDto): Promise<ReadOnlyUserDto> {
    console.log(body);

    return await this.usersService.signup(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('signin')
  async signin() {
    return '로그인';
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('signout')
  async signout() {
    return '로그아웃';
  }

  @ApiOperation({ summary: '파일을 업로드 할 수 있습니다.' })
  @Post('uploadfile')
  uploadfile() {
    return '파일 업로드하기';
  }
}
