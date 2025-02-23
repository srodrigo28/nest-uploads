import { Type } from "class-transformer";
import { IsOptional, Max, Min } from "class-validator";

export class PaginationDTO{
    
    @Min(0, {message: "valor tem que ser maior que 0 (Zero)"} )
    @Max(50, {message: "valor tem que ser menor que 51 "})
    @IsOptional()
    @Type( () => Number)
    limit: number;

    @Min(0, {message: "valor tem que ser maior que 0 (Zero)"} )
    @Max(50, {message: "valor tem que ser menor que 51 "})
    @IsOptional()
    @Type( () => Number)
    offset: number;
}