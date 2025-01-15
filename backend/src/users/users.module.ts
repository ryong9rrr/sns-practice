import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from './users.schema';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { UsersRepository } from './repositories/users.repository';
import { AuthModule } from 'src/auth/auth.module';
import { MulterModule } from 'src/static/multer';

@Module({
  imports: [MulterModule, MongooseModule, forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
