import { Injectable } from '@nestjs/common';
import { CARS_SEED } from './data/cars.seed';
import { CarsService } from '../cars/cars.service';
import { BRANDS_SEED } from './data/brands.seed';
import { BrandsService } from '../brands/brands.service';

// Gracias a él, NestJS puede crear instancias de la clase e inyectarle dependencias, como CarsService, mediante el constructor.
@Injectable()
export class SeedService {
  constructor(private readonly carsService: CarsService, private readonly brandsService: BrandsService ) {}

  populateDB(){
    this.carsService.fillCarsWithSeedData(CARS_SEED);
    this.brandsService.fillBrandsWithSeedData(BRANDS_SEED);
    return 'SEED EXECUTED SUCCESFULLY';
  }
}
