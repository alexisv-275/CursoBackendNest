// import { PartialType } from '@nestjs/mapped-types';
// import { CreateBrandDto } from './create-brand.dto';

import { MinLength, IsString } from "class-validator";

//Mapped types permite crear un DTO a partir de otro DTO, pero todos sus campos son opcionales. Esto es útil para operaciones de actualización donde no se requiere que todos los campos estén presentes.
//Se usa cuando tiene más de una propiedad modificable
// export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
export class UpdateBrandDto{
    @IsString()
    @MinLength(1)
    name: string;

}