import { ArrayMaxSize, ArrayMinSize, ValidateNested } from 'class-validator';

import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { CreateOrderDto } from './create-order.dto';

export class BulkCreateOrderDto {
  @ApiProperty({
    type: [CreateOrderDto],
    description: 'Maximum 100 orders per request.',
  })
  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  @ValidateNested({ each: true })
  @Type(() => CreateOrderDto)
  orders!: CreateOrderDto[];
}
