import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
//Escucha solicitudes de los clientes y le emite una respuesta
@Controller('cars')
export class CarsController {
    
    constructor(private readonly carsService: CarsService) {}

    @Get()
    getAllCars() {
        return this.carsService.findAll();
    }

    //Get indica que ese método atenderá solicitudes GET con una ruta como GET /cars/1
    //Registra esta función como manejadora de esta ruta
    
    @Get(':id')
    //@Param('id') extrae el valor id de la URL y lo entrega como argumento al método
    //ParseIntPipe permite manejar el error cuando no envío un número
    getCarById(@Param('id', ParseIntPipe) id: number){
        console.log({id: id});
        // throw new Error('AYUDAAAAA');
        
        return this.carsService.findById(id); 
        // return {
        //     car : this.cars[Number(id)],
        // }
    }
        
}
