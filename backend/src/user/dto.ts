import { IsDate, isEmail, isString, isNumber, isInt, IsOptional, isDefined, Min, Max, MinLength, IsString, IsDefined, IsEmail, IsDateString, IsStrongPassword } from "class-validator";
import { Type } from "class-transformer";

export class CreateUserDto {
    @IsDefined() @IsString() @MinLength(3)
    name!: string;

    @IsDefined() @IsEmail() @IsString()
    email!: string;

    @IsOptional() @IsDateString() @MinLength(10)
    birthdate?: string;

    @IsDefined() @IsString() @MinLength(8) @IsStrongPassword({minLowercase: 1, minUppercase: 1, minNumbers:2, minSymbols:1})
    password!: string;
};

export class UpdateUserPutDto {
    @IsDefined() @IsString() @MinLength(3)
    name!: string;

    @IsDefined() @IsEmail()
    email!: string;

    @IsDefined() @IsString() @IsStrongPassword({minNumbers: 2, minLowercase: 1, minUppercase: 1, minSymbols: 1})
    password!: string;

    @IsDefined() @IsDateString() @MinLength(10)
    @Type(() => Date)
    @IsDate()
    birthdate!: Date;
}

export class PublicUser{
    id: number;
    name: string;
    email: string;
    birthdate?: Date | null;
    password?: string;
}

export class LoginUserDto{
    @IsDefined() @IsEmail()
    email!: string;

    @IsDefined() @IsString() @IsStrongPassword({minNumbers: 2, minLowercase: 1, minUppercase: 1, minSymbols: 1})
    password!: string;
}