import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  // swagger-auth
  app.use(
    ['/docs', '/docs-json'],
    expressBasicAuth({
      challenge: true,
      users: {
        admin: '123123', // id와 pw
      },
    }),
  );

  // swagger
  const config = new DocumentBuilder()
    .setTitle('sns-practice')
    .setDescription('sns API description')
    .setVersion('1.0')
    .addTag('sns')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  // cors
  app.enableCors({
    origin: 'http://localhost:5173', // true로 설정하면 모두 open(*과 같음.)
    credentials: false, // (아직 미확인이지만, 쿠키를 사용할 경우 프론트와 백엔드 둘 다 true로 해줘야할것같음.)
  });
  await app.listen(8000);
}
bootstrap();
