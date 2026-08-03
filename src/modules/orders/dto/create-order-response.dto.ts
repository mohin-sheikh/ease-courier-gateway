import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../../../common/enums/order-status.enum';

export class CreateOrderResponseDto {
  @ApiProperty()
  success!: boolean;

  @ApiProperty()
  orderId!: string;

  @ApiProperty({
    required: false,
  })
  shipmentId?: string;

  @ApiProperty({
    required: false,
  })
  awb?: string;

  @ApiProperty({
    enum: OrderStatus,
  })
  status!: OrderStatus;
}
