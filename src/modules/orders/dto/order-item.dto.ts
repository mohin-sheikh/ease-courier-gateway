import {
    IsInt,
    IsNumber,
    IsPositive,
    IsString,
} from 'class-validator';

export class OrderItemDto {
    @IsString()
    name!: string;

    @IsInt()
    @IsPositive()
    quantity!: number;

    @IsNumber()
    weight!: number;

    @IsNumber()
    price!: number;
}