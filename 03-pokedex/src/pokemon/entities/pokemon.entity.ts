import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

//Permite definir que es un esquema de base de datos
@Schema()
export class Pokemon extends Document{
    //Definición de propiedades para que vayan así a la bd
    @Prop({
        unique:true, 
        index: true
    })
    name: string;
    @Prop({
        unique:true, 
        index: true
    })
    no: number;
}

//Convierte la clase Pokemon en un esquema que MongoDB puede entender
export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
