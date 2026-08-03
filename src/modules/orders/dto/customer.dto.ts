import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class CustomerDto {

    @IsString()
    name!: string;

    @IsPhoneNumber('IN')
    mobile!: string;

    @IsEmail()
    @IsOptional()
    email?: string;
}