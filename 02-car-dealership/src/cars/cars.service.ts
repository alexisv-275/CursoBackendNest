import { Injectable, NotFoundException } from '@nestjs/common';
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

    findById(id:string) {
        const car = this.cars.find(car => car.id === id); 

        //Usando ExceptionFilters: NotFoundException
        if(!car)throw new NotFoundException(`Car with id: '${id}' was not found`);

        return car;
        // return this.cars[id];

    }

    // update(id:string, updateCarDto: UpdateCarDto){
    //     let  car = this.findById(id);
    //     car = {
    //         model: updateCarDto.model,
    //         brand

    //     }
    // }

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
}
