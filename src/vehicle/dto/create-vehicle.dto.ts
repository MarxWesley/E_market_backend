import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CreateItemDto } from "src/item/create-item.dto";

export class CreateVehicleDto extends CreateItemDto{
    @IsString({message: "Tipo deve ser string"})
    @IsNotEmpty({message: "Tipo é obrigatório"})
    @ApiProperty({
        type: 'string',
        description: 'tipo do veículo',
        example: 'Carro',
        nullable: false
    })
    type: string;

    @IsNotEmpty({message: "Ano é obrigatório"})
    @IsNumber({}, {message: "Ano deve ser número"})
    @ApiProperty({
        type: 'number',
        description: 'ano do veículo',
        example: 2023,
        nullable: false
    })
    year: number;

    @IsString({message: "Marca deve ser string"})
    @IsNotEmpty({message: "Marca é obrigatória"})
    @ApiProperty({
        type: 'string',
        description: 'marca do veículo',
        example: 'Toyota',
        nullable: false
    })
    brand: string;

    @IsString({message: "Modelo deve ser string"})
    @IsNotEmpty({message: "Modelo é obrigatório"})
    @ApiProperty({
        type: 'string',
        description: 'modelo do veículo',
        example: 'Corolla',
        nullable: false
    })
    model: string;

    @IsNotEmpty({message: "Quilometragem é obrigatória"})
    @IsNumber({}, {message: "Quilometragem deve ser número"})
    @ApiProperty({
        type: 'number',
        description: 'quilometragem do veículo',
        example: 10000,
        nullable: false
    })
    mileage: number;

    @IsString({message: "Tipo de combustível deve ser string"})
    @ApiProperty({
        type: 'string',
        description: 'tipo de combustível do veículo',
        example: 'Gasolina',
        nullable: true
    })
    fuelType?: string;

    @IsString({message: "Tipo de transmissão deve ser string"})
    @ApiProperty({
        type: 'string',
        description: 'tipo de transmissão do veículo',
        example: 'Manual',
        nullable: true
    })
    transmission?: string;
}