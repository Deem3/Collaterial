import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BigIntToStringInterceptor } from './interceptor/ BigIntToStringInterceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new BigIntToStringInterceptor());
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT);
}
bootstrap();
