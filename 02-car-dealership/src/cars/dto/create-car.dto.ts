
//A diferencia de una interfaz, un DTO permite controlar el tipo de datos que se maneja 
//y llega a ser una clase

import { IsString, MinLength } from "class-validator";

export class CreateCarDto{
    @IsString()
    readonly brand:string;
    @IsString()
    // @MinLength(3)
    readonly model:string;
}