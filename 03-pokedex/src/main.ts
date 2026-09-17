import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v2'); // Establece un prefijo global para todas las rutas de la API
  //Necesario para que los class validator funcionen ya que estos son los que interceptan la data
  app.useGlobalPipes(  
    new ValidationPipe({ 
      //Solo deja la data que estoy esperando pero sigue recibiendo el mensaje
      whitelist: true, 
      //No permite recibir el mensaje si tiene data que no se espera
      forbidNonWhitelisted: true, 
      transform:true, 
      transformOptions:{
        enableImplicitConversion:true,
      }
    }) 
  );
  await app.listen(process.env.PORT!);
}
bootstrap();
