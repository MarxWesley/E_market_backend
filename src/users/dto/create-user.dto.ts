import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsEmpty, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @Transform(({ value }) => value.toUpperCase().trim())
    @IsString({ message: 'O nome deve ser uma string' })
    @IsNotEmpty({ message: 'O nome é obrigatório' })
    @MaxLength(255)
    @ApiProperty({
        type: 'string',
        description: 'nome do usuário',
        example: 'Wesley Teste',
        nullable: false
    })
    readonly name: string;

    @Transform(({ value }) => value.toLowerCase().trim())
    @IsEmail()
    @IsNotEmpty({ message: 'O email é obrigatório' })
    @ApiProperty({
        type: 'string',
        description: 'email do usuário',
        example: 'teste@teste.com',
        nullable: false
    })
    readonly email: string;

    @Transform(({ value }) => value.toLowerCase().trim())
    @IsNotEmpty({ message: 'O CPF é obrigatório' })
    @ApiProperty({
        type: 'string',
        description: 'CPF do usuário',
        example: '999.999.999-11',
        nullable: false
    })
    @MinLength(11)
    readonly cpf: string;

    @IsNotEmpty({ message: "A senha é obrigatória" })
    @MinLength(6)
    @MaxLength(255)
    @ApiProperty({
        type: 'string',
        description: 'senha do usuário',
        example: '123456W',
        nullable: false
    })
    readonly password: string;
}