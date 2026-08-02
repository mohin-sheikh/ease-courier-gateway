import {
    IsOptional,
    IsPostalCode,
    IsString,
    MaxLength,
} from 'class-validator';

export class AddressDto {
    @IsString()
    @MaxLength(200)
    line1!: string;

    @IsOptional()
    @IsString()
    @MaxLength(200)
    line2?: string;

    @IsString()
    city!: string;

    @IsString()
    state!: string;

    @IsString()
    country!: string;

    @IsPostalCode('IN')
    pincode!: string;
}