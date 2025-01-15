import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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

  @ApiOperation({ summary: '프로필 이미지를 업로드 할 수 있습니다.' })
  @Post('upload/image')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return '파일 업로드하기';
  }

  @ApiOperation({ summary: '여러 개의 게시물을 업로드 할 수 있습니다.' })
  @Post('upload/posts')
  @UseInterceptors(FileInterceptor('files'))
  uploadPosts(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
    return '여러 개의 게시물 업로드';
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
}
