import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorInterceptor } from './interceptors/error.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const validation = new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  });

  app.useGlobalPipes(validation);
  app.useGlobalInterceptors(new ErrorInterceptor());

  await app.listen(process.env.PORT || 3333);
}
bootstrap();
