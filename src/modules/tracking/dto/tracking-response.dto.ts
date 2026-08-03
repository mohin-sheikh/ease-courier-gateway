import { OrderStatus } from '../../../common/enums/order-status.enum';

export class TrackingResponseDto {
  orderId!: string;

  trackingNumber!: string;

  currentStatus!: OrderStatus;

  location?: string;

  remarks?: string;

  updatedAt!: Date;
}
