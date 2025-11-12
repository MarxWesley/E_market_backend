import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { CreateItemDto } from "src/item/create-item.dto";

export class CreateProductDto extends CreateItemDto {
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