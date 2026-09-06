import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { v4 as uuid } from 'uuid';
import { NotFoundError } from 'rxjs';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [
    {
      id: uuid(),
      name: 'Toyota',
      createdAt: new Date().getTime()
    }
  ];

  create({name}: CreateBrandDto) {
      const brand ={
            id: uuid(),
            name: name.toLowerCase(),
            createdAt: new Date().getTime(),
        }
        this.brands.push(brand); 
        return brand; 
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find(brand => brand.id == id); 
    if(!brand)
      throw new NotFoundException(`Brand with id "${id}"not found`);

    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brandDB = this.findOne(id);

    // this.brands = this.brands.map(brand => {
    //   if
    // })

    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
