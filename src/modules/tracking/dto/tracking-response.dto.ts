import { ApiProperty } from '@nestjs/swagger';

import { OrderStatus } from '../../../common/enums/order-status.enum';

export class TrackingResponseDto {
  @ApiProperty()
  trackingNumber!: string;

  @ApiProperty()
  shipmentId!: string;

  @ApiProperty({
    enum: OrderStatus,
  })
  status!: OrderStatus;

  @ApiProperty({
    required: false,
  })
  courierStatus?: string;
}
