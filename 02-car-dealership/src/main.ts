import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(  
    new ValidationPipe({ 
      //Solo deja la data que estoy esperando pero sigue recibiendo el mensaje
      whitelist: true, 
      //No permite recibir el mensaje si tiene data que no se espera
      forbidNonWhitelisted: true, 
    }) 
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
