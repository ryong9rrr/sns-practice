import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { SigninRequestDto, SignupRequestDto } from './users.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { User } from './users.schema';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '현재 접속한 유저를 반환합니다.' })
  @UseGuards(JwtAuthGuard)
  @Get('my')
  getCurrentUser(@CurrentUser() user: User) {
    return user.readOnlyData;
  }

  @ApiOperation({ summary: ' 회원가입' })
  @ApiResponse({
    status: 200,
    description: '유저 생성 성공',
  })
  @ApiResponse({
    status: 401,
    description: '이미 존재하는 유저입니다.',
  })
  @Post('signup')
  async signup(@Body() body: SignupRequestDto) {
    const { email, password, nickname } = body;
    return await this.usersService.signup({ email, password, nickname });
  }

  @ApiOperation({ summary: '로그인' })
  @ApiResponse({
    status: 200,
    description: '유저 생성 성공',
  })
  @Post('signin')
  async signin(@Body() body: SigninRequestDto) {
    const { email, password } = body;
    return this.authService.jwtSignin({ email, password });
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
