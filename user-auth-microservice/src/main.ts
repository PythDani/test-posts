import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   app.enableCors({
    origin: '*', 
    credentials: true,               
  });
  app.useGlobalPipes(new ValidationPipe({
        transform: true, 
        whitelist: true, 
        forbidNonWhitelisted: true, 
        stopAtFirstError: false,
      }));
  await app.listen(3000);
  console.log('Auth Service running at http://localhost:3000');
}
bootstrap();
