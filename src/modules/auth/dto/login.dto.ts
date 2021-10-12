import { IsEmail, IsOptional, isString, IsString } from "class-validator";

export class LoginDto {

    @IsString()
    @IsOptional()
    userName?: string;

    @IsString()
    @IsOptional()
    password?: string;

    @IsString()
    @IsOptional()
    @IsEmail()
    email?: string;
}