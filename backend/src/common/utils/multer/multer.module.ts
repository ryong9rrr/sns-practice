import { MulterModule as _MulterModule } from '@nestjs/platform-express';

export const MulterModule = _MulterModule.register({ dest: './uploads' });
