import { IsBoolean, IsNotEmpty, IsString, 
    MaxLength, MinLength } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(5, { message: "maior que 5 caracteres" })
    @MaxLength(30, { message: "não pode ser maior que 30 caracteres" })
    readonly name: string;
    
    @IsString()
    @IsNotEmpty()
    readonly description: string;
    
    @IsBoolean()
    completed?: boolean;
}