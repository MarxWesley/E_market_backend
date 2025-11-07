import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { CreateItemDto } from "src/item/create-item.dto";

export class CreateProductDto extends CreateItemDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: 'string',
        description: 'condição do produto',
        example: 'Novo',
        nullable: false
    })
    condition: string;
}