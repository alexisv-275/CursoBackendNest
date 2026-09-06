import {v4 as uuid} from 'uuid';
import { Brand } from '../../brands/entities/brand.entity';


export const BRANDS_SEED: Brand[] = [
    {
        id: uuid(),
        name: 'Toyota',
        createdAt: new Date().getTime(),
    },
    {
        id: uuid(),
        name: 'Toyota2',
        createdAt: new Date().getTime(),
    },
    {
        id: uuid(),
        name: 'Toyota3',
        createdAt: new Date().getTime(),
    }
]