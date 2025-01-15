import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { SigninRequestDto, SignupRequestDto } from './users.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './users.schema';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { multerOptions } from 'src/common/utils/multer.options';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Get('my')
  @ApiOperation({ summary: '현재 접속한 유저를 반환합니다.' })
  @UseGuards(JwtAuthGuard)
  getCurrentUser(@CurrentUser() user: User) {
    return user.readOnlyData;
  }

  @Post('upload/image')
  @ApiOperation({ summary: '프로필 이미지를 업로드 할 수 있습니다.' })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('image', 10, multerOptions('users'))) // "image" 라는 key를 frontend에서 맞춰줘야한다, 파일 개수는 최대 10개로 제한, "dist/common/upload/users" 폴더에 저장.
  uploadImage(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @CurrentUser() user: User,
  ) {
    return this.usersService.uploadImage(user, files);
  }

  @Post('upload/posts')
  @ApiOperation({ summary: '여러 개의 게시물을 업로드 할 수 있습니다.' })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('files'))
  uploadPosts(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
    return '여러 개의 게시물 업로드';
  }

  @Post('signup')
  @ApiOperation({ summary: ' 회원가입' })
  @ApiResponse({
    status: 200,
    description: '유저 생성 성공',
  })
  @ApiResponse({
    status: 401,
    description: '이미 존재하는 유저입니다.',
  })
  async signup(@Body() body: SignupRequestDto) {
    const { email, password, nickname } = body;
    return await this.usersService.signup({ email, password, nickname });
  }

  @Post('signin')
  @ApiOperation({ summary: '로그인' })
  @ApiResponse({
    status: 200,
    description: '유저 생성 성공',
  })
  async signin(@Body() body: SigninRequestDto) {
    const { email, password } = body;
    return this.authService.jwtSignin({ email, password });
  }
}
