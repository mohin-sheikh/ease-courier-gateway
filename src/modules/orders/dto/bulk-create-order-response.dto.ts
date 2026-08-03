import { ApiProperty } from '@nestjs/swagger';

import { CreateOrderResponseDto } from './create-order-response.dto';

class BulkOrderFailureDto {
  @ApiProperty()
  internalOrderId!: string;

  @ApiProperty()
  error!: string;
}

export class BulkCreateOrderResponseDto {
  @ApiProperty()
  total!: number;

  @ApiProperty()
  success!: number;

  @ApiProperty()
  failed!: number;

  @ApiProperty({
    type: [CreateOrderResponseDto],
  })
  successfulOrders!: CreateOrderResponseDto[];

  @ApiProperty({
    type: [BulkOrderFailureDto],
  })
  failedOrders!: BulkOrderFailureDto[];
}
