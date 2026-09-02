import type { Move, PokeapiResponse } from '../interfaces/pokeapi-response.interface';
import {type Httpdapter, PokeApiAdapter, PokeApiFetchAdapter } from '../api/pokeApi.adapter';

export class Pokemon {

    public readonly id: number;
    public name: string; 
    private readonly http:Httpdapter;
    
    constructor(id:number, name:string, http:Httpdapter){
        this.id = id; 
        this.name = name; 
        //Inyectar dependencia
        this.http = http;
    }
    
    get imageUrl(): string {
        return `https://pokemon.com/${ this.id }.jpg`;
    }
    scream() {
        console.log(`${ this.name.toUpperCase() }!!!`);
    }

    speak() {
        console.log(`${ this.name }, ${ this.name }`);
    }

    async getMoves(): Promise<Move[]> {
        const data = await this.http.get<PokeapiResponse>('https://pokeapi.co/api/v2/pokemon/4'); 

        // const { data } = await axios.get<PokeapiResponse>('https://pokeapi.co/api/v2/pokemon/4');
        console.log( data.moves[0].move.name );
        
        return data.moves;
    }

}


const pokeApiXios = new PokeApiAdapter();
const pokeApiFetch = new PokeApiFetchAdapter();

export const charmander = new Pokemon( 4, 'Charmander', pokeApiXios);

charmander.getMoves();