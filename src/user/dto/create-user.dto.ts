import { IsString, IsEmail, MinLength, IsOptional, IsDateString, IsEnum } from "class-validator";
import { Role } from "src/enums/role.enum";

export class CreateUserDTO {

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsOptional()
    @IsDateString()
    birthAt: string;

    @IsOptional()
    @IsEnum(Role)
    role: number;

}