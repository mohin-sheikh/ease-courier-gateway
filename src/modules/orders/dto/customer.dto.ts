import { IsEmail, IsMobilePhone, IsOptional, IsString, MaxLength } from 'class-validator';

export class CustomerDto {
    @IsString()
    @MaxLength(100)
    name!: string;

    @IsMobilePhone('en-IN')
    mobile!: string;

    @IsOptional()
    @IsEmail()
    email?: string;
}