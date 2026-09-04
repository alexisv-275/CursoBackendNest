import { Body, Controller, Get, Param, ParseIntPipe, Post, Patch, Delete, ParseUUIDPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
//Escucha solicitudes de los clientes y le emite una respuesta
@Controller('cars')
// @UsePipes(ValidationPipe)
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
    getCarById(@Param('id', ParseUUIDPipe) id: string){
        console.log({id: id});
        // throw new Error('AYUDAAAAA');
        
        return this.carsService.findById(id); 
        // return {
        //     car : this.cars[Number(id)],
        // }
    }

    //Crear un recurso y enviar info al backedn
    @Post()
    //Decorador para definir el body 
    createCar(@Body() createCArDto: CreateCarDto){
        return createCArDto;

    }
    @Patch(':id')
    //Decorador para definir el body 
    updateCar(
        @Param('id', ParseIntPipe) id:number,
        @Body() body: any){
        return body;
    }

    @Delete(':id')
    deleteCar(@Param('id', ParseIntPipe) id:number){
        return{
            method: 'delete', 
            id
        }
    }
        
}
