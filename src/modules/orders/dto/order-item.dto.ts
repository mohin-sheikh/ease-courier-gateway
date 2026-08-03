import { IsNumber, IsString } from 'class-validator';

export class OrderItemDto {

    @IsString()
    sku!: string;

    @IsString()
    description!: string;

    @IsNumber()
    quantity!: number;

    @IsNumber()
    price!: number;
}