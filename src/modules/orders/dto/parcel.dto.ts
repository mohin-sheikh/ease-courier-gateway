import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ParcelDto {

    @ApiProperty({
        example: 2.5,
    })
    weight!: number;

    @ApiProperty({
        example: 20,
    })
    length!: number;

    @ApiProperty({
        example: 15,
    })
    breadth!: number;

    @ApiProperty({
        example: 10,
    })
    height!: number;
}