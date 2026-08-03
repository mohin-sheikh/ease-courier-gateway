import { IsNumber } from 'class-validator';

export class ParcelDto {

    @IsNumber()
    weight!: number;

    @IsNumber()
    length!: number;

    @IsNumber()
    breadth!: number;

    @IsNumber()
    height!: number;
}