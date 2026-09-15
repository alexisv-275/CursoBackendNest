import { BadRequestException, HttpCode, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { InjectConnection } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { log } from 'console';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class PokemonService {

  constructor(
    //Decorador para poder inyectar modelos en servicios de NestJS
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    
  ){}

  async create(createPokemonDto: CreatePokemonDto) {
    // Convierte el nombre a minúsculas antes de guardarlo en la base de datos.
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      // `pokemonModel` es el modelo de Mongoose inyectado con @InjectModel.
      // Su método `create` crea y guarda un documento; no es el `create` de este servicio.
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll(paginationDTO: PaginationDto) {
    
    const {limit=10, offset = 0}=  paginationDTO;

    return this.pokemonModel.find() 
      .limit(limit)
      .skip(offset)
      .sort({
        no:1
      })
      .select('-__v');
  }

  async findOne(term: string) {
    const normalizedTerm = term.trim().toLowerCase();
    const numericTerm = Number(normalizedTerm);
    let pokemon: Pokemon | null = null;

    // Busca por número si el término es numérico.
    if (!Number.isNaN(numericTerm)) {
      pokemon = await this.pokemonModel.findOne({ no: numericTerm });
    }

    // Si no se encontró, busca por el ID de MongoDB.
    if (!pokemon && isValidObjectId(normalizedTerm)) {
      pokemon = await this.pokemonModel.findById(normalizedTerm);
    }

    // Si no se encontró, busca por nombre.
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: normalizedTerm });
    }

    if (!pokemon) {
      throw new NotFoundException(`Pokemon with term "${term}" not found`);
    }

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    // Busca el Pokemon por número, ID de MongoDB o nombre.
    const pokemon = await this.findOne(term);

    // Convierte el nombre a minúsculas y elimina espacios innecesarios.
    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase().trim();
    }

    try {
      // Actualiza el Pokemon 
      await pokemon.updateOne(updatePokemonDto);
      
      //Devuelve la versión actualizada.
      return{
        ...pokemon.toJSON(), 
        ...updatePokemonDto
      }
    } catch (error) {
      this.handleExceptions(error);
  }
  }

  async remove(id: string) {
    // const pokemon = await this.findOne(id);
    // await pokemon.deleteOne();
    const {deletedCount} = await this.pokemonModel.deleteOne({_id: id});
    if(deletedCount === 0)
      throw new BadRequestException(`Pokemon with id "${id}" not found`)
    return;
    
  }
  
  async removeAll(){
    await this.pokemonModel.deleteMany();
    return;
  }

  async insertAll(pokemonToInsert: CreatePokemonDto[]) {
    await this.pokemonModel.insertMany(pokemonToInsert)
  }

  private handleExceptions(error:any){
    if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === 11000
      ) {
        const keyValue = 'keyValue' in error ? error.keyValue : {};
        throw new BadRequestException(
          `Pokemon exists in db ${JSON.stringify(keyValue)}`,
        );
      }
      console.log(error);
      throw new InternalServerErrorException(`Cant update Pokemon - Check server logs`);
    }

  }
