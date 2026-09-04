import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import {v4 as uuid} from 'uuid';

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


}
