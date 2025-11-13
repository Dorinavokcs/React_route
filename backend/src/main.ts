import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // Minden request-et ebbe a globális csőbe vezetek:
  // A validálás egy objektumban történik new ValidationPipe():
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,    // Elutasítjuk a többlet mezőket
    forbidNonWhitelisted: true,   // Megfelelő státuszkódot küldünk vissza
    transform: true, // a bejövő adatok átalakítása dto-objektummá
    transformOptions: {enableImplicitConversion: true},  // Engedjük az inplicit konverziót
  }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
