import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export abstract class CreateItemDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Type(() => Number)
    price: number;

    @IsString()
    @IsNotEmpty()
    category: string;

    @IsBoolean()
    @Type(() => Boolean)
    active: boolean;

    @IsNumber()
    @Type(() => Number)
    userId: number; // usamos o id do usuário no DTO, não a entidade inteira
}