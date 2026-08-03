import { IsString } from 'class-validator';

export class AddressDto {

    @IsString()
    address!: string;

    @IsString()
    city!: string;

    @IsString()
    state!: string;

    @IsString()
    country!: string;

    @IsString()
    pincode!: string;
}