import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from '../pokemon/pokemon.service';

@Injectable()
export class SeedService {

  constructor(private readonly pokeService:PokemonService){};

  private readonly axios: AxiosInstance = axios;
  
  async executeSeed() {
    
    await this.pokeService.removeAll();

    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
    
    //Cómo insertar múltiples lotes en vez de esperar que cada uno termine
    // const insertPromisesArray: ReturnType<PokemonService['create']>[] = [];
    const pokemonToInsert :{name:string, no:number}[] = [];


    
    //forEach inicia cada llamada sin esperar la anterior. Luego Promise.all espera a que todas terminen.
    data.results.forEach(({name,url}) => {
      const segments = url.split('/');

      const no:number = +segments[segments.length - 2];
      pokemonToInsert.push({name, no}); 

      // insertPromisesArray.push(
      //   this.pokeService.create({name, no})
      // )


    });

    // await Promise.all(insertPromisesArray);
    await this.pokeService.insertAll(pokemonToInsert);
    
    return 'Seed executed';
  }
}
