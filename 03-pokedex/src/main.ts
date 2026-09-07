import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v2'); // Establece un prefijo global para todas las rutas de la API
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
