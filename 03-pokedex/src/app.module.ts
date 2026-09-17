import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { EnvConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      //Cargar el archivo que mapea las env como un objeto
      load: [EnvConfiguration],
      //Tiene prioridad para cargar valores por defecto (JoiSchema)
      validationSchema: JoiValidationSchema,
    }),
    //Utilizado para servir archivos estáticos desde el directorio 'public' en la raíz del proyecto
    ServeStaticModule.forRoot({ 
      rootPath: join(__dirname,'..', 'public'), 
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow<string>('mongodb'),
      }),
    }),
    PokemonModule,
    CommonModule,
    SeedModule 
  ],
})
export class AppModule {}
