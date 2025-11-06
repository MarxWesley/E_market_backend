import { Transform } from "class-transformer";
import { IsEmail, IsEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateAuthDto {
    @Transform(({ value }) => value.toUpperCase().trim())
    @IsString({ message: "campo deve ser string" })
    @IsEmail()
    @IsEmpty({ message: "campo email é obrigatório" })
    readonly email: string;

    @IsEmpty({ message: "A senha é obrigatória" })
    @MinLength(6)
    @MaxLength(255)
    readonly password: string;
}
