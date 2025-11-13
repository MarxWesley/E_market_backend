import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateFavoriteDto {
    @Transform(({ value }) => Number(value))
    @IsNumber({}, { message: "O ID do usuário deve ser um número válido" })
    @IsNotEmpty({ message: "O ID do produto é obrigatório" })
    @ApiProperty({
        type: 'string',
        description: 'Id do item a ser favoritado',
        example: 1,
        nullable: false,
    })
    readonly itemId: number;
}
