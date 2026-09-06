import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import {v4 as uuid} from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
    private cars: Car[] = [
        {
            id: uuid(),
            brand: 'Toyota',
            model: 'Corolla',
        },
        {
            id: uuid(),
            brand: 'Honda',
            model: 'Civic',
        },
        {
            id: uuid(),
            brand: 'Ford',
            model: 'Mustang',
        },
    ];

    findAll() {
        return this.cars;
    }

    findOne(id:string) {
        const car = this.cars.find(car => car.id === id); 

        //Usando ExceptionFilters: NotFoundException
        if(!car)throw new NotFoundException(`Car with id: '${id}' was not found`);

        return car;
        // return this.cars[id];

    }

    update(id:string, updateCarDto: UpdateCarDto){
        // Busca el auto actual para conservar sus datos no enviados en el PATCH.
        let carDB = this.findOne(id);

        // Si el body trae un id, debe coincidir con el id de la URL.
        if(updateCarDto.id && updateCarDto.id !== id)
            throw new BadRequestException(`Car is not valid inside body`); 

        // Recorre todos los autos y crea una nueva lista.
        this.cars = this.cars.map(car => {
            if (car.id === id){
                // Combina el auto existente con los campos enviados en el PATCH.
                // Los campos no enviados, como model, se mantienen.
                carDB = {
                    ...carDB,
                    ...updateCarDto,
                    id,

                }
                // Reemplaza el auto antiguo por el auto actualizado.
                return carDB;
            }
            // Conserva sin cambios los demás autos.
            return car;
        })
        // Devuelve el auto actualizado.
        return carDB;
        
    }

    create(createCarDto : CreateCarDto) {
        const car ={
            id: uuid(),
            brand: createCarDto.brand,
            model: createCarDto.model
        }
        this.cars.push(car); 
        return car; 
    }

    // create({model, brand} : CreateCarDto) {
    //     const car ={
    //         id: uuid(),
    //         brand,
    //         model
    //     }
    //     this.cars.push(car); 
    //     return car; 
    // }

    delete(id:string){
        //Verificacion si el auto existe
        const car = this.findOne(id);
        this.cars  = this.cars.filter(car => car.id !== id);
    }
}
