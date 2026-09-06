import { Car } from "../../cars/interfaces/car.interface";
import {v4 as uuid} from 'uuid';


export const CARS_SEED: Car[] = [
    {
        id: uuid(),
        brand: 'Toyota',
        model: 'Corolla',
    },
    {
        id: uuid(),
        brand: 'Toyota2',
        model: 'Corolla2',
    },
    {
        id: uuid(),
        brand: 'Toyota2',
        model: 'Corolla2',
    }
]