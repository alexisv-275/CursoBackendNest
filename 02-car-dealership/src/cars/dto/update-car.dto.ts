import { IsOptional, IsString, IsUUID } from "class-validator";

//llega a ser una clase
export class UpdateCarDto{
    @IsString()
    @IsUUID()
    @IsOptional()
    readonly id?:string; 
    
    @IsString()
    @IsOptional()
    readonly brand?:string;
    
    @IsString()
    @IsOptional()
    readonly model?:string;
}