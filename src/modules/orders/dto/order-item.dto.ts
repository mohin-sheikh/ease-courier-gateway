import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class OrderItemDto {
  @ApiProperty({
    example: 'SKU-1001',
  })
  @IsString()
  sku!: string;

  @ApiProperty({
    example: 'Wireless Mouse',
  })
  @IsString()
  description!: string;

  @ApiProperty({
    example: 2,
  })
  @IsNumber()
  quantity!: number;

  @ApiProperty({
    example: 499,
  })
  @IsNumber()
  price!: number;
}
