import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import { CreateItemDto } from "src/item/dto/create-item.dto";

export class CreateProductDto extends CreateItemDto {
    @Transform(({ value }) => value.trim().toUpperCase())
    @IsString({message: "Condição deve ser string"})
    @IsNotEmpty({message: "Condição é obrigatória"})
    @ApiProperty({
        type: 'string',
        description: 'condição do prouto',
        example: 'Novo',
        nullable: false
    })
    condition: string;
}