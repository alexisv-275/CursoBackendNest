import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';

@Module({
  controllers: [CarsController],
  //Todos los servicios son Providers, un provider no siempre es un servicio
  providers: [CarsService]
})
export class CarsModule {}
