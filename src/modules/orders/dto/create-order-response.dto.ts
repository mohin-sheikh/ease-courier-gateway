import { OrderStatus } from '../../../common/enums/order-status.enum';

export class CreateOrderResponseDto {
    success!: boolean;

    orderId!: string;

    shipmentId?: string;

    awb?: string;

    status!: OrderStatus;
}