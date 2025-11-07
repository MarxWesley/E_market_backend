import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateAuthDto {
    @Transform(({ value }) => value.toLowerCase().trim())
    @IsString({ message: "campo deve ser string" })
    @IsEmail()
    @IsNotEmpty({ message: "campo email é obrigatório" })
    @ApiProperty({
        type: "string",
        description: "email do usuário",
        example: "email@email.com",
        nullable: false
    })
    readonly email: string;

    @IsNotEmpty({ message: "A senha é obrigatória" })
    @MinLength(6)
    @MaxLength(255)
    @ApiProperty({
        type: "string",
        description: "senha do usuário",
        example: "123456W",
        nullable: false
    })
    readonly password: string;
}
