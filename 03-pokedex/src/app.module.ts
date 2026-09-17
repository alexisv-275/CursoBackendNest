import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { EnvConfiguration } from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      //Cargar el archivo que mapea las env como un objeto
      load: [EnvConfiguration]
    }),
    //Utilizado para servir archivos estáticos desde el directorio 'public' en la raíz del proyecto
    ServeStaticModule.forRoot({ 
      rootPath: join(__dirname,'..', 'public'), 
    }),
    MongooseModule.forRoot(process.env.MONGODB!),
    PokemonModule,
    CommonModule,
    SeedModule 
  ],
})
export class AppModule {}
