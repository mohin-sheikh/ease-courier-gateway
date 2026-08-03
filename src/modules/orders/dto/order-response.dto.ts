import { CourierPartner } from '../../../common/enums/courier-partner.enum';
import { OrderStatus } from '../../../common/enums/order-status.enum';

export class OrderResponseDto {
  id!: string;

  internalOrderId!: string;

  courierPartner!: CourierPartner;

  courierShipmentId?: string;

  courierTrackingNumber?: string;

  status!: OrderStatus;

  createdAt!: Date;

  updatedAt!: Date;
}
