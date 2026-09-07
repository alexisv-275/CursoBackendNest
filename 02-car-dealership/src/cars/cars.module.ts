import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';

@Module({
  controllers: [CarsController],
  //Todos los servicios son Providers, un provider no siempre es un servicio
  providers: [CarsService],
  //importante exponter el servicio para que pueda ser usado en otros modulos
  exports: [CarsService]
})
export class CarsModule {}
