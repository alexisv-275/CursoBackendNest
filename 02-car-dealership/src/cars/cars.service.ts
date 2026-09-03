import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CarsService {
    private cars = [
        {
            id: 1,
            brand: 'Toyota',
            model: 'Corolla',
        },
        {
            id: 2,
            brand: 'Honda',
            model: 'Civic',
        },
        {
            id: 3,
            brand: 'Ford',
            model: 'Mustang',
        },
    ];

    findAll() {
        return this.cars;
    }

    findById(id:number){
        const car = this.cars.find(car => car.id === id); 

        //Usando ExceptionFilters: NotFoundException
        if(!car)throw new NotFoundException(`Car with id: '${id}' was not found`);

        return car;
        // return this.cars[id];

    }


}
