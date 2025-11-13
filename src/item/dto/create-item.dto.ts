import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export abstract class CreateItemDto {
    @Transform(({ value }) => value.trim())
    @IsString({message: "Título deve ser string"})
    @IsNotEmpty({message: "Título é obrigatório"})
    @ApiProperty({
        type: 'string',
        description: 'título do item',
        example: 'Novo Item',
        nullable: false
    })
    title: string;

    @IsNumber({ maxDecimalPlaces: 2 }, {message:"Preço deve ser um número"})
    @Type(() => Number)
    @ApiProperty({
        type: 'number',
        description: 'preço do item',
        example: 10.50,
        nullable: false
    })
    price: number;

    @Transform(({ value }) => value.trim().toUpperCase())
    @IsString({message: "Categoria deve ser string"})
    @IsNotEmpty({message: "Categoria é obrigatório"})
    @ApiProperty({
        type: 'string',
        description: 'categoria do item',
        example: 'Artigos Esportivos',
        nullable: false
    })
    category: string;

    @Transform(({ value }) => value.trim())
    @IsString({message: "Descrição deve ser string"})
    @ApiProperty({
        type: 'string',
        description: 'Descrição do item',
        example: 'Aqui está uma breve descrição do item, cor preto e etc',
        nullable: false
    })
    description: string;
}