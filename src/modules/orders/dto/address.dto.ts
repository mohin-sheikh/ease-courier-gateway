import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddressDto {

    @ApiProperty({
        example: '221B Baker Street',
    })
    @IsString()
    address!: string;

    @ApiProperty({
        example: 'Mumbai',
    })
    @IsString()
    city!: string;

    @ApiProperty({
        example: 'Maharashtra',
    })
    @IsString()
    state!: string;

    @ApiProperty({
        example: 'India',
    })
    @IsString()
    country!: string;

    @ApiProperty({
        example: '400001',
    })
    @IsString()
    pincode!: string;
}