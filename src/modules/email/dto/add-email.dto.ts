import { IsEmail, IsNotEmpty, isNotEmpty, IsString } from "class-validator";

export class AddEmailDto {

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;
}