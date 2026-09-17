import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { Mongoose } from 'mongoose';
// Conecta NestJS con MongoDB y permite registrar modelos de Mongoose.
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports:[
    ConfigModule,
    // Relaciona Pokemon con su esquema para acceder a la colección de Pokémon.
    MongooseModule.forFeature([
    {
      name: Pokemon.name,
      schema: PokemonSchema
    }
    ])
  ], 
  exports: [PokemonService]
})
export class PokemonModule {}
